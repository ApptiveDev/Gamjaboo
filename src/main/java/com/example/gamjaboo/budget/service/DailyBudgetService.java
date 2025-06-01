package com.example.gamjaboo.budget.service;

import com.example.gamjaboo.budget.dto.BudgetRequestDto;
import com.example.gamjaboo.budget.entity.DailyBudget;
import com.example.gamjaboo.budget.repository.DailyBudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DailyBudgetService {
    private final DailyBudgetRepository budgetRepository;

    public void register(BudgetRequestDto dto) {
        if (budgetRepository.findByKakaoIdAndDate(dto.getKakaoId(), dto.getDate()).isPresent()) {
            throw new IllegalArgumentException("이미 등록된 예산입니다.");
        }
        DailyBudget budget = DailyBudget.builder()
                .id(null)
                .kakaoId(dto.getKakaoId())
                .date(dto.getDate())
                .amount(dto.getAmount())
                .build();

        budgetRepository.save(budget);
    }
}
