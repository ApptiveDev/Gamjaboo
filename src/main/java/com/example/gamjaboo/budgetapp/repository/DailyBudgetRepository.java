package com.example.gamjaboo.budgetapp.repository;

import com.example.gamjaboo.budgetapp.entity.DailyBudget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DailyBudgetRepository extends JpaRepository<DailyBudget, Long> {
    Optional<DailyBudget> findByKakaoIdAndDate(Long kakaoId, LocalDate date);
}
