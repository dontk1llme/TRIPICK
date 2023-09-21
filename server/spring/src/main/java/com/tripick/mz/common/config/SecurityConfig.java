package com.tripick.mz.common.config;

import com.tripick.mz.auth.handler.OAuth2AuthenticationFailureHandler;
import com.tripick.mz.auth.handler.OAuth2AuthenticationSuccessHandler;
import com.tripick.mz.auth.repository.CookieAuthorizationRequestRepository;
import com.tripick.mz.auth.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.CustomUserTypesOAuth2UserService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
            .cors()
            .and()
            .httpBasic().disable()
            .csrf().disable()
            .formLogin().disable()
            .rememberMe().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity
            .authorizeRequests()
            .antMatchers("/oauth2/**").permitAll()
            .anyRequest().authenticated();

        httpSecurity
            .oauth2Login()
            .authorizationEndpoint().baseUri("/oauth2/authorize")
            .authorizationRequestRepository(cookieAuthorizationRequestRepository)
            .and()
            .redirectionEndpoint().baseUri("/oauth2/callback/*")
            .and()
            .userInfoEndpoint().userService(customOAuth2UserService)
            .and()
            .successHandler(oAuth2AuthenticationSuccessHandler)
            .failureHandler(oAuth2AuthenticationFailureHandler);

        httpSecurity
            .logout()
            .clearAuthentication(true)
            .deleteCookies("JSESSIONID");

        httpSecurity
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }
}
