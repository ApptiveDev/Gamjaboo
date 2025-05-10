package com.example.gamjaboo.budgetapp.controller;

import com.example.gamjaboo.budgetapp.dto.BudgetRequestDto;
import com.example.gamjaboo.budgetapp.service.DailyBudgetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DailyBudgetController.class)
class DailyBudgetControllerTest {

    @Autowired private MockMvc mockMvc;

    @MockBean private DailyBudgetService dailyBudgetService;

    @Test
    void registerBudget() throws Exception {
        BudgetRequestDto dto = new BudgetRequestDto(1L, LocalDate.of(2025, 5, 10), 10000);

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        mockMvc.perform(post("/api/budget")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());
    }
}