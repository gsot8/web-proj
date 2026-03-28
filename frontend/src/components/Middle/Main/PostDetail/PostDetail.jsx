import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PostItem from "../PostItem";

const PostDetail = () => {
    const { id } = useParams(); // Получаем id из URL
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/api/posts/${id}`)
            .then((response) => {
                setPost(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                    setError(errorData.message || errorData.error || 'Failed to load post');
                } else {
                    setError('Post not found');
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <main className="post-detail">
                <div className="loading">Loading post...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="post-detail">
                <div className="error">{error}</div>
                <Link to="/" className="back-link">← Back to Home</Link>
            </main>
        );
    }

    if (!post) {
        return (
            <main className="post-detail">
                <div className="error">Post not found</div>
                <Link to="/" className="back-link">← Back to Home</Link>
            </main>
        );
    }

    return (
        <main className="post-detail">
            <div className="post-header">
                <h1 className="post-title">{post.title}</h1>
                <div className="post-meta">
                    <span className="author">By {post.user?.login || 'Unknown'}</span>
                    <span className="date">
                        {new Date(post.creationTime).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                </div>
            </div>

            <div className="post-content">
                <p>{post.text}</p>
            </div>

            <div className="post-footer">
                <Link to="/" className="back-link">← Back to All Posts</Link>
            </div>
        </main>
    );
};

export default PostDetail;