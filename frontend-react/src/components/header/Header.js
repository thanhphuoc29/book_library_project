import './style.css'
import { useState, useEffect } from 'react'
import Login from '../login/Login';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../Funtion/Funtion';

function Header(props) {
    const [showLogin, setShowLogin] = useState(false);
    const [showInforUser, setShowInforUser] = useState(false)

    //cập nhật quyền admin theo tên tài khoản, mật khẩu
    useEffect(() => {
        const data = {
            username: sessionStorage.getItem("username"),
            password: sessionStorage.getItem("password"),
        }
        fetch("http://localhost:8080/check-admin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data) {
                    const btn_admin = document.querySelector(".admin");
                    btn_admin.style.display = "block";
                }
            })
            .catch(error => {
                console.log(error)
            });
    }, [])
    const navi = useNavigate();
    const ShowInf = () => {
        setShowInforUser(true)
    }
    const HideInf = () => {
        setShowInforUser(false)
    }
    const toggleNavVisibility = () => {
        const navElement = document.querySelector(".nav-container-vertical");
        if (navElement) {
            navElement.style.display = navElement.style.display === "none" ? "block" : "none";
        }
    };

    const handleChange = (event) => {
        let key = event.target.value;
        props.onSearch(key);
    }

    const handleShowLogin = () => {
        setShowLogin(true);
        return showLogin
    }
    const handleCloseLogin = () => {
        setShowLogin(false);
        return showLogin
    }

    const handleLogOut = () => {
        sessionStorage.clear();
        document.querySelector(".admin").style.display = "none";
        navi("/");
        setShowInforUser(false)
        scrollToTop()
    }
    const handleCart = () => {
        navi("/cart");
        setShowInforUser(false)
        scrollToTop()
    }
    return (
        <nav className="nav-container">
            <div className="grid">
                <ul className="header-nav-list">
                    <li className="header-nav-item logo-name">
                        <span class="logo-text">Thư viện sách</span>
                        <span class="logo-text logo-text-bold">Online</span>
                        <i className="fa fa-bars" onClick={toggleNavVisibility}></i>
                    </li>
                    <li className="header-nav-item">
                        <div className="search-form">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            <input type="text" className="search" placeholder="Tìm sách" onChange={handleChange} />
                        </div>
                    </li>
                    <li className="header-nav-item ">
                        {sessionStorage.getItem("name") === null ? (
                            <div>
                                <button className="btn-login" onClick={handleShowLogin}>Đăng nhập</button>
                                <Login isOpen={showLogin} handleCloseModal={handleCloseLogin}></Login>
                            </div>

                        ) : (
                            <div className="user"
                                onMouseEnter={ShowInf}
                                onMouseLeave={HideInf}>
                                <i className="fa-regular fa-user"></i>
                                <div>{sessionStorage.getItem("name")}</div>
                                {showInforUser && (
                                    <ul className="menu-user">
                                        <li>Thông tin cá nhân</li>
                                        <li onClick={handleCart}>Đơn hàng</li>
                                        <li onClick={handleLogOut}>Đăng xuất</li>
                                    </ul>
                                )}
                            </div>

                        )}
                    </li>
                </ul>
            </div>
        </nav >
    );
}

export default Header;