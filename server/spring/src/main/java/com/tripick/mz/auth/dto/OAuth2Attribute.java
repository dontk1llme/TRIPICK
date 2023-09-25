package com.tripick.mz.auth.dto;

import com.tripick.mz.member.entity.Credential;
import com.tripick.mz.member.entity.Member;
import com.tripick.mz.member.entity.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@ToString
@Builder(access = AccessLevel.PRIVATE)
@Getter
public class OAuth2Attribute {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String email;
    private String name;
    private String picture;

    public static OAuth2Attribute of(String registrationId, String usernameAttributeName, Map<String, Object> attributes) {
        if(registrationId.equals("kakao")){
            return ofKakao(usernameAttributeName, attributes);
        }
        return ofGoogle(usernameAttributeName, attributes);
    }

    private static OAuth2Attribute ofGoogle(String usernameAttributeName, Map<String, Object> attributes) {
        return OAuth2Attribute.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(usernameAttributeName)
                .build();
    }

    private static OAuth2Attribute ofKakao(String usernameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuth2Attribute.builder()
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .picture((String) kakaoProfile.get("profile_image_url"))
                .attributes(kakaoAccount)
                .nameAttributeKey(usernameAttributeName)
                .build();
    }

    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();

        map.put("id", nameAttributeKey);
        map.put("key", nameAttributeKey);
        map.put("name", name);
        map.put("email", email);
        map.put("picture", picture);

        return map;
    }

    public Member toMemberEntity(Credential credential) {
        if(picture == null) {
            picture = "사진 없음";
        }

        return Member.builder()
                .nickname(name)
                .credential(credential)
                .profileImage(picture)
                .build();
    }

    public Credential toCredentialEntity() {
        String uuid = UUID.randomUUID().toString();

        return Credential.builder()
                .credentialId(uuid)
                .refreshToken("")
                .providerType(nameAttributeKey)
                .email(email)
                .role(Role.USER)
                .build();
    }
}
