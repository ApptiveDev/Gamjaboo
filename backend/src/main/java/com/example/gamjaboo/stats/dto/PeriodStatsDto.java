package com.example.gamjaboo.stats.dto;

import com.example.gamjaboo.transaction.dto.TransactionResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PeriodStatsDto {

    private LocalDate startDate;
    private LocalDate endDate;
    private int totalSpent;
    private int totalIncome;
    private List<TransactionResponseDto> transactions;
}
