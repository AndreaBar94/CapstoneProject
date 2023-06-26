package AndreaBarocchi.CapstoneProject.entities;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

public class Like {
	
	@Id
	@GeneratedValue
	private UUID likeId;
	
	private LocalDate interactionDate;
	
	@ManyToOne
	private User user;
	
	@ManyToOne
	private Article article;
}
