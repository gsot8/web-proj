import React from 'react';
import PostItem from "../PostItem";

const Index = ({ posts = [] }) => {
    // Просто выводим полученные посты
    return (
        <main className="index-page">
            {posts.length === 0 ? (
                <div className="no-posts">No posts yet. Be the first to write something!</div>
            ) : (
                posts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                    />
                ))
            )}
        </main>
    );
};

export default Index;