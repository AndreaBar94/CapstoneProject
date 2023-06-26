package AndreaBarocchi.CapstoneProject.entities;

import java.util.List;
import java.util.UUID;

import AndreaBarocchi.CapstoneProject.enums.UserRole;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

public class User {
	
	@Id
	@GeneratedValue
	private UUID userId;
	
	private String username;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	
	@Enumerated(EnumType.STRING)
	private UserRole role;
	
//	@OneToMany
//	private List<Like> likes; nice to have
	
	@OneToMany
	private List<Article> articles;
	
	@OneToMany
	private List<Comment> comments;
	
}
