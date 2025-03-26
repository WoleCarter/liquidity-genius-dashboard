
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/layout/sidebar-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  BarChart3, 
  ChevronLeft, 
  CreditCard, 
  Home, 
  RefreshCcw, 
  Settings,
  Lightbulb,
  Landmark,
  MessageCircle,
  DollarSign
} from "lucide-react";

export function DashboardSidebar() {
  const { isOpen, toggle } = useSidebar();
  const isMobile = useIsMobile();
  
  return (
    <aside 
      className={cn(
        "h-screen border-r bg-card fixed inset-y-0 left-0 z-20 flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-[70px]",
        isMobile && !isOpen && "w-0 -translate-x-full"
      )}
    >
      <div className="h-16 flex items-center px-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 text-primary">
            <Landmark size={18} />
          </div>
          <span className={cn("font-semibold text-lg tracking-tight", !isOpen && "sr-only")}>
            LiquidityAI
          </span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 pt-4">
        <nav className="grid gap-1 px-2">
          <SidebarLink href="/" icon={Home} label="Dashboard" />
          <SidebarLink href="/forecasting" icon={BarChart3} label="AI Forecasting" />
          <SidebarLink href="/transfers" icon={RefreshCcw} label="Auto Transfers" />
          <SidebarLink href="/accounts" icon={CreditCard} label="Bank Accounts" />
          <SidebarLink href="/optimization" icon={Lightbulb} label="Optimization" />
          <SidebarLink href="/assistant" icon={MessageCircle} label="AI Assistant" />
          <SidebarLink href="/conversion" icon={DollarSign} label="FX Conversion" />
          <SidebarLink href="/settings" icon={Settings} label="Settings" />
        </nav>
      </ScrollArea>
      
      <div className="border-t p-4">
        <SidebarCollapseButton />
      </div>
    </aside>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

function SidebarLink({ href, icon: Icon, label }: SidebarLinkProps) {
  const { isOpen } = useSidebar();
  const location = useLocation();
  const isActive = location.pathname === href;
  
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive 
          ? "bg-accent text-accent-foreground font-medium" 
          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
        !isOpen && "justify-center p-2"
      )}
    >
      <Icon size={isOpen ? 16 : 20} />
      {isOpen && <span>{label}</span>}
    </Link>
  );
}

function SidebarCollapseButton() {
  const { isOpen, toggle } = useSidebar();
  const isMobile = useIsMobile();
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggle} 
      className={cn(
        "w-full justify-start",
        !isOpen && "justify-center"
      )}
    >
      <ChevronLeft size={16} className={cn("transition-transform", !isOpen && "rotate-180")} />
      {isOpen && <span className="ml-2">{isMobile ? "Close" : "Collapse"}</span>}
    </Button>
  );
}
