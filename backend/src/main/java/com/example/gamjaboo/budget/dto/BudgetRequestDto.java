package com.example.gamjaboo.budget.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BudgetRequestDto {
    private Long kakaoId;
    private LocalDate date;
    private int minAmount;
    private int maxAmount;
}
