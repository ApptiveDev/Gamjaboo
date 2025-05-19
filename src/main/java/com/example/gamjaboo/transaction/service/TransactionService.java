package com.example.gamjaboo.transaction.service;

import com.example.gamjaboo.transaction.dto.TransactionRequestDto;
import com.example.gamjaboo.transaction.dto.TransactionResponseDto;
import com.example.gamjaboo.transaction.entity.Transaction;
import com.example.gamjaboo.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public Integer record(TransactionRequestDto dto) {
        Transaction transaction = Transaction.builder()
                .kakaoId(dto.getKakaoId())
                .categoryId(dto.getCategoryId())
                .amount(dto.getAmount())
                .transactionType(dto.getTransactionType())
                .date(dto.getDate())
                .isFixed(dto.getIsFixed())
                .memo(dto.getMemo())
                .build();

        Transaction saved = transactionRepository.save(transaction);

        return saved.getTransactionId();
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

    public void removeTransaction(Long id) {
        Optional<Transaction> transaction = transactionRepository.findById(id);

        if (transaction.isEmpty()) {
            throw new IllegalArgumentException("해당 거래 목록이 없습니다.");
        }

        transactionRepository.deleteById(id);
    }

    public Integer updateTransaction(Long id, TransactionRequestDto dto) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 거래 내역이 존재하지 않습니다."));

        transaction.updateFrom(dto);

        Transaction saved = transactionRepository.save(transaction);

        return saved.getTransactionId();
    }
}

