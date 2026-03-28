import React from 'react';
import {Link} from "react-router-dom";

const Section = ({post}) => {
    return (
        <section>
            <div className="header">
                {post.title}
            </div>
            <div className="body">
                {post.text}
            </div>
            <div className="footer">
                <Link to={`/posts/${post.id}`}>View all</Link>
            </div>
        </section>
    );
};

export default Section;