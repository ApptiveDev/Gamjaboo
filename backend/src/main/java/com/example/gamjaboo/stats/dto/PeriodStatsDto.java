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
    private long totalSpent;
    private long totalIncome;

//    private long trafficSpent;  // 교통
//    private long foodSpent;     // 식비
//    private long leisureSpent;  // 여가
//    private long livingSpent;   // 생활
//    private long etcSpent;      // 기타
//    private long fixedSpent;    // 고정

    private List<TransactionResponseDto> transactions;
}
