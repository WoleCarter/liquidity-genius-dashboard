
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your LiquidityAI assistant. I can help with bank account information, currency conversion, trade information, and cash optimization. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableElement) {
        scrollableElement.scrollTop = scrollableElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response - in a real app, this would call your backend API
    try {
      await processUserMessage(userMessage.content);
    } catch (error) {
      console.error("Error processing message:", error);
      toast({
        title: "Error",
        description: "Failed to process your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processUserMessage = async (message: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response = "";
    const messageLower = message.toLowerCase();
    
    // Mock responses based on the use cases
    if (messageLower.includes("trade") && messageLower.includes("ngn") && messageLower.includes("usd")) {
      response = "For a $1M trade from NGN to USD, the current rate is ₦1,450 to $1. This would cost approximately ₦1.45B. The best time to execute would be during London market hours. Would you like me to prepare this transaction?";
    } else if (messageLower.includes("convert") && (messageLower.includes("ngn") || messageLower.includes("naira"))) {
      response = "I can help you convert NGN to USD. The current rate is ₦1,450 to $1. How much would you like to convert?";
    } else if (messageLower.includes("connect") && messageLower.includes("bank")) {
      response = "To connect your bank accounts, I'll need your permission to access your banking data securely. Would you like to proceed with connecting your accounts?";
    } else if (messageLower.includes("balances") || messageLower.includes("balance")) {
      response = "Your aggregated balance across all connected accounts is $2.45M. Your main USD account has $1.2M, EUR account has €800K, and NGN account has ₦325M. Based on your current burn rate, you have approximately 4.5 months of runway.";
    } else if (messageLower.includes("optimization") || messageLower.includes("optimize")) {
      response = "Based on your cash flow patterns, I've identified potential optimization opportunities: 1) Move $500K from your low-interest USD account to a higher-yield money market fund for an additional $15K in annual returns. 2) Consolidate your EUR holdings to reduce maintenance fees by €2K per month. Would you like me to prepare these actions?";
    } else if (messageLower.includes("cash burn") || messageLower.includes("runway")) {
      response = "Your current monthly cash burn is approximately $550K. At this rate, your current liquidity will last about 4.5 months. I recommend allocating excess funds from your NGN account to your USD operating account to extend your runway by an additional 2 months.";
    } else {
      response = "I understand you're asking about financial matters. Could you please provide more details about what specifically you'd like to know about your accounts, transfers, or currency conversions?";
    }
    
    // Add AI response
    const aiMessage: Message = {
      id: Date.now().toString(),
      content: response,
      sender: "ai",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 relative" ref={scrollAreaRef}>
        <ScrollArea className="h-full p-4">
          <div className="flex flex-col gap-4 pb-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.sender === "user" && "justify-end")}>
                <div
                  className={cn(
                    "max-w-[85%] md:max-w-[70%] rounded-lg px-4 py-3",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === "ai" ? (
                      <Bot size={14} className="text-primary" />
                    ) : (
                      <User size={14} />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex">
                <div className="bg-muted rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Bot size={14} className="text-primary" />
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <Card className="rounded-t-xl rounded-b-none border-t border-x-0 border-b-0 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Ask about balances, transfers, trades, or optimization..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send size={18} />
          </Button>
        </form>
      </Card>
    </div>
  );
}
