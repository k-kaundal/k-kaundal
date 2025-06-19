'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { GET_POST_BY_SLUG } from '@/lib/graphql/queries';
import { PostBySlugData, PostBySlugVariables } from '@/types/post';

const SinglePost: React.FC = () => {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? decodeURIComponent(params.slug) : '';

  const { loading, error, data } = useQuery<PostBySlugData, PostBySlugVariables>(GET_POST_BY_SLUG, {
    variables: { id: slug },
    skip: !slug,
    fetchPolicy: 'network-only',
    context: {
      fetchOptions: {
        method: 'POST',
      },
    },
    onError: (err) => {
    //   console.error('GraphQL Query Error:', {
    //     message: err.message,
    //     networkError: err.networkError ? {
    //       message: err.networkError.message,
    //       statusCode: (err.networkError as any)?.statusCode,
    //       bodyText: (err.networkError as any)?.bodyText,
    //       result: (err.networkError as any)?.result,
    //       stack: err.networkError?.stack,
    //     } : null,
    //     graphQLErrors: err.graphQLErrors,
    //     slug,
    //   });
    },
    onCompleted: (data) => {
    //   console.log('GraphQL Query Completed:', { slug, data });
    },
  });

  if (loading)
    return (
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 py-8">
        Loading post...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-lg text-red-500 dark:text-red-400 py-8">
        Error: {error.message}
      </p>
    );
  if (!data?.post)
    return (
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 py-8">
        Post not found.
      </p>
    );

  const post = data.post;

  return (
    <section
      className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900"
      id="single-post"
    >
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="text-purple-400 font-medium hover:underline mb-6 inline-block"
        >
          ← Back to Home
        </Link>
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-green-400 p-8">
          {post.featuredImage?.node?.sourceUrl && (
            <div className="relative w-full h-64 mb-6">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title || 'Post image'}
                fill
                className="object-cover rounded-xl"
                priority={true}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {post.title || 'Untitled'}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {post.date
              ? new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'No date'}
          </p>
          <div
            className="text-gray-600 dark:text-gray-300 text-base prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content || 'No content available.' }}
          />
        </article>
      </div>
    </section>
  );
};

export default SinglePost;