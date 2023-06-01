import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css'
import { isValidDate } from '../../Funtion/Funtion';
import { Link } from 'react-router-dom';

const BookEdit = () => {
    const { bookid } = useParams()
    const [book, setBook] = useState([]);
    const [categorys, setCategorys] = useState([])
    const VIEW = 0;
    const EDIT = 1;
    const ADD = 2;
    const [status, setStatus] = useState(VIEW)

    useEffect(() => {
        fetch(`http://localhost:8080/books/${bookid}`)
            .then(Response => {
                if (bookid < 0) {
                    setStatus(ADD)
                } else {
                    return Response.json();
                }
            })
            .then(result => {
                console.log(result)
                if (bookid > 0) {
                    setBook(result)
                }
            })
    }, [bookid])

    useEffect(() => {
        fetch(`http://localhost:8080/categorys`)
            .then(response => response.json())
            .then(result => {
                setCategorys(result)
            })
    }, [])

    useEffect(() => {
        var inputElement = document.querySelectorAll(".input-element");
        if (status === VIEW) {
            inputElement.forEach((element) => {
                element.disabled = true;
            });
        } else {
            inputElement.forEach((element) => {
                element.disabled = false;
            });
        }
    }, [status])
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (status !== VIEW) {
            if (!isValidDate(book.releaseDate)) {
                alert('Ngày tháng nhập vào không hợp lệ');
                return;
            }
            console.log(book.urlImage)
            if (book.urlImage === undefined) {
                alert('Vui lòng thêm hình ảnh cho sách')
                return;
            }
            if (book.pageCount > 100000 || book.price > 1000000000) {
                alert('Số trang hoặc giá tiền quá lớn vui lòng nhập lại');
                return;
            }
        }
        if (status === EDIT) {
            let confirm = window.confirm('Bạn có chắc muốn update quyển sách này?');
            if (confirm) {
                fetch(`http://localhost:8080/save/${bookid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (data === true) {
                            alert('Lưu sách thành công')
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }

        } else if (status === ADD) {
            let confirm = window.confirm('Bạn có chắc muốn thêm quyển sách này?');
            if (confirm) {
                fetch('http://localhost:8080/addBook', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data === true) {
                            alert('Thêm sách thành công')
                        } else {
                            alert('Sách đã tồn tại')
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }


        } else {
            setStatus(EDIT)
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        let image = document.querySelector(".input-upload");

        if (file) {
            if (file.type.startsWith("image/")) {
                // Tệp là tệp ảnh hợp lệ
                const imageUrl = URL.createObjectURL(file);
                setBook({ ...book, urlImage: imageUrl });
                image.style.opacity = 0;
            } else {
                // Tệp không phải là tệp ảnh hợp lệ
                alert('Đã xảy ra lỗi khi load ảnh vui lòng upload lại')
            }
        }
    };


    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     let image = document.querySelector(".input-upload");
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         const url = reader.result;
    //         setBook({ ...book, urlImage: url });
    //         image.style.opacity = 0;
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   };

    const statusBtn = () => {
        if (status === VIEW) return 'Edit/Add/Save'
        else if (status === EDIT) return 'Save'
        return 'ADD'
    }
    return (
        <div>
            <div className="view-container">
                <h2 className="title-book-view">Sách</h2>
                <form onSubmit={handleFormSubmit} className="form-book-inf">
                    <div className="book-information">
                        <div className="basic-infor flex-element">
                            <div className="infor-element">
                                <div className="item-inf">
                                    <label>Tiêu đề:</label>
                                    <input
                                        type="text"
                                        value={book.title}
                                        onChange={(e) => setBook({ ...book, title: e.target.value })}
                                        required
                                        className="input-inf flex-item input-element"
                                    />
                                </div>
                                <div className="item-inf">
                                    <label>Tác giả:</label>
                                    <input
                                        type="text"
                                        value={book.author}
                                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                                        required
                                        className="input-inf flex-item input-element"
                                    />
                                </div>

                            </div>
                            <div>
                                <div className="item-inf">
                                    <label>Mô tả:</label>
                                    <textarea
                                        value={book.description}
                                        onChange={(e) => setBook({ ...book, description: e.target.value })}
                                        className="input-description input-element"
                                    ></textarea>
                                </div>

                            </div>

                            <div className="infor-element">
                                <div className="item-inf">
                                    <label>Ngày phát hành:</label>
                                    <input
                                        type="date"
                                        value={book.releaseDate}
                                        onChange={(e) => setBook({ ...book, releaseDate: e.target.value })}
                                        className="input-inf flex-item input-element"
                                        required
                                    />
                                </div>

                                <div className="item-inf">
                                    <label>Số trang:</label>
                                    <input
                                        type="number"
                                        value={book.pageCount}
                                        onChange={(e) => setBook({ ...book, pageCount: e.target.value })}
                                        className="input-inf flex-item input-element"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="infor-element">
                                <div className="item-inf">
                                    <label>Thể loại:</label>
                                    <select value={book.category} onChange={(e) => setBook({ ...book, category: e.target.value })} className="input-inf flex-item input-element" required>
                                        {categorys.map((cate) => (
                                            <option value={cate.id}>{cate.name}</option>

                                        ))}
                                    </select>
                                </div>
                                <div className="item-inf">
                                    <label>Giá:</label>
                                    <input
                                        type="number"
                                        value={book.price}
                                        onChange={(e) => setBook({ ...book, price: e.target.value })}
                                        className="input-inf flex-item input-element"
                                        required
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="upload-image flex-element">
                            <label>Upload</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="input-upload input-element"
                            />
                            <img src={book.urlImage !== undefined ? book.urlImage : "/images/upload.jpg"} alt="" />
                        </div>
                    </div>
                    <button type="submit" className="btn-submit">
                        {statusBtn()}</button>
                </form>
            </div>

        </div>

    );
};

export default BookEdit;
