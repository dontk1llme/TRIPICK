package com.tripick.mz.common.config;

import com.tripick.mz.member.entity.Role;
import com.tripick.mz.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.oauth2.client.userinfo.CustomUserTypesOAuth2UserService;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Slf4j
@Configuration
@RequiredArgsConstructor
//@EnableWebSecurity
public class SecurityConfig {

//  private final JwtTokenProvider jwtTokenProvider;
//  private final MemberService memberService;
//  private final AES128Config aes128Config;
//    private final CustomOAuth2UserService customOAuth2UserService;

//  protected void configure(HttpSecurity httpSecurity) throws Exception {
////    httpSecurity
////        .csrf().disable()
////        .headers().frameOptions().disable();
////
////    httpSecurity
////        .authorizeRequests()
////        .antMatchers("/", "/css/**", "/images/**", "/js/**").permitAll()
////        .antMatchers("/login/oauth/**").hasRole(Role.USER.name())
////        .anyRequest().authenticated();
////
////    httpSecurity
////        .logout()
////        .logoutSuccessUrl("/");
//
////    httpSecurity
////        .oauth2Login(oauth2 -> oauth2
////            .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, userService))
////            .userInfoEndpoint()
////            .userService(customOAuth2UserService));
//  }
}
