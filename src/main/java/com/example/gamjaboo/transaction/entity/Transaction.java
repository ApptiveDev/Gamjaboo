package com.example.gamjaboo.transaction.entity;

import com.example.gamjaboo.transaction.TransactionType;
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

    private Integer categoryId;

    private Integer amount;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('I','E')", nullable = false)
    private TransactionType transactionType;

    private LocalDate date;

    private Boolean isFixed;

    @Column(columnDefinition = "TEXT")
    private String memo;
}
