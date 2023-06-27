package AndreaBarocchi.CapstoneProject.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import AndreaBarocchi.CapstoneProject.entities.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, UUID>{

}
