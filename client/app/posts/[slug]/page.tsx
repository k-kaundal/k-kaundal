'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { GET_POST_BY_SLUG } from '@/lib/graphql/queries';
import { PostBySlugData, PostBySlugVariables } from '@/types/post';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';
import SinglePost from '@/components/SinglePost';
import Navbar from '@/components/Navbar';

export default function PostPage() {
  return (
    <ApolloProvider client={client}>
      {/* <Navbar /> */}
      <SinglePost />;
    </ApolloProvider>
  )
}