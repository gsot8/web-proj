import React, {useCallback, useRef, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Registration = ({ setLogin }) => {
    const loginInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const [error, setError] = useState(null);
    const router = useNavigate();

    const onRegistration = useCallback(() => {
        const login = loginInputRef.current.value;
        const password = passwordInputRef.current.value;

        if (login.trim().length === 0 || password.length === 0) {
            setError('Password or login could not be empty');
            return;
        }

        axios.post("/api/users", {
            login: login,
            password: password
        }).then((response) => {
            const jwt = response.data;
            localStorage.setItem("jwt", jwt);

            axios.get("/api/jwt", {
                params: { jwt: jwt }
            }).then((response) => {
                setLogin(response.data.login);
                router("/");
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            // 🔧 ИСПРАВЛЕНИЕ ЗДЕСЬ:
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                // Если пришёл объект Spring ошибки
                if (typeof errorData === 'object' && errorData.message) {
                    // Берём сообщение из объекта
                    setError(errorData.message);
                } else if (typeof errorData === 'string') {
                    // Если пришла строка
                    setError(errorData);
                } else {
                    setError('Registration failed');
                }
            } else {
                setError('Registration failed');
            }
        });
    }, [router, setLogin]);

    return (
        <div className="registration form-box">
            <div className="header">Registration</div>
            <div className="body">
                <form method="" action="" onSubmit={event => {
                    event.preventDefault();
                    onRegistration();
                }}>
                    <input type="hidden" name="action" value="registration"/>
                    <div className="field">
                        <div className="name">
                            <label htmlFor="login">Login</label>
                        </div>
                        <div className="value">
                            <input
                                autoFocus
                                name="login"
                                ref={loginInputRef}
                                onChange={() => setError(null)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="name">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="value">
                            <input
                                name="password"
                                type="password"
                                ref={passwordInputRef}
                                onChange={() => setError(null)}
                            />
                        </div>
                    </div>
                    {error
                        ? <div className={'error'}>{error}</div>
                        : null
                    }
                    <div className="button-field">
                        <input type="submit" value="Register"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;