package AndreaBarocchi.CapstoneProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import AndreaBarocchi.CapstoneProject.entities.Category;
import AndreaBarocchi.CapstoneProject.repositories.CategoryRepository;

@Component
public class DataEntryRunner implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        // create 10 starting categories in database
        String[] categoryNames = {"Strategy", "Party", "Cooperative", "Deck-building", "Tile Placement", "Card Game",
                "Dexterity", "Role-playing", "Adventure", "Family"};

        for (String categoryName : categoryNames) {
        	//check if category already exist
            if (categoryRepository.findByCategoryName(categoryName) == null) {
            	//if not create new category and save
                Category category = new Category();
                category.setCategoryName(categoryName);
                categoryRepository.save(category);
            }
        }
    }

}
