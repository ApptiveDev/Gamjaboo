package com.example.gamjaboo.transaction.service;

import com.example.gamjaboo.transaction.dto.TransactionRequestDto;
import com.example.gamjaboo.transaction.dto.TransactionResponseDto;
import com.example.gamjaboo.transaction.entity.Transaction;
import com.example.gamjaboo.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public void record(TransactionRequestDto dto) {
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

    public List<TransactionResponseDto> getAllByKakaoIdAndDate(Long kakaoId, LocalDate date) {
        List<Transaction> transactions = transactionRepository.findAllByKakaoIdAndDate(kakaoId, date);

        if (transactions.isEmpty()) {
            throw new IllegalArgumentException("해당 날짜에 등록된 거래 내역이 없습니다.");
        }

        return transactions.stream()
                .map(tx -> new TransactionResponseDto(
                        tx.getTransactionId(),
                        tx.getKakaoId(),
                        tx.getCategoryId(),
                        tx.getAmount(),
                        tx.getTransactionType().name(),
                        tx.getDate(),
                        tx.getIsFixed(),
                        tx.getMemo()
                ))
                .toList();
    }
}

