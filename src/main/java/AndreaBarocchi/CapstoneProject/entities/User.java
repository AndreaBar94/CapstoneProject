package AndreaBarocchi.CapstoneProject.entities;

import java.security.Timestamp;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class User {
	
	@Id
	@GeneratedValue
	private UUID userID;
	private String username;
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private Timestamp createdAt;
	private Timestamp updatedAt;
}
