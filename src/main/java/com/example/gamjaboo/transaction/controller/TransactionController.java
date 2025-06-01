package com.example.gamjaboo.transaction.controller;

import com.example.gamjaboo.common.ApiResponse;
import com.example.gamjaboo.transaction.dto.TransactionRequestDto;
import com.example.gamjaboo.transaction.dto.TransactionResponseDto;
import com.example.gamjaboo.transaction.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/record")
    public ResponseEntity<ApiResponse<Void>> recordTransaction(@RequestBody TransactionRequestDto dto) {
        transactionService.record(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(201, "success", "일일 거래 등록 성공", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransactionResponseDto>>> getTransactions(
            @RequestParam("kakaoId") Long kakaoId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<TransactionResponseDto> response = transactionService.getAllByKakaoIdAndDate(kakaoId, date);
        return ResponseEntity.ok(new ApiResponse<>(200, "success", "일일 거래 목록 조회 성공", response));
    }



    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArg(IllegalArgumentException e) {
        return ResponseEntity
                .badRequest()
                .body(new ApiResponse<>(400, "fail", e.getMessage(), null));
    }
}

