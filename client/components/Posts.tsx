'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { GET_POSTS } from '../lib/graphql/queries'; // Ensure this path is correct
import { PostsData, PostsVariables, Post } from '../types/post';

const Posts: React.FC = () => {
  const { loading, error, data } = useQuery<PostsData, PostsVariables>(GET_POSTS, {
    variables: { first: 9 },
    onError: (err) => {
      console.error('GraphQL Query Error:', {
        message: err.message,
        networkError: err.networkError,
        graphQLErrors: err.graphQLErrors,
      });
    },
  });

  if (loading)
    return (
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 py-8">
        Loading posts...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-lg text-red-500 dark:text-red-400 py-8">
        Error: {error.message}
      </p>
    );
  if (!data?.posts?.edges?.length)
    return (
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 py-8">
        No posts found.
      </p>
    );

  return (
    <section
      className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900"
      id="posts"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Kaundal VIP Blog
      </h1>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.posts.edges.map(({ node: post }: { node: Post }) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-green-400 hover:shadow-2xl transition-shadow duration-200"
          >
            {post.featuredImage?.node?.sourceUrl && (
              <div className="relative w-full h-48">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title || 'Post image'}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {post.title || 'Untitled'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {post.date
                  ? new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'No date'}
              </p>
              <div
                className="text-gray-600 dark:text-gray-300 text-base mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt || 'No excerpt available.' }}
              />
              <Link
                href={`/posts/${post.slug}`}
                className="text-purple-400 font-medium hover:underline"
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Posts;