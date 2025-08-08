import type { Post } from "@entities/post/model/types";

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchPosts = async (
  skip: number,
  limit = 10
): Promise<PostsResponse> => {
  const res = await fetch(
    `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
  );
  if (!res.ok) {
    throw new Error(`Ошибка загрузки: ${res.status}`);
  }
  return res.json();
};
