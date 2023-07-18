package AndreaBarocchi.CapstoneProject.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import AndreaBarocchi.CapstoneProject.entities.User;
import AndreaBarocchi.CapstoneProject.exceptions.NotFoundException;
import AndreaBarocchi.CapstoneProject.exceptions.UnauthorizedException;
import AndreaBarocchi.CapstoneProject.payloads.AuthenticationSuccessfullPayload;
import AndreaBarocchi.CapstoneProject.payloads.UserLoginPayload;
import AndreaBarocchi.CapstoneProject.payloads.UserRegistrationPayload;
import AndreaBarocchi.CapstoneProject.services.UserService;


@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	private PasswordEncoder bcrypt;
	
	@PostMapping("/signup")
	public ResponseEntity<User> register(@RequestBody @Validated UserRegistrationPayload body) {
		//encode the password
		body.setPassword(bcrypt.encode(body.getPassword()));
		//create new user
		User createdUser = userService.createUser(body);
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationSuccessfullPayload> login(@RequestBody UserLoginPayload body) throws NotFoundException, org.springframework.data.crossstore.ChangeSetPersister.NotFoundException{
		
		//search for the email if is in database 
		User user = userService.findUserByEmail(body.getEmail());
		
		//if is there, check the password
		String plainPW = body.getPassword();
		String hashedPW = user.getPassword(); 
		
		if (!bcrypt.matches(plainPW, hashedPW))
			throw new UnauthorizedException("Invalid credentials");
		//se corrisponde creo token
		String token = JWTTools.createToken(user);
		
		//return the token
		return new ResponseEntity<>(new AuthenticationSuccessfullPayload(token), HttpStatus.OK);
	}
	
	
}
