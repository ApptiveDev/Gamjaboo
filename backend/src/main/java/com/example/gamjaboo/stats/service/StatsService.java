package com.example.gamjaboo.stats.service;

import com.example.gamjaboo.budget.entity.DailyBudget;
import com.example.gamjaboo.budget.repository.DailyBudgetRepository;
import com.example.gamjaboo.stats.dto.DailyStatsDto;
import com.example.gamjaboo.stats.dto.PeriodStatsDto;
import com.example.gamjaboo.transaction.TransactionType;
import com.example.gamjaboo.transaction.category.CategoryRepository;
import com.example.gamjaboo.transaction.dto.TransactionResponseDto;
import com.example.gamjaboo.transaction.entity.Transaction;
import com.example.gamjaboo.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatsService {

    private final TransactionRepository transactionRepository;
    private final DailyBudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;

    // 예산 정보, 총 소득 및 소비, 예산과 총 소비에 따른 색깔을 담은 dto 객체 생성해서 반환
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

    // 주간 거래 통계 정보를 담은 dto 반환
    public PeriodStatsDto getWeeklyStats(Long kakaoId, LocalDate date) {
        LocalDate startDate = date.with(DayOfWeek.MONDAY);
        LocalDate endDate = startDate.plusDays(6);

        return getPeriodStatsDto(kakaoId, startDate, endDate);
    }
    
    
    // 월간 거래 통계 정보를 담은 dto 반환
   public PeriodStatsDto getMonthlyStats(Long kakaoId, LocalDate date) {
       LocalDate startDate = date.withDayOfMonth(1);
       LocalDate endDate = startDate.plusMonths(1).withDayOfMonth(1).minusDays(1);

       return getPeriodStatsDto(kakaoId, startDate, endDate);
   }



    // 기간 사이의 모든 거래 내역 조회 및 총 소득, 소비 계산해서 dto 객체 생성
    public PeriodStatsDto getPeriodStatsDto(Long kakaoId, LocalDate startDate, LocalDate endDate) {
        List<Transaction> txs = transactionRepository.findAllByKakaoIdAndDateBetween(kakaoId, startDate, endDate);

        int totalSpent = txs.stream()
                .filter(tx -> tx.getTransactionType() == TransactionType.E)
                .mapToInt(Transaction::getAmount)
                .sum();

        int totalIncome = txs.stream()
                .filter(tx -> tx.getTransactionType() == TransactionType.I)
                .mapToInt(Transaction::getAmount)
                .sum();

        List<TransactionResponseDto> dtos = txs.stream()
                .map(tx -> new TransactionResponseDto(
                            tx.getTransactionId(),
                            tx.getKakaoId(),
                            tx.getCategory().getCategoryName(),
                            tx.getAmount(),
                            tx.getTransactionType().name(),
                            tx.getBackground(),
                            tx.getDate(),
                            tx.getIsFixed(),
                            tx.getMemo()
                ))
                .toList();

        return new PeriodStatsDto(startDate, endDate, totalSpent, totalIncome, dtos);
    }

}
