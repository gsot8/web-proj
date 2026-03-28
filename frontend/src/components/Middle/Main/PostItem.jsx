import React from 'react';
import { useNavigate } from 'react-router-dom';
import voteUp from "../../../assets/img/voteup.png";
import voteDown from "../../../assets/img/votedown.png";
import data from "../../../assets/img/comments_16x16.png";

const PostItem = ({ post }) => {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate(`/posts/${post.id}`);
    };

    // Форматирование даты
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <article className="post-item">
            {/* ✅ Кликабельный заголовок */}
            <div className="title clickable" onClick={handleTitleClick}>
                {post.title}
            </div>
            <div className="information">
                By {post.user?.login || 'Unknown'},
                Posted on {formatDate(post.creationTime)}
            </div>
            <div className="body">
                <p>{post.text}</p>
            </div>
            <div className="footer">
                <div className="left">
                    <img src={voteUp} alt="Vote Up" title="Vote Up"/>
                    <img src={voteDown} alt="Vote Down" title="Vote Down"/>
                </div>
                <div className="right">
                    <img src={data} alt="Comments" title="Comments"/>
                    <span>0</span>
                </div>
            </div>
        </article>
    );
};

export default PostItem;