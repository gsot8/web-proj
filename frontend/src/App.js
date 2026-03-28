import './App.css';
import Enter from "./components/Middle/Main/Enter/Enter";
import Index from "./components/Middle/Main/Index/Index";
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Application from "./Application";
import axios from "axios";
import User from "./components/Middle/Main/User/User";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/Middle/Main/NotFound/NotFound";
import Registration from "./components/Middle/Main/Registration/Registration";
import WritePost from "./components/Middle/Main/WritePost/WritePost";
import PostDetail from "./components/Middle/Main/PostDetail/PostDetail";

function App() {

    const [login, setLogin] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("jwt")){
            axios.get("/api/jwt", {
                params: {
                    jwt: localStorage.getItem("jwt")
                }
            }).then((response)=>{
                localStorage.setItem("login", response.data.login);
                setLogin(response.data.login)
            }).catch((error)=>{
                console.log(error)
            })
        }
    }, []);

    useEffect(() => {
        setIsAuthenticated(!!login);
    }, [login]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        index={true}
                        element={<Application setLogin={setLogin} login={login} page={<Index/>}/>}
                    />
                    <Route
                        exact path={'/enter'}
                        element={<Application login={login} page={<Enter setLogin={setLogin}/>}/>}
                    />
                    <Route
                        exact path={'/registration'}
                        element={<Application login={login} page={<Registration setLogin={setLogin}/>}/>}
                    />
                    <Route
                        path="/posts/:id"
                        element={<Application login={login} page={<PostDetail/>}/>}
                    />
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Application login={login} page={<User/>}/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/write"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Application login={login} page={<WritePost/>}/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="*"
                        element={<Application login={login} page={<NotFound/>}/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
