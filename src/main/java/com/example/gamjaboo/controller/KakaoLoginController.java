package com.example.gamjaboo.controller;

import com.example.gamjaboo.security.JwtTokenProvider;
import com.example.gamjaboo.dto.KakaoUserInfoResponseDto;
import com.example.gamjaboo.service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

}