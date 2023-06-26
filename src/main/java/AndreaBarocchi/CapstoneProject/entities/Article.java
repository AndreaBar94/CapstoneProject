package AndreaBarocchi.CapstoneProject.entities;

import java.security.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

public class Article {
	
	@Id
	@GeneratedValue
	private UUID articleId;
	
	private String title;
	private String content;
	
	private LocalDate publicationDate;
	
	@ManyToOne
	private User user; //author
	
	@ManyToOne
	private List<Comment> comments;
	
//	@OneToMany
//	private List<Like> likes; article's likes, nice to have
	
	@ManyToOne
	private Category category;
}
