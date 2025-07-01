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
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DailyBudgetController {
    private final DailyBudgetService dailyBudgetService;

    // 일일 예산 등록
    @PostMapping("/budget")
    public ResponseEntity<ApiResponse<Void>> registerBudget(@RequestBody BudgetRequestDto dto) {
        dailyBudgetService.register(dto);

        ApiResponse<Void> response = new ApiResponse<>(201, "success", "예산 등록 성공", null);
        return ResponseEntity.status(201).body(response);
    }

    // 일일 예산 조회
    @GetMapping("/budget/{date}")
    public ResponseEntity<ApiResponse<BudgetResponseDto>> getBudget(
            @RequestParam("kakaoId") Long kakaoId,
            @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        BudgetResponseDto dto = dailyBudgetService.getDailyBudget(kakaoId, date);

        return ResponseEntity.ok(new ApiResponse<>(200, "success", "일일 예산 조회 성공", dto));
    }

    // 일일 예산 삭제
    @DeleteMapping("/budget/{date}")
    public ResponseEntity<ApiResponse<Void>> deleteBudget(
            @RequestParam("kakaoId") Long kakaoId,
            @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        dailyBudgetService.deleteBudget(kakaoId, date);

        return ResponseEntity.ok(new ApiResponse<>(200, "success", "일일 예산 삭제 성공", null));
    }

    // 일일 예산 수정
    @PutMapping("/budget")
    public ResponseEntity<ApiResponse<Map<String, Long>>> updateBudget(@RequestBody BudgetRequestDto dto) {
        Long id = dailyBudgetService.updateBudget(dto);
        Map<String, Long> response = Map.of("budgetId", id);

        return ResponseEntity.ok(new ApiResponse<>(200, "success", "일일 예산 수정 성공", response));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArg(IllegalArgumentException e) {
        return ResponseEntity
                .badRequest()
                .body(new ApiResponse<>(400, "fail", e.getMessage(), null));
    }
}