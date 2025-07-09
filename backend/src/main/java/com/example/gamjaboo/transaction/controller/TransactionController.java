package com.example.gamjaboo.transaction.controller;

import com.example.gamjaboo.common.ApiResponse;
import com.example.gamjaboo.stats.dto.DailyStatsDto;
import com.example.gamjaboo.transaction.dto.TransactionRequestDto;
import com.example.gamjaboo.transaction.dto.TransactionResponseDto;
import com.example.gamjaboo.transaction.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
@Slf4j
public class TransactionController {

    private final TransactionService transactionService;

    // 거래 내역 등록
    @PostMapping("/record")
    public ResponseEntity<ApiResponse<?>> recordTransaction(
            @Valid @RequestBody TransactionRequestDto dto,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );

            ApiResponse<Map<String, String>> errorResponse = new ApiResponse<>(
                    400, "fail", "배경은 10자 이내여야 합니다.", errors
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }

        Map<String, Integer> response = Map.of("transactionId", transactionService.record(dto));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(201, "success", "일일 거래 등록 성공", response));
    }


    // (YYYY-MM-DD)의 거래 내역 조회
    @GetMapping
    public ResponseEntity<ApiResponse<List<TransactionResponseDto>>> getTransactions(
            @RequestParam("kakaoId") Long kakaoId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<TransactionResponseDto> response = transactionService.getAllByKakaoIdAndDate(kakaoId, date);
        return ResponseEntity.ok(new ApiResponse<>(200, "success", "일일 거래 목록 조회 성공", response));
    }

    // 거래 내역 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> removeTransaction(@PathVariable("id") Long id) {
        transactionService.removeTransaction(id);

        return ResponseEntity.ok(new ApiResponse<>(200, "success", "거래 내역 삭제 성공", null));
    }

    // 카테고리 수정
    @PatchMapping("/{id}/{newCategoryName}")
    public ResponseEntity<ApiResponse<Map<String, Integer>>> changeCategory(@PathVariable("id") Long id, @PathVariable("newCategoryName") String newCategoryName) {
        Map<String, Integer> response = Map.of("transactionId", transactionService.updateCategory(id, newCategoryName));

        return ResponseEntity.ok(new ApiResponse<>(200, "success", "카테고리 수정 성공", response));
    }

    // 거래 내역 수정
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateTransaction(@PathVariable("id") Long id,
                                                            @Valid @RequestBody TransactionRequestDto dto,
                                                            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));

            ApiResponse<Map<String, String>> erorResponse = new ApiResponse<>(
                    400, "fail", "배경은 10자 이내여야 합니다", errors
            );

            return ResponseEntity.badRequest().body(erorResponse);
        }

        Map<String, Integer> response = Map.of("transactionId", transactionService.updateTransaction(id, dto));

        return ResponseEntity.ok(new ApiResponse<>(200, "success", "거래 내역 수정 성공", response));
    }


    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArg(IllegalArgumentException e) {
        return ResponseEntity
                .badRequest()
                .body(new ApiResponse<>(400, "fail", e.getMessage(), null));
    }
}

