package com.example.gamjaboo.budget.repository;

import com.example.gamjaboo.budget.entity.DailyBudget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DailyBudgetRepository extends JpaRepository<DailyBudget, Long> {
    Optional<DailyBudget> findByKakaoIdAndDate(Long kakaoId, LocalDate date);
}
