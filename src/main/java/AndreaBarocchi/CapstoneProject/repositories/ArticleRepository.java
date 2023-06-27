package AndreaBarocchi.CapstoneProject.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import AndreaBarocchi.CapstoneProject.entities.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, UUID>{

}
