import { Post, CreatePostInput } from "../types/post";

const API_KEY = process.env.JSONBIN_API_KEY;
const BIN_ID = process.env.JSONBIN_BIN_ID;
const BASE_URL = "https://api.jsonbin.io/v3/b";

if (!API_KEY) {
  throw new Error("JSONBIN_API_KEY is not defined");
}

if (!BIN_ID) {
  throw new Error("JSONBIN_BIN_ID is not defined");
}

const headers = new Headers({
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY,
});

export async function getPosts(): Promise<Post[]> {
  try {
    const url = `${BASE_URL}/${BIN_ID}`;
    // console.log("url", url);
    // console.log("headers", headers);  

    const res = await fetch(url, {
      headers,
      // next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("JSONBin API error:", {
        status: res.status,
        statusText: res.statusText,
        data: errorData,
      });
      throw new Error(`Failed test to fetch posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.record || !Array.isArray(data.record.posts)) {
      console.error("Unexpected data structure:", data);
      throw new Error("Invalid data structure received from JSONBin");
    }

    return data.record.posts;
  } catch (error) {
    console.error("Error in getPosts:", error);
    throw error;
  }
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const posts = await getPosts();

  const newPost: Post = {
    id: crypto.randomUUID(),
    title: input.title,
    body: input.body,
    createdAt: new Date().toISOString(),
  };

  const updatedPosts = [...posts, newPost];

  const res = await fetch(`${BASE_URL}/${BIN_ID}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ posts: updatedPosts }),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return newPost;
}

export async function deletePost(id: string): Promise<void> {
  const posts = await getPosts();
  const updatedPosts = posts.filter(post => post.id !== id);

  const res = await fetch(`${BASE_URL}/${BIN_ID}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ posts: updatedPosts }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }
}
