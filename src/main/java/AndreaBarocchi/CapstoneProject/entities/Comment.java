package AndreaBarocchi.CapstoneProject.entities;

import java.security.Timestamp;
import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

public class Comment {
	
	@Id
	@GeneratedValue
	private UUID commentId;
	
	private String content;
	private LocalDate publicationDate;
	
	@ManyToOne
	private User user; //(author)
	
	@ManyToOne
	private Article article;

}
