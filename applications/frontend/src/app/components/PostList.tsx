import { Post } from "@/app/types";
import Link from "next/link";
import React from "react";
import styled from 'styled-components';

interface PostListProps {
    posts: Post[]
}

const PostListContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const PostArticle = styled.article`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 90%;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const PostContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease;
  &:hover {
    color: #3494e6;
  }
`;

const PostExcerpt = styled.p`
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  margin-top: auto;
`;

const AuthorLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  &:hover {
    color: #3494e6;
  }
  svg {
    margin-right: 0.5rem;
  }
`;

const PostDate = styled.span`
  color: #718096;
  font-size: 0.875rem;
`;

const clipText = (text: string, limit: number) => {
    if (text.length > limit) {
        return text.slice(0, limit) + '...';
    }
    return text;
};

const formatDate = (dateInput: Date | string) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
};

const PostList: React.FC<PostListProps> = ({posts}) => {
    return (
        <PostListContainer>
            {posts.map((post) => (
                <PostArticle key={post.id}>
                    <PostContent>
                        <PostTitle>
                            <PostLink href={`/posts/${post.id}`}>
                                {post.title}
                            </PostLink>
                        </PostTitle>
                        <PostExcerpt>{clipText(post.content, 100)}</PostExcerpt>
                    </PostContent>
                    <PostMeta>
                        <AuthorLink href={`/authors/${post.author.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            {post.author.name}
                        </AuthorLink>
                        <PostDate>{formatDate(post.createdAt)}</PostDate>
                    </PostMeta>
                </PostArticle>
            ))}
        </PostListContainer>
    )
}

export default PostList;