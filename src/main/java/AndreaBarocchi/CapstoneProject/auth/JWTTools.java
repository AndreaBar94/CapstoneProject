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
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JWTTools {

	//trucco per usare i value dall'env 
	private static String secret;
	private static int expiration;
	
	@Value("${spring.application.jwt.secret}")
	public void setSecret(String secretKey) {
		secret = secretKey;
		//log.info(secret); controllo se il token viene letto
	}

	@Value("${spring.application.jwt.expirationindays}")
	public void setExpiration(String expirationInDays) {
		expiration = Integer.parseInt(expirationInDays) * 24 * 60 * 60 * 1000;
	}

	static public String createToken(User u) {
		String token = Jwts.builder().setSubject(u.getEmail()).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(Keys.hmacShaKeyFor(secret.getBytes())).compact();
		return token;
		
	}

	static public void isTokenValid(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secret.getBytes())).build().parse(token);

		} catch (MalformedJwtException e) {
			throw new UnauthorizedException("Invalid Token");
		} catch (ExpiredJwtException e) {
			throw new UnauthorizedException("Expired Token");
		} catch (Exception e) {
			throw new UnauthorizedException("Problems with token, please login again");
		}
	}
	
	
	//utilizzo la mail come subject dell'utente
	static public String extractSubject(String token) { 
		return Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secret.getBytes())).build().parseClaimsJws(token)
				.getBody().getSubject();
	}
}

