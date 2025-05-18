package com.example.gamjaboo.transaction.service;

import com.example.gamjaboo.transaction.dto.TransactionRequestDto;
import com.example.gamjaboo.transaction.entity.Transaction;
import com.example.gamjaboo.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}

