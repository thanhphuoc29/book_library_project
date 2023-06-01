import './style.css'
import SlideLayout from '../SlideLayout/SlideLayout'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../Funtion/Funtion';

function Home(props) {
    const [topbooks, setTopBooks] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/top_book")
            .then(response => response.json())
            .then(data => setTopBooks(data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        scrollToCategory()
        console.log('scroll')
    }, [props.searchCategory])

    const filterBooks = props.search === "" ? books : books.filter((book) =>
        book.title.toLowerCase().includes(props.search.toLowerCase()) ||
        book.author.toLowerCase().includes(props.search.toLowerCase()) ||
        book.genre.toLowerCase().includes(props.search.toLowerCase())
    );

    const filterBooksCategory = props.searchCategory === "" ? [] : books.filter((book) =>
        book.genre.toLowerCase().includes(props.searchCategory.toLowerCase())
    );
    const scrollToCategory = () => {
        let section = document.getElementById("category-id")
        section.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="HomeContainer">
            <SlideLayout></SlideLayout>
            <div>
                <h2 className='title'>Sách tổng hợp</h2>
                <div className="list-book">
                    {filterBooks.map((book) => (
                        <Link to={`/books/${book.bookcode}`} onClick={scrollToTop}>
                            <div className="book" key={book.bookcode}>
                                <div className="book-image">
                                    <img src={book.urlImage} alt={book.title} />
                                </div>
                                <div className="book-info">
                                    <h2 className="book-title">{book.title}</h2>
                                    <p className="book-author">{book.author}</p>
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
                                    <p className="book-price">{book.price.toLocaleString('vi-VN') + 'đ'}</p>
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
                <h2 className='title' id='category-id'>{props.searchCategory}</h2>
                <div className="list-book">
                    {filterBooksCategory.map((book) => (
                        <Link to={`/books/${book.bookcode}`} onClick={scrollToTop}>
                            <div className="book" key={book.bookcode}>
                                <div className="book-image">
                                    <img src={book.urlImage} alt={book.title} />
                                </div>
                                <div className="book-info">
                                    <h2 className="book-title">{book.title}</h2>
                                    <p className="book-author">{book.author}</p>
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
                                    <p className="book-price">{book.price.toLocaleString('vi-VN') + 'đ'}</p>
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
                <h2 className='title'>Sách hot trong tháng</h2>
                <div className="list-book">
                    {topbooks.map((book) => (
                        <Link to={`/books/${book.bookcode}`} onClick={scrollToTop}>
                            <div className="book" key={book.bookcode}>
                                <div className="book-image">
                                    <img src={book.urlImage} alt={book.title} />
                                </div>
                                <div className="book-info">
                                    <h2 className="book-title">{book.title}</h2>
                                    <p className="book-author">{book.author}</p>
                                    <div className="book-rating">
                                        {Array.from({ length: book.rating }, (_, i) => (
                                            <span key={i} className="star">
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <p className="book-price">{book.price.toLocaleString('vi-VN') + 'đ'}</p>
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>

        </div>
    )
}

export default Home