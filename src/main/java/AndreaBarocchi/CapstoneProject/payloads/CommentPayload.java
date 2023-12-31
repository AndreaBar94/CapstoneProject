package AndreaBarocchi.CapstoneProject.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CommentPayload {
	//used regexp in @Pattern to prevent basic forms of SQL injections
	
	@Pattern(regexp = "^[^<>{}$`]*$", message = "This comment contains invalid characters")
	@NotEmpty(message = "You can't submit an empty comment")
	private String content;
}
