import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const Navigation = ({login}) => {

    const router = useNavigate()

    return (
        <nav>
            <ul>
                <li>
                    <a href="" onClick={(event) => {
                        event.preventDefault()
                        router("/")
                    }}>Home</a>
                </li>
                <li><a href="" onClick={(event) => {
                    event.preventDefault()
                    router("/user")
                }}>Users</a></li>
                {login
                    ?
                    <li>
                        <Link to="/write" className="write-post-link">
                            Write Post
                        </Link>
                    </li>
                    : null
                }
                <li><a href="">Posts</a></li>
            </ul>
        </nav>
    );
};

export default Navigation;