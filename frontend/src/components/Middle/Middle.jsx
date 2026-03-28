import React from 'react';
import Aside from "./Aside/Aside";

const Middle = ({ posts, page }) => {
    return (
        <div className="middle">
            <aside className="sidebar">
                <Aside posts={posts} />
            </aside>
            <main className="content">
                {page}
            </main>
        </div>
    );
};

export default Middle;