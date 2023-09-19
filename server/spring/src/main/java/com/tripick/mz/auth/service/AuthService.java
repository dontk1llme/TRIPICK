package com.tripick.mz.auth.service;

import com.tripick.mz.auth.token.JwtToken;
import org.springframework.stereotype.Service;

public interface AuthService {

  JwtToken login(String email, String password);
}
