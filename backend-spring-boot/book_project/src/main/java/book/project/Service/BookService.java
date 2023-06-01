package book.project.Service;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import book.project.Book.Book;
import book.project.Book.Category;
import book.project.DBService.*;
import book.project.User.Comment;
import book.project.User.OrderBook;
import book.project.User.User;

@Service
public class BookService {
	public static boolean addBook(Book book) {
		Connection conn = null;
		PreparedStatement ps = null;
		String sql ="insert into book(title,author,category,rating,price,image,description,\r\n"
				+ "pageCount,releaseDate)\r\n"
				+ "values(?,?,?,?,?,?,?,?,?)";
		boolean result = false;
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setString(1, book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setInt(3, book.getCategory());
			ps.setInt(4, book.getRating());
			ps.setFloat(5, book.getPrice());
			ps.setString(6, book.getUrlImage());
			ps.setString(7, book.getDescription());
			ps.setInt(8, book.getPageCount());
			ps.setDate(9, book.getReleaseDate());
			ps.executeUpdate();
			result = true;
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	
	public static boolean deleteBookByID(int id) {
		Connection conn = null;
		PreparedStatement ps = null;
		String sql ="delete from book where id = ?";
		boolean result = false;
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setInt(1, id);
			ps.executeUpdate();
			result = true;
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	public static List<Book> getTopBook() {
		String sql ="SELECT b.id,b.title,b.author,b.category,c.`name` as genre,b.rating,b.price,b.image,b.pageCount,b.description,b.releaseDate FROM book as b\r\n"
				+ "JOIN category as c ON b.category = c.id\r\n"
				+ "ORDER BY b.rating DESC LIMIT 3";
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<Book> books = new ArrayList<>();
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				int bookcode = rs.getInt("id");
				String title = rs.getString("title");
				String author = rs.getString("author");
				int category = rs.getInt("category");
				int rating = rs.getInt("rating");
				float price = rs.getFloat("price");
				String urlImage = rs.getString("image");
				String genre = rs.getString("genre");
				String description = rs.getString("description");
				Date releaseDate = rs.getDate("releaseDate");
				int pageCount = rs.getInt("pageCount");
				books.add(new Book(bookcode, title, author, category,rating,price,urlImage,genre,description,
						releaseDate,pageCount)); 
			}
			ps.close();
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return books;
	}
	public static List<Book> getBookData() {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<Book> books = new ArrayList<>();
		try {
			conn = DBService.gI().getConnection();
			String sql = "SELECT b.id,b.title,b.author,b.category,c.`name` as genre,b.rating,b.price,b.image,b.pageCount,b.description,b.releaseDate FROM book as b JOIN category as c ON b.category = c.id order by b.id";
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				int bookcode = rs.getInt("id");
				String title = rs.getString("title");
				String author = rs.getString("author");
				int category = rs.getInt("category");
				int rating = rs.getInt("rating");
				String genre = rs.getString("genre");
				float price = rs.getFloat("price");
				String urlImage = rs.getString("image");
				String description = rs.getString("description");
				Date releaseDate = rs.getDate("releaseDate");
				int pageCount = rs.getInt("pageCount");
				int numBookSold = BookService.getNumBookSold(bookcode, conn);
				books.add(new Book(bookcode, title, author, category,rating,price,urlImage,genre,description,
						releaseDate,pageCount,numBookSold)); 
			}
			ps.close();
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return books;
	}
	
	public static Book findBookById(int idBook) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		Book book = null;
		String sql ="SELECT b.id,b.title,b.author,b.category,c.`name` as genre,b.rating,b.price,b.image,b.pageCount,b.description,b.releaseDate FROM book as b\r\n"
				+ "JOIN category as c ON b.category = c.id\r\n"
				+ "WHERE b.id = ?";
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setInt(1, idBook);
			rs = ps.executeQuery();
			while (rs.next()) {
				int bookcode = rs.getInt("id");
				String title = rs.getString("title");
				String author = rs.getString("author");
				int category = rs.getInt("category");
				int rating = rs.getInt("rating");
				float price = rs.getFloat("price");
				String urlImage = rs.getString("image");
				String genre = rs.getString("genre");
				String description = rs.getString("description");
				Date releaseDate = rs.getDate("releaseDate");
				int pageCount = rs.getInt("pageCount");
				book = new Book(bookcode, title, author, category,rating,price,urlImage,genre,description,
						releaseDate,pageCount);
			}
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return book;
	}
	
	public static void updateBook(Book book,int idBook) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement("update book set title = ?, author =? , category = ?, rating = ?,price =?,image=?,description=?,pageCount =?,releaseDate =? where id = ?");
			ps.setString(1, book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setInt(3, book.getCategory());
			ps.setInt(4, book.getRating());
			ps.setFloat(5, book.getPrice());
			ps.setString(6, book.getUrlImage());
			ps.setString(7, book.getDescription());
			ps.setInt(8, book.getPageCount());
			ps.setDate(9, book.getReleaseDate());
			ps.setInt(10, idBook);
			ps.executeUpdate();
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
	
	public static void deleteBookById(int idBook) {
		Connection conn = null;
		PreparedStatement ps =null;
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement("delete from book where bookcode = ?");
			ps.setInt(1, idBook);
			ps.executeUpdate();
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
	
	public static int getNumBookSold(int idBook,Connection conn) {
		int num = 0;
		PreparedStatement ps =null;
		ResultSet rs = null;
		try {
			ps = conn.prepareStatement("SELECT COUNT(*) as num FROM order_book WHERE idBook = ? and status = 2");
			ps.setInt(1, idBook);
			rs = ps.executeQuery();
			if(rs.next()) {
				num = rs.getInt("num");
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return num;
	}
	public static List<Category> getCategory() {
		List<Category> listCategory =new ArrayList<>();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		Book book = null;
		String sql ="select * from category";
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				listCategory.add(new Category(rs.getInt("id"),rs.getString("name")));
			}
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return listCategory;
	}
	
	public static User checkLogin(User user) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM `user` WHERE `username` = ? and `password` = ?";
		User userlogin = null;
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getPassword());
			rs = ps.executeQuery();
			if(rs.next()) {
				userlogin = new User(rs.getInt("id"),rs.getString("name") ,
						user.getUsername(), user.getPassword(),rs.getString("address") , rs.getInt("isadmin") == 1 ? true: false,rs.getString("email"));
			}
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return userlogin;
	}
	
	public static boolean checkResgister(User user) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM `user` WHERE `username` = ?";
		String register = "INSERT INTO `user`(`name`,username,`password`,address,email) VALUES(?,?,?,?,?)";
		User userlogin = null;
		boolean status = false;
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setString(1, user.getUsername());
			rs = ps.executeQuery();
			if(!rs.next()) {
				ps = conn.prepareStatement(register);
				ps.setString(1, user.getName());
				ps.setString(2, user.getUsername());
				ps.setString(3, user.getPassword());
				ps.setString(4, user.getAddress());
				ps.setString(5, user.getEmail());
				ps.executeUpdate();
				status = true;
			}
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return status;
	}
	
	public static boolean insertComment(Comment comment) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = "INSERT INTO `comment`(`idUser`,content,`rate`,idBook) VALUES(?,?,?,?)";
		User userlogin = null;
		boolean status = false;
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setInt(1, comment.getIdUser());
			ps.setString(2, comment.getContent());
			ps.setInt(3, comment.getRate());
			ps.setInt(4, comment.getIdBook());
			ps.executeUpdate();
			status = true;
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return status;
	}
	
