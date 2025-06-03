package com.example.gamjaboo.controller;

import com.example.gamjaboo.dto.NicknameRegisterRequestDto;
import com.example.gamjaboo.security.JwtTokenProvider;
import com.example.gamjaboo.dto.KakaoUserInfoResponseDto;
import com.example.gamjaboo.service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class KakaoLoginController {

    private final KakaoService kakaoService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/callback")
    public ResponseEntity<?> callback(@RequestParam("code") String code) {
        String accessToken = kakaoService.getAccessTokenFromKakao(code);
        KakaoUserInfoResponseDto userInfo = kakaoService.getUserInfo(accessToken);

        String jwtToken = jwtTokenProvider.createToken(userInfo.getId().toString());

        // 사용자 정보를 담아 응답
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("user", userInfo);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody NicknameRegisterRequestDto request) {
        Long kakaoId = request.getKakaoId();
        String nickname = request.getNickname();

        // 이미 존재하면 중복 처리
        if (userRepository.findByKakaoId(kakaoId).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 가입된 사용자입니다.");
        }

        // 닉네임 중복 체크 (선택)
        if (userRepository.existsByNickname(nickname)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 닉네임입니다.");
        }

        // 회원가입
        User newUser = userRepository.save(User.builder()
                .kakaoId(kakaoId)
                .nickname(nickname)
                .itemCount(0)
                .build());

        String token = jwtTokenProvider.createToken(kakaoId.toString());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of(
                        "kakaoId", newUser.getKakaoId(),
                        "nickname", newUser.getNickname()
                )
        ));
    }


}