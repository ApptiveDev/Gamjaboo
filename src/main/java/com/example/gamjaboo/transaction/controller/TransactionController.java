package com.example.gamjaboo.transaction.controller;

import com.example.gamjaboo.common.ApiResponse;
import com.example.gamjaboo.transaction.dto.TransactionRequestDto;
import com.example.gamjaboo.transaction.dto.TransactionResponseDto;
import com.example.gamjaboo.transaction.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
@Slf4j
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/record")
    public ResponseEntity<ApiResponse<Map<String, Integer>>> recordTransaction(@RequestBody TransactionRequestDto dto) {
        Map<String, Integer> response = Map.of("transactionId", transactionService.record(dto));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<Map<String, Integer>>(201, "success", "일일 거래 등록 성공", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransactionResponseDto>>> getTransactions(
            @RequestParam("kakaoId") Long kakaoId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<TransactionResponseDto> response = transactionService.getAllByKakaoIdAndDate(kakaoId, date);
        return ResponseEntity.ok(new ApiResponse<>(200, "success", "일일 거래 목록 조회 성공", response));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> removeTransaction(@PathVariable("id") Long id) {
        transactionService.removeTransaction(id);

        return ResponseEntity.ok(new ApiResponse<>(200, "success", "거래 내역 삭제 성공", null));
    }


    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArg(IllegalArgumentException e) {
        return ResponseEntity
                .badRequest()
                .body(new ApiResponse<>(400, "fail", e.getMessage(), null));
    }
}

