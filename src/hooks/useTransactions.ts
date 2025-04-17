
import { useQuery } from "@tanstack/react-query";

interface Transaction {
  id: string;
  narration: string;
  amount: number;
  type: "credit" | "debit";
  category: string | null;
  currency: string;
  balance: number;
  date: string;
}

interface TransactionsResponse {
  status: string;
  message: string;
  total: number;
  transactions: Transaction[];
}

const fetchTransactions = async (): Promise<TransactionsResponse> => {
  const response = await fetch("https://liquidityai.onrender.com/mono/api/transactions-all");
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
};
