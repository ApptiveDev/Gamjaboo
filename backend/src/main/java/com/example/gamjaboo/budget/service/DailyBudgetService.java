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

    // 일일 예산 등록
    public void register(BudgetRequestDto dto) {
        if (budgetRepository.findByKakaoIdAndDate(dto.getKakaoId(), dto.getDate()).isPresent()) {
            throw new IllegalArgumentException("이미 등록된 예산입니다.");
        }

        if (dto.getMinAmount() < 0) {
            throw new IllegalArgumentException("최소 금액은 0 이상이어야 합니다.");
        }

        if (dto.getMaxAmount() < dto.getMinAmount()) {
            throw new IllegalArgumentException("최대 금액은 최소 금액보다 크거나 같아야 합니다.");
        }

        DailyBudget budget = DailyBudget.builder()
                .kakaoId(dto.getKakaoId())
                .date(dto.getDate())
                .minAmount(dto.getMinAmount())
                .maxAmount(dto.getMaxAmount())
                .build();

        budgetRepository.save(budget);
    }

    // 일일 예산 조회
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

    // 일일 예산 삭제
    public void deleteBudget(Long kakaoId, LocalDate date) {
        DailyBudget budget = budgetRepository.findByKakaoIdAndDate(kakaoId, date)
                .orElseThrow(() -> new IllegalArgumentException("해당 날짜의 예산이 존재하지 않습니다"));

        budgetRepository.delete(budget);
    }

    // 일일 예산 수정
    public Long updateBudget(BudgetRequestDto dto) {
        if (dto.getMinAmount() < 0) {
            throw new IllegalArgumentException("최소 금액은 0 이상이어야 합니다.");
        }

        if (dto.getMaxAmount() < dto.getMinAmount()) {
            throw new IllegalArgumentException("최대 금액은 최소 금액보다 크거나 같아야 합니다.");
        }

        DailyBudget budget = budgetRepository.findByKakaoIdAndDate(dto.getKakaoId(), dto.getDate())
                .orElseThrow(() -> new IllegalArgumentException("수정할 예산이 존재하지 않습니다."));

        budget.setMinAmount(dto.getMinAmount());
        budget.setMaxAmount(dto.getMaxAmount());

        DailyBudget updated = budgetRepository.save(budget);
        return updated.getId();
    }
}
