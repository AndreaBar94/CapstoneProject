package AndreaBarocchi.CapstoneProject.auth;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import AndreaBarocchi.CapstoneProject.entities.User;
import AndreaBarocchi.CapstoneProject.exceptions.UnauthorizedException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import java.net.URL;
import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import org.apache.commons.io.IOUtils;

import io.jsonwebtoken.io.IOException;

@Component
public class JWTTools {

	private static String secret;
	private static int expiration;
	
	//get  secret key and expiration values from env.properties
	@Value("${spring.application.jwt.secret}")
	public void setSecret(String secretKey) {
		secret = secretKey;
	}
	@Value("${spring.application.jwt.expirationindays}")
	public void setExpiration(String expirationInDays) {
		expiration = Integer.parseInt(expirationInDays) * 24 * 60 * 60 * 1000;
	}
	
	//create a token with email as subject, using expiration and secret key from before
	static public String createToken(User u) {
		String token = Jwts.builder().setSubject(u.getEmail()).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(Keys.hmacShaKeyFor(secret.getBytes())).compact();
		return token;
		
	}
	
	//check for token validity
	static public void isTokenValid(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secret.getBytes())).build().parse(token);

		} catch (MalformedJwtException e) {
			throw new UnauthorizedException("Token not valid");
		} catch (ExpiredJwtException e) {
			throw new UnauthorizedException("Expired token");
		} catch (Exception e) {
			throw new UnauthorizedException("There has been a problem with your token, please try to log in again.");
		}
	}
	
	//extract subject from token (email)
	static public String extractSubject(String token) { 
		return Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secret.getBytes())).build().parseClaimsJws(token)
				.getBody().getSubject();
	}
}

