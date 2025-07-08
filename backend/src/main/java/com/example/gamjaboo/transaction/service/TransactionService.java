package com.example.gamjaboo.transaction.service;

import com.example.gamjaboo.transaction.category.Category;
import com.example.gamjaboo.transaction.category.CategoryRepository;
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
    private final CategoryRepository categoryRepository;

    public Integer record(TransactionRequestDto dto) {
        Category category = categoryRepository.findByCategoryName(dto.getCategoryName())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리 입니다."));

        Transaction transaction = Transaction.builder()
                .kakaoId(dto.getKakaoId())
                .category(category)
                .amount(dto.getAmount())
                .transactionType(dto.getTransactionType())
                .background(dto.getBackground())
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
                .map(tx -> {
                    String categoryName = categoryRepository.findById(tx.getCategory().getCategoryId())
                            .orElseThrow(() -> new IllegalArgumentException("카테고리를 찾을 수 없습니다."))
                            .getCategoryName();

                    return new TransactionResponseDto(
                            tx.getTransactionId(),
                            tx.getKakaoId(),
                            categoryName,
                            tx.getAmount(),
                            tx.getTransactionType().name(),
                            tx.getBackground(),
                            tx.getDate(),
                            tx.getIsFixed(),
                            tx.getMemo()
                    );
                })
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

        Category category = categoryRepository.findByCategoryName(dto.getCategoryName())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다."));

        transaction.updateFrom(dto, category);

        Transaction saved = transactionRepository.save(transaction);

        return saved.getTransactionId();
    }
}