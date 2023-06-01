import React, { useState } from 'react';
import './style.css';
import Modal from "react-modal";
import Signup from '../SignUp/SignUp';
import { useNavigate } from 'react-router-dom';

function Login({ isOpen, handleCloseModal }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navi = useNavigate();

    const [showSignUp, setShowSignUp] = useState(false);

    const handleShowSignUp = () => {
        setShowSignUp(true);
    }
    const handleCloseSignUp = () => {
        setShowSignUp(false);
        handleCloseModal();
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: username,
            password: password,
        }
        fetch("http://localhost:8080/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data === false) {
                    alert('Tài khoản mật khẩu không chính xác')
                } else {
                    sessionStorage.setItem("idUser", data['id']);
                    sessionStorage.setItem("name", data['name']);
                    sessionStorage.setItem("address", data['address']);
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("password", password);
                    sessionStorage.setItem("email", data['email']);
                    const btn_admin = document.querySelector(".admin");
                    if (data["admin"]) {
                        btn_admin.style.display = "block";
                        console.log("admin")
                    }
                    navi("/");
                    handleCloseModal();
                }
            })
            .catch(error => {
                console.log(error)
            });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={handleCloseModal}
            overlayClassName="custom-modal-overlay"
            className="custom-modal-content">
            <div className="login-container">
                <h1 className='title-login'>Đăng nhập</h1>
                <form onSubmit={handleSubmit} className="form-login">
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            className="input-login"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="input-login"
                        />
                    </div>
                    <button type="submit" >Đăng nhập</button>
                    <p className='notion'>Bạn chưa có tài khoản?<span class="sign-up" onClick={handleShowSignUp}>Đăng ký</span></p>
                    <Signup isOpen={showSignUp} handleCloseModal={handleCloseSignUp}></Signup>
                </form>
            </div>
        </Modal>

    );
}

export default Login;
