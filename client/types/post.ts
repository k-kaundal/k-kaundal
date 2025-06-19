export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string | null;
  } | null;
}

export interface Post {
  id: string;
  title: string | null;
  excerpt?: string | null;
  content: string | null;
  date: string | null;
  slug: string | null;
  featuredImage: FeaturedImage | null;
}

export interface PostEdge {
  node: Post;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface PostsData {
  posts: {
    edges: PostEdge[];
    pageInfo: PageInfo;
  };
}

export interface PostsVariables {
  first?: number;
}

export interface PostBySlugData {
  post: Post | null;
}

export interface PostBySlugVariables {
  id: string;
}