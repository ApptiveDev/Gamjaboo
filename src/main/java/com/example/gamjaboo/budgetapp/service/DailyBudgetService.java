package com.example.gamjaboo.budgetapp.service;

import com.example.gamjaboo.budgetapp.dto.BudgetRequestDto;
import com.example.gamjaboo.budgetapp.entitiy.DailyBudget;
import com.example.gamjaboo.budgetapp.repository.DailyBudgetRepository;
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
        DailyBudget budget = new DailyBudget(null, dto.getKakaoId(), dto.getDate(), dto.getAmount());
        budgetRepository.save(budget);
    }
}
