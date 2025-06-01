package com.example.gamjaboo.stats.service;

import com.example.gamjaboo.budget.entity.DailyBudget;
import com.example.gamjaboo.budget.repository.DailyBudgetRepository;
import com.example.gamjaboo.stats.dto.DailyStatsDto;
import com.example.gamjaboo.transaction.TransactionType;
import com.example.gamjaboo.transaction.entity.Transaction;
import com.example.gamjaboo.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final TransactionRepository transactionRepository;
    private final DailyBudgetRepository budgetRepository;

    public DailyStatsDto getDailyStats(Long kakaoId, LocalDate date) {
        List<Transaction> txs = transactionRepository.findAllByKakaoIdAndDate(kakaoId, date);

        int totalSpent = txs.stream()
                .filter(tx -> tx.getTransactionType() == TransactionType.E)
                .mapToInt(Transaction::getAmount)
                .sum();

        int totalIncome = txs.stream()
                .filter(tx -> tx.getTransactionType() == TransactionType.I)
                .mapToInt(Transaction::getAmount)
                .sum();

        DailyBudget budget = budgetRepository.findByKakaoIdAndDate(kakaoId, date)
                .orElseThrow(() -> new IllegalArgumentException("해당 날짜에 예산이 존재하지 않습니다"));

        int minAmount = budget.getMinAmount();
        int maxAmount = budget.getMaxAmount();

        String color = totalSpent < minAmount ? "blue"
                : totalSpent <= maxAmount ? "green"
                : "red";

        return new DailyStatsDto(date, totalSpent, totalIncome, minAmount, maxAmount, color);
    }
}
