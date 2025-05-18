package com.example.gamjaboo.transaction.service;

import com.example.gamjaboo.transaction.dto.TransactionRequestDto;
import com.example.gamjaboo.transaction.dto.TransactionResponseDto;
import com.example.gamjaboo.transaction.entity.Transaction;
import com.example.gamjaboo.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public void record(TransactionRequestDto dto) {
        if (transactionRepository.findByKakaoIdAndDate(dto.getKakaoId(), dto.getDate()).isPresent()) {
            throw new IllegalArgumentException("이미 등록된 거래입니다.");
        }

        Transaction transaction = Transaction.builder()
                .kakaoId(dto.getKakaoId())
                .categoryId(dto.getCategoryId())
                .amount(dto.getAmount())
                .transactionType(dto.getTransactionType())
                .date(dto.getDate())
                .isFixed(dto.getIsFixed())
                .memo(dto.getMemo())
                .build();

        transactionRepository.save(transaction);
    }

    public TransactionResponseDto getByKakaoIdAndDate(Long kakaoId, LocalDate date) {
        Transaction transaction = transactionRepository.findByKakaoIdAndDate(kakaoId, date)
                .orElseThrow(() -> new IllegalArgumentException("거래 내역이 존재하지 않습니다."));

        return new TransactionResponseDto(
                transaction.getTransactionId(),
                transaction.getKakaoId(),
                transaction.getCategoryId(),
                transaction.getAmount(),
                transaction.getTransactionType().name(),
                transaction.getDate(),
                transaction.getIsFixed(),
                transaction.getMemo()
        );
    }
}

