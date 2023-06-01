import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Style.css'
import { totalPriceProduct } from "../../Funtion/Funtion";
import { scrollToTop } from "../../Funtion/Funtion";

function OrderCustomer(props) {
    const [orders, setOrders] = useState([]);
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        fetch("http://localhost:8080/orders-not-accept")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setOrders(data)
                setUpdate(false)
            })
            .catch(err => console.log(err))
    }, [update])

    const handleConfirm = (order) => {
        let confirm = window.confirm('Bạn có chắc muốn xác nhận đơn hàng này?');
        if (confirm) {
            fetch(`http://localhost:8080/update-order/${order.id}`)
                .then(response => response.json())
                .then(result => {
                    if (result) {
                        alert('Xác nhận đơn hàng thành công')
                        setUpdate(true)
                        scrollToTop()
                    } else {
                        alert('Xác nhận đơn hàng thất bại')
                    }
                })
        }
    }
    const handleClickDel = (order) => {
        let confirm = window.confirm('Bạn có chắc muốn hủy đơn hàng này?');
        if (confirm) {
            fetch(`http://localhost:8080/cancel-order/${order.id}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        alert('Hủy đơn hàng thành công')
                        setUpdate(true)
                        scrollToTop()
                    } else {
                        alert('Hủy đơn hàng thất bại')
                    }
                })
                .catch(err => console.log(err))
        }

    }
    return (
        <div className="container-list-books">
            <div className="list-books">
                <div className="book-header">
                    <h2 className="text-center">Đơn hàng</h2>
                    <nav>
                        <ul className="menu-admin">
                            <li>
                                <Link to={"/books"} onClick={scrollToTop}>
                                    <button className="btn-admin">Admin</button>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/view/-1"} onClick={scrollToTop}>
                                    <button className="btn-admin">Thêm sách</button>
                                </Link>

                            </li>
                            <li>
                                <Link to={"/orders-customer"} onClick={scrollToTop}>
                                    <button className="btn-admin">Đơn hàng</button>
                                </Link>

                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="list-book">
                    <table class="table table-bordered">
                        <thead class="thead-dark">
                            <tr className="header-title">
                                <th scope="col">Mã đơn</th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Khách hàng</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>
                                        <div className="order-customer-infor-product">
                                            <img src={order?.book?.urlImage} alt="Sach"></img>
                                            <div className='title-author .or-cus-edit-inf'>
                                                <p className="title-book-cart">{order?.book?.title}</p>
                                                <p className="author-book-cart">{order?.book?.author}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{order.quantity}</td>
                                    <td>
                                        {totalPriceProduct(order)}
                                    </td>
                                    <td>
                                        <div className='inf-customer'>
                                            <p className='inf-bold'>{order.user.name}</p>
                                            <p className='inf-bold'>{order.user.email}</p>
                                        </div>
                                    </td>
                                    <td>{order.user.address}</td>
                                    <td>
                                        <Link>
                                            <button className="btn btn-primary btn-order" onClick={() => handleConfirm(order)}>Xác nhận</button>
                                        </Link>

                                        <button className="btn btn-danger btn-order" onClick={() => handleClickDel(order)}>Hủy</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default OrderCustomer;
