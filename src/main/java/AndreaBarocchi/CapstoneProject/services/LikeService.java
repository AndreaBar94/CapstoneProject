package AndreaBarocchi.CapstoneProject.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import AndreaBarocchi.CapstoneProject.entities.Article;
import AndreaBarocchi.CapstoneProject.entities.Like;
import AndreaBarocchi.CapstoneProject.repositories.ArticleRepository;
import AndreaBarocchi.CapstoneProject.repositories.LikeRepository;

@Service
public class LikeService {
	
	@Autowired
	private LikeRepository likeRepo;
	@Autowired
	private ArticleRepository articleRepo;
	
	   public Like addLike(Like like, UUID articleId) {
	        Article article = articleRepo.findById(articleId).orElse(null);
	        if (article != null) {
	            like.setArticle(article);
	            return likeRepo.save(like);
	        }
	        return null;
	    }
}