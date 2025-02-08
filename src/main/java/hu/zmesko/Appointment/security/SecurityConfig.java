package hu.zmesko.Appointment.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import hu.zmesko.Appointment.repository.UsersRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private final DataSource dataSource;

    public SecurityConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        return httpSecurity
                .csrf(csrf -> csrf.ignoringRequestMatchers("/**"))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/**").permitAll())
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()))
                .cors(withDefaults())
                .formLogin(form -> form.defaultSuccessUrl("/admin/admin.html"))
                .build();
    }

    // add new user
    @Bean
    UserDetailsService createUser(PasswordEncoder encoder) {

        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);

        if (usersRepository.findByUsername("admin") == null) {
            UserDetails userAdmin = User
                    .withUsername("admin")
                    .password(encoder.encode("admin"))
                    .roles("ADMIN")
                    .build();
            jdbcUserDetailsManager.createUser(userAdmin);
        }

        return jdbcUserDetailsManager;

    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
