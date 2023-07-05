package AndreaBarocchi.CapstoneProject.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import AndreaBarocchi.CapstoneProject.entities.Article;
import AndreaBarocchi.CapstoneProject.entities.Like;
import AndreaBarocchi.CapstoneProject.entities.User;

@Repository
public interface LikeRepository extends JpaRepository<Like, UUID>{
	Like findByArticleArticleIdAndUserUserId(UUID article, UUID user);
}
