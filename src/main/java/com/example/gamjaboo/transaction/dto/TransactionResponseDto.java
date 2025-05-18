package com.example.gamjaboo.transaction.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class TransactionResponseDto {
    private Integer transactionId;
    private Long kakaoId;
    private Integer categoryId;
    private Integer amount;
    private String transactionType;  // Enum → String
    private LocalDate date;
    private Boolean isFixed;
    private String memo;
}
