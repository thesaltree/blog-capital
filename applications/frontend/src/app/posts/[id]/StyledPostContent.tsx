'use client'

import React from 'react';
import styled from 'styled-components';
import Header from "@/app/components/Header";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Roboto', sans-serif;
`;

const MainContent = styled.main`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const PostCard = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333333;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Content = styled.div`
  color: #555555;
  font-size: 1.1rem;
  line-height: 1.6;
`;

interface StyledPostContentProps {
    post: {
        title: string;
        content: string;
    };
}

const StyledPostContent: React.FC<StyledPostContentProps> = ({ post }) => {
    return (
        <PageContainer>
            <Header />
            <MainContent>
                <PostCard>
                    <Title>{post.title}</Title>
                    <Content>{post.content}</Content>
                </PostCard>
            </MainContent>
        </PageContainer>
    );
};

export default StyledPostContent;