package book.project.User;

import java.sql.Date;
import java.sql.Timestamp;

import book.project.Book.Book;

public class OrderBook {
	private int id;
	private User user;
	private Book book;
	private int quantity;
	private int status;
	private String method_payment;
	private Timestamp perchaseDate;
	private Timestamp receivedDate;
	
	public OrderBook() {
		user = new User();
		book = new Book();
	}
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
	
	public Timestamp getPerchaseDate() {
		return perchaseDate;
	}


	public void setPerchaseDate(Timestamp perchaseDate) {
		this.perchaseDate = perchaseDate;
	}


	public Timestamp getReceivedDate() {
		return receivedDate;
	}


	public void setReceivedDate(Timestamp receivedDate) {
		this.receivedDate = receivedDate;
	}


	public String getMethod_payment() {
		return method_payment;
	}


	public void setMethod_payment(String method_payment) {
		this.method_payment = method_payment;
	}
	
	
}
