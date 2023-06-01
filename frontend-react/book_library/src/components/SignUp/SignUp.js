import React, { useState } from "react";
import './style.css'
import Modal from "react-modal";

function Signup({ isOpen, handleCloseModal }) {
    const [user, setUser] = useState([])

    const handleSubmitSignUp = (event) => {
        event.preventDefault();
        event.stopPropagation()
        console.log(user)
        fetch("http://localhost:8080/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert("Đăng ký tài khoản thành công")
                    handleCloseModal();
                } else {
                    alert("Tài khoản đã tồn tại")
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
            <div className="signup-container">
                <h1>Đăng ký</h1>
                <form onSubmit={handleSubmitSignUp} className="form-signup">
                    <div className="form-group">
                        <label htmlFor="username">Tên của bạn</label>
                        <input
                            type="text"
                            id="name"
                            value={user.name}
                            onChange={(event) => setUser({ ...user, name: event.target.value })}
                            required
                            className="input-signup"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(event) => setUser({ ...user, email: event.target.value })}
                            required
                            className="input-signup"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="username"
                            value={user.username}
                            onChange={(event) => setUser({ ...user, username: event.target.value })}
                            required
                            className="input-signup"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(event) => setUser({ ...user, password: event.target.value })}
                            required
                            className="input-signup"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                            type="text"
                            id="address"
                            value={user.address}
                            onChange={(event) => setUser({ ...user, address: event.target.value })}
                            required
                            className="input-signup"
                        />
                    </div>
                    <button type="submit">Đăng ký</button>
                </form>
            </div>
        </Modal>
    );
}

export default Signup;
