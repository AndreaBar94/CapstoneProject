package AndreaBarocchi.CapstoneProject.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import AndreaBarocchi.CapstoneProject.entities.Category;
import AndreaBarocchi.CapstoneProject.payloads.CategoryPayload;
import AndreaBarocchi.CapstoneProject.services.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@GetMapping
	public ResponseEntity<Page<Category>> getCategories(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "categoryName") String sortBy) {
		Page<Category> categories = categoryService.findAllCategories(page, size, sortBy);
		return ResponseEntity.ok(categories);
	}

	@PostMapping
	public ResponseEntity<Category> createCategory(@RequestBody CategoryPayload categoryPayload) {
		Category newCategory = categoryService.createCategory(categoryPayload);
		return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable UUID id) throws NotFoundException {
		Category category = categoryService.findCategoryById(id);
		return ResponseEntity.ok(category);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable UUID id, @RequestBody CategoryPayload categoryPayload)
			throws NotFoundException {
		Category updatedCategory = categoryService.updateCategory(id, categoryPayload);
		return ResponseEntity.ok(updatedCategory);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) throws NotFoundException {
		categoryService.deleteCategory(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/all")
	public ResponseEntity<List<Category>> getAllCategories() {
		List<Category> categories = categoryService.findAllCategories();
		return ResponseEntity.ok(categories);
	}
}
