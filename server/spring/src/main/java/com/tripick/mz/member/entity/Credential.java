package com.tripick.mz.member.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "credential")
public class Credential {
    @Id
    @Column(length = 128)
    private String credentialId;

    @NotNull
    @Column(length = 512)
    private String refreshToken;

    @NotNull
    @Column(length = 128)
    private String email;

    @NotNull
    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    private ProviderType providerType;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getRoleKey() {
        return this.role.getCode();
    }
}
