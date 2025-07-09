package com.example.gamjaboo.transaction.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponseDto {

    private Integer transactionId;

    private Long kakaoId;

    private String categoryName;

    private Integer amount;

    private String transactionType;  // Enum → String

    @Size(max = 10)
    private String background;

    private LocalDate date;

    private Boolean isFixed;

    private String memo;
}