package com.example.gamjaboo.stats.service;

import com.example.gamjaboo.budget.entity.DailyBudget;
import com.example.gamjaboo.budget.repository.DailyBudgetRepository;
import com.example.gamjaboo.stats.dto.DailyStatsDto;
import com.example.gamjaboo.stats.dto.PeriodStatsDto;
import com.example.gamjaboo.transaction.TransactionType;
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

    // 예산 정보, 총 소득 및 소비, 예산과 총 소비에 따른 색깔을 담은 dto 객체 생성해서 반환
    public DailyStatsDto getDailyStats(Long kakaoId, LocalDate date) {
        List<Transaction> txs = transactionRepository.findAllByKakaoIdAndDate(kakaoId, date);

        long totalSpent = txs.stream()
                .filter(tx -> tx.getTransactionType() == TransactionType.E)
                .mapToLong(Transaction::getAmount)
                .sum();

        long totalIncome = txs.stream()
                .filter(tx -> tx.getTransactionType() == TransactionType.I)
                .mapToLong(Transaction::getAmount)
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

        long totalSpent = 0L;
        long totalIncome = 0L;
//        long trafficSpent = 0L;
//        long foodSpent = 0L;
//        long leisureSpent = 0L;
//        long livingSpent = 0L;
//        long etcSpent = 0L;
//        long fixedSpent = 0L;

        for (Transaction tx : txs) {
            // 전체 지출 계산
            if (tx.getTransactionType() == TransactionType.E) {
                totalSpent += tx.getAmount();

//                // 카테고리별 지출 계산
//                switch (tx.getCategory().getCategoryName()) {
//                    case "교통" -> trafficSpent += tx.getAmount();
//                    case "식비" -> foodSpent += tx.getAmount();
//                    case "여가" -> leisureSpent += tx.getAmount();
//                    case "생활" -> livingSpent += tx.getAmount();
//                    case "기타" -> etcSpent += tx.getAmount();
//                    case "고정" -> fixedSpent += tx.getAmount();
//                }
            }
            // 전체 소득 계산
            else if (tx.getTransactionType() == TransactionType.I) {
                totalIncome += tx.getAmount();
            }
        }

        List<TransactionResponseDto> dtos = getTransactionsByPeriodAsc(txs);

        return new PeriodStatsDto(startDate, endDate, totalSpent, totalIncome, dtos);
//        return new PeriodStatsDto(startDate, endDate, totalSpent, totalIncome,
//                trafficSpent, foodSpent, leisureSpent, livingSpent, etcSpent, fixedSpent, dtos);
    }

    private List<TransactionResponseDto> getTransactionsByPeriodAsc(List<Transaction> txs) {
        List<TransactionResponseDto> dtos = txs.stream()
                .sorted((tx1, tx2) -> tx1.getDate().compareTo(tx2.getDate()))
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

        return dtos;
    }
}
