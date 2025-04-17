
import { useQuery } from "@tanstack/react-query";

interface Institution {
  id: string;
  name: string;
  bank_code: string;
  type: string;
}

interface Account {
  id: string;
  name: string;
  account_number: string;
  currency: string;
  balance: number;
  type: string;
  status: string;
  institution: Institution;
}

interface ApiResponse {
  data: Account[];
  meta: {
    total: number;
    pages: number;
    previous: null | string;
    next: null | string;
  };
}

const fetchAccounts = async (): Promise<ApiResponse> => {
  const response = await fetch("https://liquidityai.onrender.com/mono/api/accounts");
  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return response.json();
};

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });
};
