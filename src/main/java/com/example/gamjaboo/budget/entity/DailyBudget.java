package com.example.gamjaboo.budget.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "daily_budget")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DailyBudget {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long kakaoId;
    private LocalDate date;
    private int amount;
}