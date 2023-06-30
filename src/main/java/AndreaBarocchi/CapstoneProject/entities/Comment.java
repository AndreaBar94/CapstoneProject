package AndreaBarocchi.CapstoneProject.entities;

import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
public class Comment {
	
	@Id
	@GeneratedValue
	private UUID commentId;
	
	private String content;
	private LocalDate publicationDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("comments")
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("articles")
    private User user;


}
