package com.tripick.mz.member.repository;

import com.tripick.mz.member.entity.Credential;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredentialRepository extends JpaRepository<Credential, Long> {

  Optional<Credential> findByEmail(String email);

  Optional<Credential> findByCredentialId(String credentialId);

  Optional<Credential> findByEmailAndRefreshToken(String email, String refreshToken);

  Optional<Credential> deleteCredentialByCredentialId(String credentialId);
}
