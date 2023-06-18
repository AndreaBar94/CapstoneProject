package AndreaBarocchi.CapstoneProject.entities;

import java.security.Timestamp;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class Comment {
	
	@Id
	@GeneratedValue
	private UUID commentID;
	
	private String content;
	private User author;
	private Article article;
	private Timestamp createdAt;
	private Timestamp updatedAt;
}
