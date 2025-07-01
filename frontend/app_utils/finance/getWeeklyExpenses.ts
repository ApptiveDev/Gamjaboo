import apiClient from "@/api/apiClient";
import { getWeekOfMonth } from "@/app_utils/calendar/getWeekOfMonth";
import { SpendingDetails } from "@/types/SpendingDetails";
import { Transaction } from "@/types/Transaction";
import { WeeklyExpenses } from "@/types/WeeklyExpenses";

export const getWeeklyExpenses = async (year: string, month: string): Promise<WeeklyExpenses> => {
  const response = await apiClient.get(`/api/stats/monthly/${year}-05-01?kakaoId=1`);
  const monthlyData = response.data.data.transactions;
  const week1Total = new Map();
  const week2Total = new Map();
  const week3Total = new Map();
  const week4Total = new Map();
  const week5Total = new Map();
  const week6Total = new Map();
  const tallyUp = (expenseMap: Map<string, number>, item: Transaction) => {
    if (expenseMap.has(item.memo)) {
      const currnetExpenditure = expenseMap.get(item.memo);
      expenseMap.set(item.memo, currnetExpenditure! + item.amount);
    } else {
      expenseMap.set(item.memo, item.amount);
    }
  };
  const mapToArray = (expenseMap: Map<string, number>) => {
    const expenseSummary: SpendingDetails[] = [];
    expenseMap.forEach((value, key) => {
      expenseSummary.push({ memo: key, amount: value });
    })

    return expenseSummary
  };

  monthlyData.forEach((item: Transaction) => {
    const weekOfMonth = getWeekOfMonth(item.date);
    if (weekOfMonth === 1) {
      tallyUp(week1Total, item);
    } else if (weekOfMonth === 2) {
      tallyUp(week2Total, item);
    } else if (weekOfMonth === 3) {
      tallyUp(week3Total, item);
    } else if (weekOfMonth === 4) {
      tallyUp(week4Total, item);
    } else if (weekOfMonth === 5) {
      tallyUp(week5Total, item);
    } else if (weekOfMonth === 6) {
      tallyUp(week6Total, item);
    }
  });

  const weeklyExpenses: WeeklyExpenses = {
    week1: mapToArray(week1Total),
    week2: mapToArray(week2Total),
    week3: mapToArray(week3Total),
    week4: mapToArray(week4Total),
    week5: mapToArray(week5Total),
    week6: mapToArray(week6Total),
  };

  return weeklyExpenses
}