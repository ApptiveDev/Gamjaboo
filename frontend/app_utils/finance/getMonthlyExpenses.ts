import apiClient from '@/api/apiClient';
import { SpendingDetails } from '@/types/SpendingDetails';
import { Transaction } from '@/types/Transaction';

type monthlyexpenses = SpendingDetails[];

export const getMonthlyExpenses = async (year: string, month: string): Promise<monthlyexpenses> => {
  const response = await apiClient.get(`/api/stats/monthly/${year}-05-01?kakaoId=1`);
  // Promise<AxiosResponse<T>> 형식 반환
  const monthlyData = response.data.data.transactions;
  console.log("response => ", response.data);
  console.log("monthlyData => ",monthlyData);
  // JS 객체로 파싱된 json 데이터 
  const expenseMap = new Map();
  // [name: string, expenditure: number] 구조

  monthlyData.forEach((item: Transaction) => {
    if (expenseMap.has(item.memo)) {
      const currnetExpenditure = expenseMap.get(item.memo);
      expenseMap.set(item.memo, currnetExpenditure + item.amount);
    } else {
      expenseMap.set(item.memo, item.amount);
    }
  });

  const monthlyExpenses: monthlyexpenses = [];
  expenseMap.forEach((value, key) => {
    monthlyExpenses.push({ memo: key, amount: value });
  })

  return monthlyExpenses
}