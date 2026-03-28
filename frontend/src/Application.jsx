import './App.css';
import React, {useEffect, useState} from "react";
import Middle from "./components/Middle/Middle";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import axios from "axios";

function Application({page, login, setLogin}) {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios.get("/api/posts")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log("Error fetching posts:", error);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostCreated = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const pageWithProps = React.cloneElement(page, {
        posts: posts,
        onPostCreated: handlePostCreated
    });

    return (
        <div>
            <Header setLogin={setLogin} login={login}/>
            <Middle
                posts={posts}
                page={pageWithProps}
            />
            <Footer/>
        </div>
    );
}

export default Application;