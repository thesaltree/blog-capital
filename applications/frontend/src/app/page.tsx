import React from 'react';
import Header from "@/app/components/Header";
import HomeClient from "@/app/components/HomeClient";
import { postRepository } from "@/app/services/PostRepository";

const Home = async () => {
    const posts = await postRepository.fetchPosts();

    return (
        <>
            <Header />
            <HomeClient posts={posts} />
        </>
    );
};

export default Home;