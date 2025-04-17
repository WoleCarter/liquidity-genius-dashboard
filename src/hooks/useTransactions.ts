
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

interface TransactionParams {
  page?: number;
  limit?: number;
}

const fetchTransactions = async ({ page = 1, limit = 10 }: TransactionParams = {}): Promise<TransactionsResponse> => {
  const response = await fetch(
    `https://liquidityai.onrender.com/mono/api/transactions-all?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
};

export const useTransactions = (params: TransactionParams = {}) => {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => fetchTransactions(params),
  });
};

