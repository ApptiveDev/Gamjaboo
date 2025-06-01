package com.example.gamjaboo.budget.service;

import com.example.gamjaboo.budget.dto.BudgetRequestDto;
import com.example.gamjaboo.budget.dto.BudgetResponseDto;
import com.example.gamjaboo.budget.entity.DailyBudget;
import com.example.gamjaboo.budget.repository.DailyBudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DailyBudgetService {
    private final DailyBudgetRepository budgetRepository;

    public void register(BudgetRequestDto dto) {
        if (budgetRepository.findByKakaoIdAndDate(dto.getKakaoId(), dto.getDate()).isPresent()) {
            throw new IllegalArgumentException("이미 등록된 예산입니다.");
        }
        DailyBudget budget = DailyBudget.builder()
                .kakaoId(dto.getKakaoId())
                .date(dto.getDate())
                .minAmount(dto.getMinAmount())
                .maxAmount(dto.getMaxAmount())
                .build();

        budgetRepository.save(budget);
    }

    public BudgetResponseDto getDailyBudget(Long kakaoId, LocalDate date) {
        DailyBudget budget = budgetRepository.findByKakaoIdAndDate(kakaoId, date)
                .orElseThrow(() -> new IllegalArgumentException("등록된 일일 예산이 없습니다"));

        return new BudgetResponseDto(
            budget.getId(),
            budget.getKakaoId(),
            budget.getDate(),
            budget.getMinAmount(),
            budget.getMaxAmount()
        );
    }

}
