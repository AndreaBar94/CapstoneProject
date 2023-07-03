package AndreaBarocchi.CapstoneProject.payloads;

import java.time.LocalDate;

import AndreaBarocchi.CapstoneProject.entities.Category;
import lombok.Data;

@Data
public class ArticlePayload {
	
	private String title;
	
	private String content;
	
	private LocalDate publicationDate;
	
	private String categoryName;
}
