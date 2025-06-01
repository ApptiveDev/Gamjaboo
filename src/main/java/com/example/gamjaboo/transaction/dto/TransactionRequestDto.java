package com.example.gamjaboo.transaction.dto;

import com.example.gamjaboo.transaction.TransactionType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequestDto {

    private Long kakaoId;

    private Integer categoryId;

    private Integer amount;

    private TransactionType transactionType;

    private LocalDate date;

    private Boolean isFixed;

    private String memo;
}
