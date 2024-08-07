'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Post } from '@/app/types';
import PostList from '@/app/components/PostList';
import Header from "@/app/components/Header";
import { postRepository } from "@/app/services/PostRepository";

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Roboto', sans-serif;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AuthorPostsTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333333;
  text-align: start;
  margin-bottom: 2rem;
`;

interface AuthorPostsProps {
    params: {
        id: string;
    }
}

const AuthorPosts: React.FC<AuthorPostsProps> = ({params}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [authorName, setAuthorName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchAuthorPosts = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await postRepository.fetchPostsByAuthor(parseInt(params.id));
            setPosts(result.posts || []);
            if(result.posts && result.posts.length > 0) {
                setAuthorName(result.posts[0].author.name);
            }
        } catch (error) {
            console.error('Error fetching author posts:', error);
        } finally {
            setIsLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        fetchAuthorPosts();
    }, [fetchAuthorPosts]);

    return (
        <Layout>
            <Header />
            <PageContainer>
                <MainContent>
                    {isLoading ? (
                        <AuthorPostsTitle>Loading...</AuthorPostsTitle>
                    ) : (
                        <>
                            <AuthorPostsTitle>{authorName}&apos;s Posts</AuthorPostsTitle>
                            {posts.length > 0 ? (
                                <PostList posts={posts} />
                            ) : (
                                <p>No posts found for this author.</p>
                            )}
                        </>
                    )}
                </MainContent>
            </PageContainer>
        </Layout>
    );
};

export default AuthorPosts;