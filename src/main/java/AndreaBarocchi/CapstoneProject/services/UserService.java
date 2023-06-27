package AndreaBarocchi.CapstoneProject.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import AndreaBarocchi.CapstoneProject.entities.User;
import AndreaBarocchi.CapstoneProject.exceptions.EmailAlreadyExistsException;
import AndreaBarocchi.CapstoneProject.payloads.UserRegistrationPayload;
import AndreaBarocchi.CapstoneProject.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	public Page<User> findAllUsers(int page, int size, String sortBy) {
		if (size < 0)
			size = 10;
		if (size > 100)
			size = 20;
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
		return userRepo.findAll(pageable);
	}
	
	public User createUser(UserRegistrationPayload uPld) {
		userRepo.findByEmail(uPld.getEmail()).ifPresent(user -> {
		 throw new EmailAlreadyExistsException("Email " + user.getEmail() + " already exists");
		 });
		User newUser = new User(uPld.getUsername(), uPld.getFirstname(), uPld.getLastname(), uPld.getEmail(),
				uPld.getPassword());
		return userRepo.save(newUser);
	}
	
	public User findUserById(UUID id) throws NotFoundException {
		return userRepo.findById(id).orElseThrow(() -> new NotFoundException());
	}
	
	public User findUserByIdAndUpdate(UUID userId, UserRegistrationPayload uPld) throws NotFoundException {
		User foundUser = this.findUserById(userId);
		foundUser.setUsername(uPld.getUsername());
		foundUser.setFirstname(uPld.getFirstname());
		foundUser.setLastname(uPld.getLastname());
		foundUser.setEmail(uPld.getEmail());
		return userRepo.save(foundUser);
	}

	public void findUserByIdAndDelete(UUID userId) throws NotFoundException {
		User foundUser = this.findUserById(userId);
		userRepo.delete(foundUser);
	}

	public User findUserByEmail(String email) throws NotFoundException {
		return userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException());
	}

	public void deleteAllUsers() {
		userRepo.deleteAll();
	}
}
