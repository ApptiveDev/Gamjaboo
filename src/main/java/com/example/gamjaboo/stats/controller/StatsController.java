package com.example.gamjaboo.stats.controller;

import com.example.gamjaboo.common.ApiResponse;
import com.example.gamjaboo.stats.dto.DailyStatsDto;
import com.example.gamjaboo.stats.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService statsService;

    @GetMapping("/daily/{date}")
    public ResponseEntity<ApiResponse<DailyStatsDto>> getDailyStats(
            @RequestParam("kakaoId") Long kakaoId,
            @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        DailyStatsDto dto = statsService.getDailyStats(kakaoId, date);

        return ResponseEntity.ok(new ApiResponse<>(200, "success", "일일 거래 통계 조회 성공", dto));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArg(IllegalArgumentException e) {
        return ResponseEntity
                .badRequest()
                .body(new ApiResponse<>(400, "fail", e.getMessage(), null));
    }
}
