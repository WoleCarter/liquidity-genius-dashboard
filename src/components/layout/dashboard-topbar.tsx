
import React from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/layout/sidebar-provider";

export function DashboardTopbar() {
  const { isOpen } = useSidebar();
  
  return (
    <header className={cn(
      "h-16 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-10 transition-all duration-300",
      isOpen ? "ml-64" : "ml-[70px]"
    )}>
      <div className="flex items-center gap-4 lg:gap-6">
        <form className="hidden md:flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-[200px] lg:w-[280px] rounded-md border bg-background px-8 text-sm outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>
        </form>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell size={18} />
          <span className="sr-only">Notifications</span>
        </Button>
        
        <Avatar className="h-8 w-8">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="text-xs">TM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

import { cn } from "@/lib/utils";
