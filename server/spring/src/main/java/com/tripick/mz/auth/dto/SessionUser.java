package com.tripick.mz.auth.dto;

import com.tripick.mz.member.entity.Member;
import java.io.Serializable;

public class SessionUser implements Serializable {

  private String name;
  private String email;
  private String picture;

  public SessionUser(Member member) {
    this.name = member.getNickname();
    this.email = member.getCredential().getEmail();

  }
}
