import './Style.css'
import { useState, useEffect } from 'react';
import { totalPrice, totalPriceProduct, } from '../../Funtion/Funtion';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../Funtion/Funtion';

function PaymentDetail() {

    const [product, setProduct] = useState([])
    const navi = useNavigate()
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('product'));
        setProduct(data);
    }, [])

    function setText() {
        if (product.status === 0) return 'Đang chuẩn bị hàng';
        else if (product.status === 1) return 'Đang vận chuyển';
        return 'Đã giao'
    }
    const handleRating = () => {
        navi(`/books/${product.book.bookcode}`);
        setTimeout(function () {
            var rating = document.getElementById('cus-rating');
            rating.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
    const setTime = (time) => {
        const date = new Date(time); // Đối tượng ngày giờ hiện tại
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDate;

    }
    const handleBuyMore = () => {
        navi(`/books/${product.book.bookcode}`)
        scrollToTop()
    }
    return (
        <div className="payment-detail-container">
            <h2 className='title-product-detail'>Chi tiết đơn hàng</h2>
            <div className="container-detail">
                <div className="infor-delivery">
                    <div className='infor-address'>
                        <p className='inf-bold'>{sessionStorage.getItem('name')}</p>
                        <p className='inf-bold'>{'Email: ' + sessionStorage.getItem('email')}</p>
                        <p>{'Địa chỉ: ' + sessionStorage.getItem('address')}</p>
                    </div>
                    <div className='status-delivery-payment'>
                        <p>Thời gian đặt hàng: <span className='inf-bold'>{setTime(product?.perchaseDate)}</span></p>
                        <p>Trạng thái đơn hàng: <span className="status-delivery">{setText()}</span></p>
                        <p>Thời gian nhận hàng: <span className='inf-bold'>{product?.receivedDate !== null ? setTime(product?.receivedDate) : ''}</span></p>
                    </div>
                </div>
                <div className='product-detail'>
                    <div className="product-flex">
                        <img src={product?.book?.urlImage} alt="Sach" onClick={handleBuyMore}></img>
                        <div className="infor-product-flex">
                            <p className="title-book-cart"><span>{product.book?.title}</span></p>
                            <p className="author-book-cart"><span>{product.book?.author}</span></p>
                            <p>Số lượng: <span>{product?.quantity}</span></p>
                            <p>Tổng tiền hàng: <span>{totalPriceProduct(product)}</span></p>
                            <p>Phí vận chuyển: <span>16.500đ</span></p>
                            <p>Voucher: <span>0</span></p>
                            <p>Phương thức thanh toán: <span>{product?.method_payment}</span></p>
                            <p >Thành tiền: <span className='price'>{totalPrice(product)}</span></p>
                            <div className="control-product">
                                <button onClick={handleBuyMore}>Mua lại</button>
                                <button onClick={handleRating}>Đánh giá</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PaymentDetail;