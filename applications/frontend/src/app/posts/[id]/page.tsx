import { notFound } from 'next/navigation';
import { postRepository } from "@/app/services/PostRepository";
import StyledPostContent from './StyledPostContent';
import React from 'react';

interface PostPageProps {
    params: {
        id: string;
    };
}

const PostPage = async ({ params }: PostPageProps) => {
    const post = await postRepository.fetchPost(params.id);

    if (!post) {
        notFound();
    }

    return <StyledPostContent post={post} />;
};

export default PostPage;