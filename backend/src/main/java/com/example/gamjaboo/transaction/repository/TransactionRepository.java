package com.example.gamjaboo.transaction.repository;

import com.example.gamjaboo.transaction.dto.TransactionRequestDto;
import com.example.gamjaboo.transaction.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<Transaction> findByKakaoIdAndDate(Long kakaoId, LocalDate date);
    List<Transaction> findAllByKakaoIdAndDate(Long kakaoId, LocalDate date);
    List<Transaction> findAllByKakaoIdAndDateBetween(Long kakaoId, LocalDate startDate, LocalDate endDate);
}