	public static List<Comment> getCommentByIDBook(int idBook) {
		List<Comment> comments = new ArrayList<>();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = "SELECT `user`.`name`,content,rate FROM `comment`\r\n"
				+ "JOIN `user` ON `user`.id = `comment`.idUser\r\n"
				+ "WHERE idBook = ?";
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setInt(1, idBook);
			rs= ps.executeQuery();
			while(rs.next()) {
				comments.add(new Comment(rs.getString("content"),
						rs.getString("name"), rs.getInt("rate")));
			}
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return comments;
	}
	
	public static boolean isAdmin(User user) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		boolean result = false;
		String sql = "SELECT * FROM `user` WHERE username = ? AND `password` = ?";
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getPassword());
			rs= ps.executeQuery();
			if(rs.next()) {
				result = rs.getInt("isadmin") == 1 ? true : false;
			}
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	
	public static boolean orderBook(OrderBook order) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = "INSERT INTO order_book(idUser,idBook,quantity,`status`,method_payment)\r\n"
				+ "VALUES(?,?,?,?,?)";
		boolean status = false;
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setInt(1, order.getUser().getId());
			ps.setInt(2, order.getBook().getBookcode());
			ps.setInt(3, order.getQuantity());
			ps.setInt(4, order.getStatus());
			ps.setString(5, order.getMethod_payment());
			ps.executeUpdate();
			status = true;
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return status;
	}
	
	public static List<OrderBook> getOrderBookByUserID(int idUser) {
		List<OrderBook> orders = new ArrayList<>();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = "SELECT book.id as idBook,book.title,book.author,book.price,book.image,order_book.id,order_book.quantity,`status`,order_book.perchaseDate,order_book.receivedDate,order_book.method_payment FROM order_book\r\n"
				+ "JOIN book on order_book.idBook = book.id\r\n"
				+ "WHERE idUser = ?";
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setInt(1, idUser);
			rs= ps.executeQuery();
			while(rs.next()) {
				OrderBook order = new OrderBook();
				order.setId(rs.getInt("id"));
				order.getBook().setBookcode(rs.getInt("idBook"));
				order.getBook().setTitle(rs.getString("title"));
				order.getBook().setAuthor(rs.getString("author"));
				order.getBook().setPrice(rs.getFloat("price"));
				order.getBook().setUrlImage(rs.getString("image"));
				order.setQuantity(rs.getInt("quantity"));
				order.setStatus(rs.getInt("status"));
				order.setPerchaseDate(rs.getTimestamp("perchaseDate"));
				order.setReceivedDate(rs.getTimestamp("receivedDate"));
				order.setMethod_payment(rs.getString("method_payment"));
				orders.add(order);
			}
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orders;
	}
	
	public static List<OrderBook> getOrderNotAccept() {
		List<OrderBook> orders = new ArrayList<>();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = "SELECT order_book.id,book.id as idbook, book.title,book.author,book.price,book.image,`user`.`name`,`user`.email,`user`.address,order_book.quantity,order_book.method_payment FROM order_book\r\n"
				+ "JOIN book ON book.id = order_book.idBook\r\n"
				+ "JOIN `user` on `user`.id = order_book.idUser\r\n"
				+ "WHERE `status` = 0";
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			rs= ps.executeQuery();
			while(rs.next()) {
				OrderBook order = new OrderBook();
				order.setId(rs.getInt("id"));
				order.getBook().setBookcode(rs.getInt("idbook"));
				order.getBook().setTitle(rs.getString("title"));
				order.getBook().setAuthor(rs.getString("author"));
				order.getBook().setPrice(rs.getFloat("price"));
				order.getBook().setUrlImage(rs.getString("image"));
				order.getUser().setName(rs.getString("name"));
				order.getUser().setEmail(rs.getString("email"));
				order.getUser().setAddress(rs.getString("address"));
				order.setQuantity(rs.getInt("quantity"));
				order.setMethod_payment(rs.getString("method_payment"));
				orders.add(order);
			}
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orders;
	}
	
	public static boolean deleteOrderById(int id) {
		Connection conn = null;
		PreparedStatement ps =null;
		boolean result = false;
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement("DELETE FROM order_book WHERE id = ?");
			ps.setInt(1, id);
			ps.executeUpdate();
			conn.close();
			result = true;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	
	public static boolean updateStatusOrder(int id) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		Timestamp now = new Timestamp(System.currentTimeMillis());
		boolean result = false;
		String sql = "UPDATE order_book SET status = 1 where id = ?";
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setInt(1, id);
			ps.executeUpdate();
			conn.close();
			result = true;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	
	public static boolean updateReceivedBook(int id) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		Timestamp now = new Timestamp(System.currentTimeMillis());
		boolean result = false;
		String sql = "UPDATE order_book SET receivedDate = ?,status = 2 where id = ?";
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setTimestamp(1, now);
			ps.setInt(2, id);
			ps.executeUpdate();
			conn.close();
			result = true;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}
	
	public static int QuantityExistBook(Book book) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		Timestamp now = new Timestamp(System.currentTimeMillis());
		int count = 0;
		String sql = "SELECT COUNT(*) as num FROM book WHERE title = ? AND author = ? ";
		try {
			conn = DBService.gI().getConnection();
			ps = conn.prepareStatement(sql);
			ps.setString(1, book.getTitle());
			ps.setString(2, book.getAuthor());
			rs = ps.executeQuery();
			if(rs.next()) {
				count = rs.getInt("num");
			}
			conn.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return count;
	}
}
