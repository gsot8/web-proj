import React, {useRef, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const WritePost = ({ onPostCreated }) => {
    const titleInputRef = useRef(null)
    const textInputRef = useRef(null)
    const [error, setError] = useState(null)
    const router = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        const title = titleInputRef.current.value
        const text = textInputRef.current.value

        if (title.trim().length === 0 || text.trim().length === 0) {
            setError('Title or text could not be empty')
            return
        }

        // Получаем JWT из localStorage
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            setError('You need to log in first');
            return;
        }

        axios.post("/api/posts", {
            title: title,
            text: text
        }, {
            // Передаём JWT в query параметре (как в Enter и Registration)
            params: {
                jwt: jwt
            }
        }).then((response) => {
            titleInputRef.current.value = '';
            textInputRef.current.value = '';
            setError(null);

            if (onPostCreated) {
                onPostCreated(response.data);

            }
        }).catch((error) => {
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                if (typeof errorData === 'object') {
                    setError(errorData.message || errorData.error || 'Failed to create post');
                } else if (typeof errorData === 'string') {
                    setError(errorData);
                } else {
                    setError('Failed to create post');
                }
            } else {
                setError('Failed to create post');
            }
        });
    }

    return (
        <div className="form form-box">
            <div className="header">Write Post</div>
            <div className="body">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <div className="name">
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="value">
                            <input
                                autoFocus
                                id="title"
                                name="title"
                                ref={titleInputRef}
                                onChange={() => setError(null)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="name">
                            <label htmlFor="text">Text</label>
                        </div>
                        <div className="value">
                            <textarea
                                id="text"
                                name="text"
                                ref={textInputRef}
                                onChange={() => setError(null)}
                            />
                        </div>
                    </div>
                    {error
                        ? <div className={'error'}>{error}</div>
                        : null
                    }
                    <div className="button-field">
                        <input type="submit" value="Write"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WritePost;