package AndreaBarocchi.CapstoneProject.entities;

import java.security.Timestamp;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class Article {
	
	@Id
	@GeneratedValue
	private UUID articleID;
	
	private String title;
	private String content;
	
	private User author;
	private String category;
	private Timestamp createdAt;
	private Timestamp updatedAt;
}
