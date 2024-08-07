'use client';

import React, { Suspense } from 'react';
import styled from 'styled-components';
import PostList from "@/app/components/PostList";
import { Post } from "@/app/types";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Roboto', sans-serif;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333333;
  text-align: center;
  margin-bottom: 2rem;
`;

const LoadingFallback = styled.div`
  text-align: center;
  color: #333333;
  font-size: 1rem;
  margin-top: 2rem;
`;

interface HomeClientProps {
    posts: Post[];
}

const HomeClient: React.FC<HomeClientProps> = ({ posts }) => {
    return (
        <PageContainer>
            <MainContent>
                <PageTitle>Latest Posts</PageTitle>
                <Suspense fallback={<LoadingFallback>Loading posts...</LoadingFallback>}>
                    <PostList posts={posts} />
                </Suspense>
            </MainContent>
        </PageContainer>
    );
};

export default HomeClient;