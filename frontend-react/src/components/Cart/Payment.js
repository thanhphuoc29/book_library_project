import './Style.css'
import { useState, useEffect } from 'react';
import { product } from './Cart';
import { sendOrder } from '../book/BookDetail';
import { totalPrice, totalPriceProduct } from '../../Funtion/Funtion';

function Payment() {

    const [methodPayment, setMethodPayment] = useState('');
    function handleCheckboxChange(event) {
        const checkboxes = document.querySelectorAll('.method input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            }
        });
        const selectedCheckbox = event.target;
        if (selectedCheckbox.checked) {
            const paymentMethod = selectedCheckbox.value;
            setMethodPayment(paymentMethod)
        }
    }
    const handleOrder = () => {
        if (methodPayment !== '') {
            sendOrder.method_payment = methodPayment;
            fetch(`http://localhost:8080/order-book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendOrder)
            })
                .then(Response => Response.json())
                .then(data => {
                    console.log(data)
                    if (data === true) {
                        alert('Mua sách thành công')
                    } else {
                        alert('Có lỗi xảy ra')
                    }

                })
                .catch(error => console.log(error))
        } else {
            alert('Vui lòng chọn phương thức thanh toán')
        }

    }
    return (
        <div className="payment-detail-container">
            <h2 className='title-product-payment'>Thanh toán</h2>
            <div className="container-detail">
                <div className="infor-delivery-payment">
                    <div className='title-address-payment'>
                        <i class="fa-solid fa-location-dot"></i>
                        <div className='location'>Địa chỉ nhận hàng</div>
                    </div>

                    <div className='infor-address-payment'>
                        <div className='inf-customer'>
                            <p>{sessionStorage.getItem('name')}</p>
                            <p>{'email: ' + sessionStorage.getItem('email')}</p>
                        </div>
                        <div className='address-payment'>
                            <p >{'Địa chỉ: ' + sessionStorage.getItem('address')}</p>
                        </div>
                        <div className='address-default'>
                            <p >Mặc định</p>
                        </div>
                        <div className='change-address'>
                            <button>Thay đổi</button>
                        </div>
                    </div>
                </div>
                <div className='product-detail'>
                    <div className='title-pd'>
                        <p className='pd'>Sản phẩm</p>
                        <p className='title-pr'>Đơn giá</p>
                        <p className='title-quantity'>Số lượng</p>
                        <p className='title-total'>Thành tiền</p>
                    </div>
                    <div className="product-payment">
                        <div className='img-title-author pd'>
                            <img src={sendOrder.book.urlImage} alt="Sach"></img>
                            <div className='title-author'>
                                <p className="title-book-cart">{sendOrder.book.title}</p>
                                <p className="author-book-cart">{sendOrder.book.author}</p>
                            </div>
                        </div>
                        <p className='title-pr'>{sendOrder.book.price?.toLocaleString('vi-VN') + 'đ'}</p>
                        <p className='title-quantity'>{sendOrder.quantity}</p>
                        <p className='title-total'>{totalPriceProduct(sendOrder)}</p>
                    </div>
                    <div className="product-payment transport">
                        <div className='img-title-author pd transport-unit'>
                            <p>Đơn vị vận chuyển</p>
                        </div>
                        <p className='title-pr'>Nhanh</p>
                        <p className='title-quantity change_ship'>Thay đổi</p>
                        <p className='title-total'>16.500đ</p>
                    </div>
                    <div className='total-price-product'>
                        <p>Tổng số tiền: <span className='price'>{totalPrice(sendOrder)}</span></p>
                    </div>
                </div>
                <div className='product-detail'>
                    <h3>Phương thức thanh toán</h3>
                    <div className='method'>
                        <label>
                            <input type='checkbox' value='Thanh toán qua ATM' onClick={(e) => handleCheckboxChange(e)} required />
                            <span className='method-payment'>Thanh toán qua ATM</span>
                        </label>
                        <label>
                            <input type='checkbox' value='Thanh toán qua MOMO' onClick={(e) => handleCheckboxChange(e)} required />
                            <span className='method-payment'>Thanh toán qua MOMO</span>
                        </label>
                        <label>
                            <input type='checkbox' value='Thanh toán khi nhận hàng' onClick={(e) => handleCheckboxChange(e)} required />
                            <span className='method-payment'>Thanh toán khi nhận hàng</span>
                        </label>
                    </div>
                </div>
            </div>
            <button className='btn_purchase' onClick={handleOrder}>Đặt hàng</button>
        </div>
    );
}

export default Payment;