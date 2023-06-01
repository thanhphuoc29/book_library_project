import { Link } from 'react-router-dom';
import './Style.css'
import { useState, useEffect } from 'react';
import { scrollToTop } from '../../Funtion/Funtion';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [orders, setOrders] = useState([]);
    const [updateCart, setUpdateCart] = useState(false)
    const navi = useNavigate()
    function setText(status) {
        if (status === 0) return 'Đang chuẩn bị hàng';
        else if (status === 1) return 'Đang vận chuyển';
        return 'Đã giao'
    }

    function totalPrice(order) {
        const totalPrice = order.book.price * order.quantity;
        const formattedPrice = totalPrice.toLocaleString('vi-VN') + 'đ';
        return formattedPrice;
    }
    useEffect(() => {
        fetch(`http://localhost:8080/orders/${sessionStorage.getItem("idUser")}`)
            .then(response => response.json())
            .then(data => {
                setOrders(data)
            })
            .catch(err => console.log(err))
    }, [updateCart])

    const sendProduct = (order) => {
        if (sessionStorage.getItem('product') !== null) {
            sessionStorage.removeItem('product')
        }
        sessionStorage.setItem('product', JSON.stringify(order))
        scrollToTop()
    }
    const handleBuyMore = (order) => {
        navi(`/books/${order.book.bookcode}`)
        scrollToTop()
    }
    const handleRemoveOrder = (order) => {
        if (order.status === 0) {
            let confirm = window.confirm('Bạn có chắc muốn hủy đơn hàng này?');
            if (confirm) {
                fetch(`http://localhost:8080/cancel-order/${order.id}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            alert('Hủy đơn hàng thành công')
                            setUpdateCart(true)
                            scrollToTop()
                        } else {
                            alert('Hủy đơn hàng thất bại')
                        }
                    })
                    .catch(err => console.log(err))
            }
        } else if (order.status === 2) {

            navi(`/books/${order.book.bookcode}`);
            setTimeout(function () {
                var rating = document.getElementById('cus-rating');
                rating.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        } else {
            fetch(`http://localhost:8080/confirm/${order.id}`)
                .then(response => response.json())
                .then(result => {
                    if (result) {
                        alert('Cảm ơn bạn đã mua sách')
                        setUpdateCart(true)
                        scrollToTop()
                    } else {
                        alert('Xác nhận đơn hàng thất bại')
                    }
                })
        }
    }

    const statusOrder = (order) => {
        if (order.status === 0) {
            return 'Hủy'
        } else if (order.status === 1) return 'Nhận sách'
        return 'Đánh giá'
    }
    return (
        <div className="cart-container">
            <div className="list-container">
                <h2 className="name-cart">Giỏ hàng</h2>
                <div className="list-book-cart">
                    <div className="item-title">
                        <div className="product">Sản phẩm</div>
                        <div className="price-product">Đơn giá</div>
                        <div className="quantity-product">Số lượng</div>
                        <div className="total-product">Số tiền</div>
                        <div className="status-product">Trạng thái</div>
                        <div className="action-product">Thao tác</div>
                    </div>
                    {orders.map((order) => (
                        <div className="item-cart">

                            <div className="book-infor-cart product">
                                <Link to={"/payment-detail"} onClick={() => sendProduct(order)}>
                                    <img src={order.book.urlImage} alt="Sach"></img>
                                </Link>
                                <div className="title-author">
                                    <Link to={"/payment-detail"} onClick={() => sendProduct(order)}>
                                        <p className="title-book-cart">{order.book.title}</p>
                                        <p className="author-book-cart">{order.book.author}</p>
                                    </Link>
                                    <div className="smail-screen">
                                        <div class="quantity-controls">
                                            <button class="btn-quantity minus">-</button>
                                            <span class="quantity">{order.quantity}</span>
                                            <button class="btn-quantity plus">+</button>

                                        </div>
                                        <p className="price price-smail-screen">{totalPrice(order)}</p>
                                        <p className="status-delivery">{setText(order.status)}</p>
                                        <div className='btn-control-cart'>
                                            <button className="btn-cart btn-more" onClick={() => handleBuyMore(order)}>Mua thêm</button>
                                            <button className="btn-cart btn-cancel-buy" onClick={() => handleRemoveOrder(order)}>{statusOrder(order)}</button>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <p className="large-screen price-product">{order.book.price?.toLocaleString('vi-VN') + 'đ'}</p>
                            <div class="quantity-controls large-screen quantity-product">
                                <button class="btn-quantity minus">-</button>
                                <span class="quantity">{order.quantity}</span>
                                <button class="btn-quantity plus">+</button>

                            </div>
                            <p className="price large-screen total-product">{totalPrice(order)}</p>
                            <p className="large-screen status-delivery status-product">{setText(order.status)}</p>
                            <div className="large-screen action-product">
                                <button className="btn-cart btn-more" onClick={() => handleBuyMore(order)}>Mua thêm</button>
                                <button className="btn-cart btn-cancel-buy" onClick={() => handleRemoveOrder(order)}>{statusOrder(order)}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default Cart;