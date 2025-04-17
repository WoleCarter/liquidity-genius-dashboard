
import { useToast } from "@/hooks/use-toast";

interface ConnectAccountResponse {
  status: string;
  message: string;
  timestamp: string;
  data: {
    mono_url: string;
    customer: string;
    meta: {
      ref: string;
    };
    scope: string;
    institution: Record<string, unknown>;
    redirect_url: string;
    is_multi: boolean;
    created_at: string;
  };
}

interface ConnectAccountData {
  name: string;
  email: string;
}

export const useConnectAccount = () => {
  const { toast } = useToast();

  const connectAccount = async () => {
    try {
      const response = await fetch('https://liquidityai.onrender.com/mono/api/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Samuel Olamide",
          email: "samuel@neem.com"
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect account');
      }

      const data: ConnectAccountResponse = await response.json();
      
      // Open the Mono URL in the same window
      window.location.href = data.data.mono_url;

      toast({
        title: "Success",
        description: "Account connection initiated",
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect account. Please try again.",
      });
    }
  };

  return { connectAccount };
};
