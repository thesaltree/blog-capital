'use client';

import React, { useState, useEffect, FormEvent, ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import { DecodedToken, Post } from '@/app/types';
import PostList from '@/app/components/PostList';
import Header from "@/app/components/Header";
import { postRepository } from "@/app/services/PostRepository";
import { getCookie } from 'cookies-next';
import { PrimaryButton } from "@/app/components/PrimaryButton";

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;


const PageContainer = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Inter', sans-serif;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MainContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DashboardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333333;
  margin-bottom: 2rem;
  text-align: center;
`;

const Card = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 95%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3494e6;
    box-shadow: 0 0 0 3px rgba(52, 148, 230, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 95%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3494e6;
    box-shadow: 0 0 0 3px rgba(52, 148, 230, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Dashboard: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const getUserIdFromToken = useCallback((): number | null => {
        const token = getCookie('token') as string;
        if (!token) return null;
        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            return decodedToken.id;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }, []);

    const fetchUserPosts = useCallback(async () => {
        const token = getCookie('token') as string;
        if (!token) {
            setError('No authentication token found. Please log in again.');
            return;
        }

        const userId = getUserIdFromToken();
        if (!userId) {
            setError('Failed to decode token. Please log in again.');
            return;
        }

        const result = await postRepository.fetchUserPosts(userId, token);
        if (result.error) {
            setError('Failed to fetch posts');
        } else {
            setPosts(result.posts || []);
        }
    }, [getUserIdFromToken]);

    useEffect(() => {
        fetchUserPosts();
    }, [fetchUserPosts]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        const token = getCookie('token') as string;
        if (!token) {
            setError('No authentication token found. Please log in again.');
            return;
        }

        const res = await postRepository.createPost(title, content, token);
        if (res.error) {
            setError('An error occurred. Please try again.');
        } else {
            setTitle('');
            setContent('');
            await fetchUserPosts();
        }
    };

    return (
        <Layout>
            <Header />
            <PageContainer>
                <MainContent>
                    <DashboardTitle>Dashboard</DashboardTitle>

                    <Card>
                        <CardTitle>Create New Post</CardTitle>
                        <Form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            required
                        />
                        <TextArea
                            placeholder="Enter content"
                            value={content}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                            required
                            rows={4}
                        />
                        <PrimaryButton type="submit">Create Post</PrimaryButton>
                    </Form>
                </Card>

                <Card>
                        <CardTitle>Your Posts</CardTitle>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        {posts.length > 0 ? (
                            <PostList posts={posts} />
                        ) : (
                            <p>You have not created any posts yet.</p>
                        )}
                    </Card>
                </MainContent>
            </PageContainer>
        </Layout>
    );
};

export default Dashboard;
