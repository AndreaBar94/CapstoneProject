package AndreaBarocchi.CapstoneProject.entities;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

public class Category {
	
	@Id
	@GeneratedValue
	private UUID categoryId;
	
	private String categoryName;
	
	@OneToMany
	private List<Article> articles;
	
}
