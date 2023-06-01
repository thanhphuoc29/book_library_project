import React, { useState, useEffect } from 'react';
import './Style.css';

const CommentSection = (props) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [updateComment, setUpdateComment] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8080/comments/${props.idBook}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setComments(data)
                setUpdateComment(false)
            })
            .catch(err => console.log(err))
    }, [updateComment])

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value));
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment) {
            const data = {
                idUser: sessionStorage.getItem('idUser'),
                idBook: props.idBook,
                content: comment,
                rate: rating
            }
            fetch("http://localhost:8080/comment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    const newComment = {
                        content: comment,
                        nameUser: sessionStorage.getItem('name'),
                        rate: rating

                    };
                    setComments([...comments, newComment]);
                    setComment('');
                    setRating(0);
                    setUpdateComment(true)
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            alert('Vui lòng nhập đánh giá')
        }
    };

    return (
        <div className="comment-section">
            {sessionStorage.getItem("name") !== null ? (
                <form onSubmit={handleCommentSubmit} className="submit-comment">
                    <label htmlFor="comment">Đánh giá sản phẩm:</label>
                    <textarea className='text-comment'
                        id="comment"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Write your comment here"
                    ></textarea>
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        id="rating"
                        min="0"
                        max="5"
                        value={rating}
                        onChange={handleRatingChange}
                    />
                    <button type="submit">Bình luận</button>
                </form>
            ) : (
                <div className="not-login-comment">
                    <h3>Đăng nhập để đánh giá</h3>
                </div>
            )}

            <div className="comments-list">
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <div className="avatar">
                            <img src='/images/avt.png' alt="User Avatar" />
                        </div>
                        <div className='user-comment'>
                            <p className="comment-text">{comment.content}</p>
                            <div className="book-rating">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span
                                        key={i}
                                        className={`${i < comment.rate ? 'star' : 'star-muted'}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className="from-user">{"Bởi " + comment.nameUser}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
