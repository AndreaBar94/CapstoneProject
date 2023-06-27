package AndreaBarocchi.CapstoneProject.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import AndreaBarocchi.CapstoneProject.exceptions.ExceptionHandlerFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	@Autowired
	JWTAuthFilter jwtAuthFilter;
	@Autowired
	CorsFilter corsFilter;
	@Autowired
	ExceptionHandlerFilter exceptionHandlerFilter;

	
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(c -> c.disable());
		
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll());
		
		//autorizzazioni user
		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/users").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.PUT, "/users/**").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.DELETE, "/users/**").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/users/**").hasAnyAuthority("USER", "ADMIN");
		});
		
		//autorizzazioni articles
		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/articles").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/articles/**").hasAnyAuthority("USER", "ADMIN");
		});

		//autorizzazioni comment
		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/comments").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/comments/**").hasAnyAuthority("USER", "ADMIN");
		});
		
		//autorizzazioni category
		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/categories").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/categories/**").hasAuthority("ADMIN");
		});
		
		
		http.addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class);

		http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		http.addFilterBefore(exceptionHandlerFilter, JWTAuthFilter.class);

		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

	@Bean
	PasswordEncoder pwEncoder() {
		return new BCryptPasswordEncoder(10);
	}


}