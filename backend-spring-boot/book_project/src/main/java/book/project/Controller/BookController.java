package book.project.Controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import book.project.Book.Book;
import book.project.Book.Category;
import book.project.Service.BookService;
import book.project.User.Comment;
import book.project.User.OrderBook;
import book.project.User.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.websocket.server.PathParam;

@RestController
@CrossOrigin
public class BookController {
	@GetMapping("/books")
	public List<Book> getBooks() {
		List<Book> books = BookService.getBookData();
		return books;
	}
	
	@GetMapping("/top_book")
	public List<Book> getTopBooks() {
		List<Book> books = BookService.getTopBook();
		return books;
	}
	
	@GetMapping("/books/{bookcode}")
	public Book bookDetail(@PathVariable String bookcode) {
		int idBook = -1;
		Book book = null;
		try {
			idBook = Integer.parseInt(bookcode);
			book = BookService.findBookById(idBook);
		} catch (Exception e) {
			
		}
		return book;
	}
	
	@PostMapping("/addBook")
	public boolean addBook(@RequestBody Book book) {
		boolean result = false;
		try {
			if(BookService.QuantityExistBook(book)  < 1) {
				result = BookService.addBook(book);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	@PutMapping("/save/{bookcode}")
	public boolean updateBook(@RequestBody Book book,@PathVariable String bookcode) {
		int idBook;
		boolean ok = false;
		try {
			if(BookService.QuantityExistBook(book) <= 1) {
				idBook = Integer.parseInt(bookcode);
				BookService.updateBook(book, idBook);
				ok = true;
			}
			
		} catch (Exception e) {
			
		}
		return ok;
	}
	@GetMapping("/delete/{bookcode}")
	public boolean deleteBook(@PathVariable String bookcode) {
		boolean result = false;
		try {
			result = BookService.deleteBookByID(Integer.parseInt(bookcode));
		} catch (Exception e) {
		}
		return result;
	}
	@GetMapping("/categorys")
	public List<Category> getListCategory() {
		List<Category> listCate = BookService.getCategory();
		return listCate;
	}
	@PostMapping("/login")
	public ResponseEntity<?> getUserLogin(@RequestBody User user) {
		User userLogin = null;
		try {
			userLogin = BookService.checkLogin(user);
			if(userLogin != null) {
				return ResponseEntity.ok(userLogin);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
	}
	
	@PostMapping("/register")
	public boolean register(@RequestBody User user) {
		return BookService.checkResgister(user);
	}
	
	@PostMapping("/comment")
	public boolean postComment(@RequestBody Comment comment) {
		return BookService.insertComment(comment);
	}
	
	@GetMapping("/comments/{idBook}")
	public List<Comment> getListComment(@PathVariable String idBook) {
		List<Comment> comments = new ArrayList<>();
		try {
			comments = BookService.getCommentByIDBook(Integer.parseInt(idBook));
		} catch (Exception e) {
			// TODO: handle exception
		}
		return comments;
	}
	
	@PostMapping("/check-admin")
	public boolean isAdmin(@RequestBody User user) {
		boolean result = false;
		try {
			result = BookService.isAdmin(user);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	
	@PostMapping("/order-book")
	public boolean orderBook(@RequestBody OrderBook order) {
		boolean result = false;
		try {
			result = BookService.orderBook(order);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	
	@GetMapping("/orders/{id}")
	public List<OrderBook> getOrderBooks(@PathVariable String id) {
		List<OrderBook> orders = new ArrayList<>();
		try {
			orders = BookService.getOrderBookByUserID(Integer.parseInt(id));
		} catch (Exception e) {
			// TODO: handle exception
		}
		return orders;
	}
	
	@GetMapping("/orders-not-accept")
	public List<OrderBook> getOrderNotAccept() {
		return BookService.getOrderNotAccept();
	}
	
	@GetMapping("/cancel-order/{id}")
	public boolean deleteOrder(@PathVariable String id) {
		boolean result = false;
		try {
			result = BookService.deleteOrderById(Integer.parseInt(id));
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	
	@GetMapping("/update-order/{id}")
	public boolean updateStatusOrder(@PathVariable String id) {
		boolean result = false;
		try {
			result = BookService.updateStatusOrder(Integer.parseInt(id));
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	
	@GetMapping("/confirm/{id}")
	public boolean updateReceivedBook(@PathVariable String id) {
		boolean result = false;
		try {
			result = BookService.updateReceivedBook(Integer.parseInt(id));
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
}
