export interface Transaction {
  amount: number;
  categoryId: number;
  date: string;
  isFixed: boolean;
  kakaoId: number;
  memo: string;
  transactionId: number;
  transactionType: string;
}