package com.example.gamjaboo.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private int code;       // HTTP 상태 코드 (200, 400, 500...)
    private String status;  // success / error
    private String message; // 사용자에게 줄 메세지
    private T data;         // 실제 응답 데이터
}