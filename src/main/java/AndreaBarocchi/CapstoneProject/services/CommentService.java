package AndreaBarocchi.CapstoneProject.services;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import AndreaBarocchi.CapstoneProject.entities.Article;
import AndreaBarocchi.CapstoneProject.entities.Comment;
import AndreaBarocchi.CapstoneProject.entities.User;
import AndreaBarocchi.CapstoneProject.exceptions.NotFoundException;
import AndreaBarocchi.CapstoneProject.payloads.CommentPayload;
import AndreaBarocchi.CapstoneProject.repositories.ArticleRepository;
import AndreaBarocchi.CapstoneProject.repositories.CommentRepository;
import AndreaBarocchi.CapstoneProject.repositories.UserRepository;

@Service
public class CommentService {
	
	@Autowired
    private CommentRepository commentRepo;
	@Autowired
    private ArticleRepository articleRepo;
	@Autowired
    private UserRepository userRepo;


	public Comment createComment(UUID articleId, CommentPayload commentPayload, Authentication authentication) throws NotFoundException {
	    Article article = articleRepo.findById(articleId)
	            .orElseThrow(() -> new NotFoundException("Article not found with ID: " + articleId));
	    
	    User user = userRepo.findByEmail(authentication.getName())
	            .orElseThrow(() -> new NotFoundException("User not found"));

	    Comment comment = new Comment();
	    comment.setContent(commentPayload.getContent());
	    comment.setPublicationDate(LocalDate.now());
	    comment.setUser(user);
	    comment.setArticle(article);

	    return commentRepo.save(comment);
	}


    public Comment findCommentById(UUID commentId) throws NotFoundException {
        return commentRepo.findById(commentId)
                .orElseThrow(() -> new NotFoundException("Comment not found with ID: " + commentId));
    }

    public Page<Comment> findCommentsByArticleId(UUID articleId, int page, int size, String sortBy) {
    	if (size < 0)
			size = 10;
		if (size > 100)
			size = 20;
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
    	return commentRepo.findAllByArticleArticleId(articleId, pageable);
    }
    
    public Comment updateComment(UUID commentId, CommentPayload commentPayload) throws NotFoundException {
        Comment existingComment = findCommentById(commentId);
        existingComment.setContent(commentPayload.getContent());
        return commentRepo.save(existingComment);
    }

    
    public void deleteComment(UUID commentId) throws NotFoundException {
        Comment comment = commentRepo.findById(commentId)
                .orElseThrow(() -> new NotFoundException("Comment not found with ID: " + commentId));

        commentRepo.delete(comment);
    }
}
