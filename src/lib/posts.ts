import { supabase } from "./supabase";

export type PostStatus = 'Draft' | 'Published' | 'Scheduled';
export type Platform = 'Instagram' | 'Twitter' | 'LinkedIn' | 'Facebook' | 'TikTok';

export interface Post {
  id: string;
  profile_id?: string;
  title: string;
  platform: Platform;
  revenue: number; // Likes/Views
  sales: number; // Comments
  stock: number; // Shares
  rating: number;
  status: PostStatus;
  created_at: string;
}

/**
 * Fetches all posts for the authenticated user.
 */
export async function getPosts(): Promise<{ data: Post[] | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    return { data: data as Post[] | null, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Fetches a single post by ID.
 */
export async function getPostById(id: string): Promise<{ data: Post | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    return { data: data as Post | null, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Creates a new post for the authenticated user.
 */
export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'profile_id'>): Promise<{ data: Post | null; error: any }> {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          ...post,
          profile_id: userData.user.id,
        },
      ])
      .select()
      .single();

    return { data: data as Post | null, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Updates an existing post.
 */
export async function updatePost(id: string, post: Partial<Post>): Promise<{ data: Post | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update(post)
      .eq("id", id)
      .select()
      .single();

    return { data: data as Post | null, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Deletes a post.
 */
export async function deletePost(id: string): Promise<{ error: any }> {
  try {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    return { error };
  } catch (err) {
    return { error: err };
  }
}
