package book.project.User;

public class Comment {
	private int id;
	private int idUser;
	private int idBook;
	private String content;
	private String nameUser;
	private int rate;
	
	public Comment() {
		// TODO Auto-generated constructor stub
	}

	
	public Comment(String content, String nameUser, int rate) {
		super();
		this.content = content;
		this.nameUser = nameUser;
		this.rate = rate;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	
	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public int getIdBook() {
		return idBook;
	}

	public void setIdBook(int idBook) {
		this.idBook = idBook;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
	}

	public String getNameUser() {
		return nameUser;
	}

	public void setNameUser(String nameUser) {
		this.nameUser = nameUser;
	}
	
	
}
