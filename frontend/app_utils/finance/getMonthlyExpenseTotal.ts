import apiClient from '@/api/apiClient';
import { Transaction } from '@/types/Transaction';

export const getMonthlyExpenseTotal = async (year: string, month: string): Promise<number> => {
  const response = await apiClient.get(`/api/stats/monthly/${year}-05-01?kakaoId=1`); 
  const totalSpent: number = response.data.data.totalSpent;
  
  console.log("totalSpent=> ", totalSpent);

  return totalSpent;
}