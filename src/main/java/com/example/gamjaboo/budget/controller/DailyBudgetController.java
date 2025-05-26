package com.example.gamjaboo.budget.controller;

import com.example.gamjaboo.budget.dto.BudgetResponseDto;
import com.example.gamjaboo.common.ApiResponse;
import com.example.gamjaboo.budget.dto.BudgetRequestDto;
import com.example.gamjaboo.budget.service.DailyBudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DailyBudgetController {
    private final DailyBudgetService dailyBudgetService;

    @PostMapping("/budget")
    public ResponseEntity<ApiResponse<Void>> registerBudget(@RequestBody BudgetRequestDto dto) {
        dailyBudgetService.register(dto);

        ApiResponse<Void> response = new ApiResponse<>(201, "success", "예산 등록 성공", null);
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/budget/{date}")
    public ResponseEntity<ApiResponse<BudgetResponseDto>> getBudget(
            @RequestParam("kakaoId") Long kakaoId,
            @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        BudgetResponseDto dto = dailyBudgetService.getDailyBudget(kakaoId, date);

        return ResponseEntity.ok(new ApiResponse<>(200, "success", "일일 예산 조회 성공", dto));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArg(IllegalArgumentException e) {
        return ResponseEntity
                .badRequest()
                .body(new ApiResponse<>(400, "fail", e.getMessage(), null));
    }
}