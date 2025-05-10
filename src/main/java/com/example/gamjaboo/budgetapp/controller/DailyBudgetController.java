package com.example.gamjaboo.budgetapp.controller;

import com.example.gamjaboo.budgetapp.common.ApiResponse;
import com.example.gamjaboo.budgetapp.dto.BudgetRequestDto;
import com.example.gamjaboo.budgetapp.service.DailyBudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArg(IllegalArgumentException e) {
        return ResponseEntity
                .badRequest()
                .body(new ApiResponse<>(400, "fail", e.getMessage(), null));
    }
}
