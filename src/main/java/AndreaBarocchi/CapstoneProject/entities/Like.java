package AndreaBarocchi.CapstoneProject.entities;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import AndreaBarocchi.CapstoneProject.enums.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
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
