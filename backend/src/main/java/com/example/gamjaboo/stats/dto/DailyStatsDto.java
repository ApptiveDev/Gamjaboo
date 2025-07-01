package com.example.gamjaboo.stats.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyStatsDto {
    private LocalDate date;
    private int totalSpent;
    private int totalIncome;
    private int minAmount;
    private int maxAmount;
    private String color; // blue, green, red
}
