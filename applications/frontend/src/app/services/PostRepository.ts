import {Post} from "@/app/types";

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:3000';

export const postRepository =  {
    async fetchPost(id: string): Promise<Post | null> {
        try {
            const res = await fetch(`${BACKEND_URL}/posts/${id}`);
            if (!res.ok) {
                return null;
            }
            return await res.json();
        } catch {
            return null;
        }
    },

    async fetchPosts(): Promise<Post[]> {
        try {
            const response = await fetch(`${BACKEND_URL}/posts`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    },

    async fetchUserPosts(authorId: number, token: string): Promise<{posts?: Post[], error?: string}> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?author=${authorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return {posts: data};
        } catch (err) {
            return {error: err.message};
        }
    },

    async fetchPostsByAuthor(authorId: number): Promise<{posts?: Post[], error?: string}> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?author=${authorId}`);
            const data = await response.json();
            return {posts: data};
        } catch (err) {
            return {error: err.message};
        }
    },

    async createPost(title: string, content: string, token: string): Promise<{id?: Post[], error?: string}> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            const data = await response.json();
            return {id: data.id};
        } catch (error) {
            console.error('Error creating post:', error);
            return {error: error.message};
        }
    }
}