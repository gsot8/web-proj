import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found form-box">
            <div className="header">404 - Page Not Found</div>
            <div className="body">
                <p>The page you are looking for does not exist.</p>
                <Link to="/">Go to Home Page</Link>
            </div>
        </div>
    );
};

export default NotFound;