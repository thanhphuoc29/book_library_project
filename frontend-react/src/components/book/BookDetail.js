import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './style.css'
import CommentSection from '../Comment/Comment';
import { scrollToTop } from '../../Funtion/Funtion';

let sendOrder;
const BookDetail = (props) => {
    const { bookid } = useParams()
    const [book, setBook] = useState([]);
    const [status, setStatus] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    const navi = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:8080/books/${bookid}`)
            .then(Response => Response.json())
            .then(result => {
                console.log(result)
                if (result.bookcode === 0) {
                    setStatus(1)
                }
                setBook(result)
                setTotalPrice(result.price)
            })
    }, [bookid])

    const decreaseQuantity = () => {

        let num = (quantity - 1) > 0 ? (quantity - 1) : 1;
        let total = book.price * num;
        setTotalPrice(total);
        setQuantity(num);

    }
    const increaseQuantity = () => {
        let num = quantity + 1;
        let total = book.price * num;
        if (num > 5) {
            alert('Số lượng sách đặt mua đã đạt tối đa');
            return;
        }
        setTotalPrice(total);
        setQuantity(num);

    }
    const handleOrder = () => {
        if (sessionStorage.getItem('idUser') !== null) {
            const data = {
                user: {
                    id: sessionStorage.getItem("idUser"),
                },
                book: book,
                quantity: quantity
            }
            sendOrder = data;
            navi('/payment')
            scrollToTop()
        } else {
            alert('Vui lòng đăng nhập để mua sách')
        }

    }

    return (
        <div className="book-detail-container">
            <div className="book-detail">
                <div className="book-cover">
                    <img src={book.urlImage} alt="Book Cover" />
                </div>
                <div className="book-detail-inf">
                    <h2>{book.title}</h2>
                    <p>Tác giả: <strong>{book.author}</strong></p>
                    <p>Thể loại: <strong>{book.genre}</strong></p>
                    <p>Số trang: <strong>{book.pageCount}</strong></p>
                    <p>Ngày xuất bản: <strong>{book.releaseDate}</strong></p>
                    <div className="book-rating">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span
                                key={i}
                                className={`${i < book.rating ? 'star' : 'star-muted'}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <p>Giá bán: <strong className="price">{book.price?.toLocaleString('vi-VN') + 'đ'}</strong></p>
                    {/* <p className='book-description'>Mô tả: {book.description}</p> */}
                    <div class="quantity-controls">
                        <button class="btn-quantity minus" onClick={decreaseQuantity}>-</button>
                        <span class="quantity">{quantity}</span>
                        <button class="btn-quantity plus" onClick={increaseQuantity}>+</button>
                        <p className="total-price">Tổng giá: <strong className="price">{totalPrice?.toLocaleString('vi-VN') + 'đ'}</strong></p>
                    </div>
                    <button className="btn-buy" onClick={handleOrder}>Mua ngay</button>

                </div>
            </div>
            <div className="description-detail child">
                <div className="content">
                    <h2>Mô tả sách</h2>
                    <p className='book-description'>{book.description}</p>
                </div>

            </div>
            <div className="book-comment child" id='cus-rating'>
                <div className="content">
                    <h2>Đánh giá sách</h2>
                    <CommentSection idBook={book.bookcode}></CommentSection>
                </div>

            </div>
        </div>
    );
};

export { sendOrder }
export default BookDetail;
