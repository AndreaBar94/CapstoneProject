package AndreaBarocchi.CapstoneProject.auth;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import AndreaBarocchi.CapstoneProject.entities.User;
import AndreaBarocchi.CapstoneProject.exceptions.NotFoundException;
import AndreaBarocchi.CapstoneProject.exceptions.UnauthorizedException;
import AndreaBarocchi.CapstoneProject.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthFilter extends OncePerRequestFilter{
	
	@Autowired
	UserService usersService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		if (!request.getMethod().equals("OPTIONS")) {			
				 String requestPath = request.getServletPath();
				 //exclude google callback from filter
				 if (requestPath.startsWith("/google/callback")) {	
					 filterChain.doFilter(request, response);
					 return;
				 }			
				//search for Authorization header
				String authHeader = request.getHeader("Authorization");
				//check token validity
				if(authHeader == null || !authHeader.startsWith("Bearer ")) throw new UnauthorizedException("Remember to include the token in the request");
				//skip 'Bearer ' string to get the token
				String accesToken = authHeader.substring(7);	
				//check token validity
				JWTTools.isTokenValid(accesToken);
				//if token is ok extract info
				String email = JWTTools.extractSubject(accesToken);
				
				try {
					User user = usersService.findUserByEmail(email);
					//add user to SecurityContextHolder
					UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
					authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authToken);
					//next block in filterChain
					filterChain.doFilter(request, response);
					
				}catch (NotFoundException e){
					e.printStackTrace();
				} 
				catch (org.springframework.data.crossstore.ChangeSetPersister.NotFoundException e) {
					e.printStackTrace();
				}
				 
				
		} else {
			filterChain.doFilter(request, response);
		}
		
	}
	
	//exclude this endpoints from this filter
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
	    String servletPath = request.getServletPath();
	    return new AntPathMatcher().match("/auth/**", servletPath)
	            || servletPath.equals("/google/authorization-url")
	            || servletPath.startsWith("/google/callback") 
	            || servletPath.equals("/favicon.ico")
			    || servletPath.equals("/login");
	}

	
}
