import './App.css';
import Header from './components/header/Header'
import LeftNav from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import BookDetail from './components/book/BookDetail';
import ShowBooks from './components/Admin/ShowBook';
import BookEdit from './components/book/BookEdit';
import Cart from './components/Cart/Cart';
import PaymentDetail from './components/Cart/PaymentDetail';
import Payment from './components/Cart/Payment';
import OrderCustomer from './components/Admin/OrderCustomer';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nameCategory, setNameCategory] = useState("")
  return (
    <div>
      <BrowserRouter>
        <Header onSearch={setSearchTerm}></Header>
        <LeftNav onSearch={setNameCategory}></LeftNav>
        <Routes>
          <Route path="/" element={<Home search={searchTerm} searchCategory={nameCategory}></Home>} />
          <Route path="/books/:bookid" element={<BookDetail></BookDetail>} />
          <Route path="/books" element={<ShowBooks search={searchTerm}></ShowBooks>} />
          <Route path="/view/:bookid" element={<BookEdit></BookEdit>} />
          <Route path="/cart" element={<Cart></Cart>} />
          <Route path="/payment" element={<Payment></Payment>} />
          <Route path="/payment-detail" element={<PaymentDetail></PaymentDetail>} />
          <Route path="/orders-customer" element={<OrderCustomer></OrderCustomer>} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
