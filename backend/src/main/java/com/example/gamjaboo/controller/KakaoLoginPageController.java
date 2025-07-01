package com.example.gamjaboo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// 로그인 페이지를 반환해 줄 컨트롤러
@RestController
@RequestMapping("/login")
public class KakaoLoginPageController {

    @Value("${kakao.client_id}")
    private String client_id;

    @Value("${kakao.redirect_uri}")
    private String redirect_uri;

    @GetMapping("/page")
    public Map<String, String> loginPage() {
        String location = "https://kauth.kakao.com/oauth/authorize"
                + "?response_type=code"
                + "&client_id=" + client_id
                + "&redirect_uri=" + redirect_uri;

        return Map.of("loginUrl", location);
    }
}

