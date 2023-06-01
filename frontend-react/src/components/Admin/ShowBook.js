import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Style.css'
import { scrollToTop } from "../../Funtion/Funtion";

function ShowBooks(props) {
    const [books, setBooks] = useState([]);
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then(response => response.json())
            .then(data => {
                setBooks(data)
                setUpdate(false)
            })
            .catch(err => console.log(err))
    }, [update])

    console.log(props.search)
    const filterBooks = props.search === "" ? books : books.filter((book) =>
        book.title.toLowerCase().includes(props.search.toLowerCase()) ||
        book.author.toLowerCase().includes(props.search.toLowerCase())
    );


    const handleClickDel = (bookId) => {
        let confirm = window.confirm('Bạn có chắc muốn xóa quyển sách này?');
        if (confirm) {
            fetch(`http://localhost:8080/delete/${bookId}`)
                .then(response => response.json())
                .then(result => {
                    if (result) {
                        alert('Xóa sách thành công')
                        setUpdate(true)
                        scrollToTop()
                    } else {
                        alert('Xóa sách thất bại')
                    }
                })
        }

    }
    return (
        <div className="container-list-books">
            <div className="list-books">
                <div className="book-header">
                    <h2 className="text-center">Books List</h2>
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
                                <th scope="col">Mã sách</th>
                                <th scope="col">Tiêu đề</th>
                                <th scope="col">Tác giả</th>
                                <th scope="col">Thể loại</th>
                                <th scope="col">Ngày phát hành</th>
                                <th scope="col">Số trang</th>
                                <th scope="col">Số lượng bán</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterBooks.map((book) => (
                                <tr key={book.bookcode}>
                                    <td>{book.bookcode}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>{book.releaseDate}</td>
                                    <td>{book.pageCount}</td>
                                    <td>{book.numSold}</td>
                                    <td>
                                        <Link to={`/view/${book.bookcode}`}>
                                            <button className="btn btn-primary">View</button>
                                        </Link>

                                        <button className="btn btn-danger" onClick={() => handleClickDel(book.bookcode)}>Delete</button>
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

export default ShowBooks;
