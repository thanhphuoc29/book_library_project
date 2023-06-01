import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { scrollToTop } from '../../Funtion/Funtion';

function LeftNav(props) {
    const [categorys, setCategorys] = useState([])
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isCategoryVisible, setIsCategoryVisible] = useState(false);

    const toggleNavVisibility = () => {
        if (!isNavVisible) {
            const navElement = document.querySelector(".nav-container-vertical");
            if (navElement) {
                navElement.style.display = navElement.style.display === "none" ? "block" : "none";
            }
        }
        scrollToTop()
    };

    const resizeHandler = () => {
        if (window.innerWidth >= 740) {
            setIsNavVisible(true);
        } else {
            setIsNavVisible(false);
        }
    };


    const showCategory = () => {
        setIsCategoryVisible(true);
    };
    const hideCategory = () => {
        setIsCategoryVisible(false);
    };
    const handleCategory = (key) => {
        props.onSearch(key);
    }

    useEffect(() => {
        fetch(`http://localhost:8080/categorys`)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setCategorys(result)
            })
    }, [])
    useEffect(() => {
        // Gọi hàm resizeHandler khi tải trang và khi giá trị isNavVisible thay đổi
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [isNavVisible]);
    return (
        <nav className="nav-container-vertical" style={{ display: isNavVisible ? 'block' : 'none' }}>
            <ul className="header-nav-list-vertical">
                <li className="header-nav-item-vertical admin" onClick={toggleNavVisibility}>
                    <Link to={"/books"}>
                        <i class="fa-solid fa-circle-plus icon icon-admin"></i>
                        <span className="nav-link">Admin</span>
                    </Link>
                </li>
                <li className="header-nav-item-vertical" onClick={toggleNavVisibility}>
                    <Link to={"/"}>
                        <i class="fa fa-home icon" aria-hidden="true"></i>
                        <span className="nav-link">Trang chủ</span>
                    </Link>

                </li>
                <li className="header-nav-item-vertical">
                    <div className="category-toggle"
                        onMouseEnter={showCategory}
                        onMouseLeave={hideCategory}
                    >
                        <i className="fa fa-caret-square-o-right icon" aria-hidden="true"></i>
                        <span className="nav-link">{isCategoryVisible ? '' : 'Danh mục'}</span>
                    </div>
                    {isCategoryVisible && (
                        <ul className="category-list"
                            onMouseEnter={showCategory}
                            onMouseLeave={hideCategory}>
                            {categorys.map((cate) => (
                                <li onMouseEnter={() => handleCategory(cate.name)}
                                    key={cate.id}
                                    className="category-item"
                                >
                                    {cate.name}
                                </li>
                            ))}
                        </ul>

                    )}
                </li>

                <li className="header-nav-item-vertical" onClick={toggleNavVisibility}>
                    <Link to={"/cart"}>
                        <i class="fa fa-shopping-cart icon" aria-hidden="true"></i>
                        <span className="nav-link">Giỏ hàng</span>
                    </Link>

                </li>
            </ul>
        </nav>
    );
}

export default LeftNav;
