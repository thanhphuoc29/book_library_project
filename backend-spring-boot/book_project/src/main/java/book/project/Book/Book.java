package book.project.Book;

import java.sql.Date;

/**
 * @author Dell
 *
 */
public class Book {
	private int bookcode;
	private String title;
	private String author;
	private String description;
	private Date releaseDate;
	private int pageCount;
	private int category;
	private int numSold = 0;
	private float price;
	private String urlImage;
	private int rating;
	private String genre;
	
	public Book() {
		// TODO Auto-generated constructor stub
	}
	
	public Book(int bookcode, String title, String author, int category, int rating, float price, String urlImage,String genre, String description,
			Date realeaseDate,int pageCount) {
		super();
		this.bookcode = bookcode;
		this.title = title;
		this.author = author;
		this.category = category;
		this.rating = rating;
		this.price = price;
		this.urlImage = urlImage;
		this.genre = genre;
		this.description = description;
		this.pageCount = pageCount;
		this.releaseDate = realeaseDate;
	}
	
	public Book(int bookcode, String title, String author, int category, int rating, float price, String urlImage,String genre, String description,
			Date realeaseDate,int pageCount,int numSold) {
		super();
		this.bookcode = bookcode;
		this.title = title;
		this.author = author;
		this.category = category;
		this.rating = rating;
		this.price = price;
		this.urlImage = urlImage;
		this.genre = genre;
		this.description = description;
		this.pageCount = pageCount;
		this.releaseDate = realeaseDate;
		this.numSold = numSold;
	}
	public int getBookcode() {
		return bookcode;
	}
	public void setBookcode(int bookcode) {
		this.bookcode = bookcode;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public float getPrice() {
		return price;
	}
	
	public int getNumSold() {
		return numSold;
	}

	public void setNumSold(int numSold) {
		this.numSold = numSold;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getUrlImage() {
		return urlImage;
	}

	public void setUrlImage(String urlImage) {
		this.urlImage = urlImage;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}
	
	
	
}
