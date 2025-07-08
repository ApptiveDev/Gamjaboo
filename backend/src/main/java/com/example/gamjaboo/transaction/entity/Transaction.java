package com.example.gamjaboo.transaction.entity;

import com.example.gamjaboo.transaction.TransactionType;
import com.example.gamjaboo.transaction.category.Category;
import com.example.gamjaboo.transaction.dto.TransactionRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionId;

    private Long kakaoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    private Integer amount;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('I','E')", nullable = false)
    private TransactionType transactionType;

    @Column(length = 10)
    private String background;

    private LocalDate date;

    private Boolean isFixed;

    @Column(columnDefinition = "TEXT")
    private String memo;

    public void updateFrom(TransactionRequestDto dto, Category category) {
        this.category = category;
        this.amount = dto.getAmount();
        this.transactionType = dto.getTransactionType();
        this.background = dto.getBackground();
        this.date = dto.getDate();
        this.isFixed = dto.getIsFixed();
        this.memo = dto.getMemo();
    }
}
