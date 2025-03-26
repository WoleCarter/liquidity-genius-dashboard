
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
];

// Mock exchange rates relative to USD
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.79,
  NGN: 1450,
  KES: 130,
  ZAR: 18.5,
  GHS: 14.5,
};

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("NGN");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (convertedAmount !== null) {
      setAmount(convertedAmount.toString());
      setConvertedAmount(parseFloat(amount));
    }
  };

  const handleConvert = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const fromRate = exchangeRates[fromCurrency];
      const toRate = exchangeRates[toCurrency];
      const amountInUSD = parseFloat(amount) / fromRate;
      const result = amountInUSD * toRate;
      
      setConvertedAmount(parseFloat(result.toFixed(2)));
      setIsLoading(false);
    }, 800);
  };

  const formatCurrency = (code: string, value: number) => {
    const currency = currencies.find(c => c.code === code);
    return `${currency?.symbol || ''}${value.toLocaleString()}`;
  };

  const getFromSymbol = () => {
    const currency = currencies.find(c => c.code === fromCurrency);
    return currency?.symbol || '';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>Convert between currencies using real-time exchange rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">From</label>
          <div className="flex gap-3">
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Currencies</SelectLabel>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.symbol}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {getFromSymbol()}
              </span>
              <Input
                className="pl-7"
                placeholder="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="icon" onClick={handleSwapCurrencies}>
            <ArrowDownUp size={16} />
          </Button>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">To</label>
          <div className="flex gap-3">
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Currencies</SelectLabel>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.symbol}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 flex items-center">
              {convertedAmount !== null ? (
                <span>{formatCurrency(toCurrency, convertedAmount)}</span>
              ) : (
                <span className="text-muted-foreground">Converted amount</span>
              )}
            </div>
          </div>
        </div>

        {convertedAmount !== null && (
          <div className="p-3 bg-muted rounded-md mt-4">
            <p className="text-sm">
              <span className="font-medium">{formatCurrency(fromCurrency, parseFloat(amount))}</span> = <span className="font-medium">{formatCurrency(toCurrency, convertedAmount)}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Rate: 1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleConvert} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            'Convert'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
