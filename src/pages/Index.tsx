import React from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SectionTitle } from "@/components/ui/section-title";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { AccountCard } from "@/components/dashboard/account-card";
import { TransferCard } from "@/components/dashboard/transfer-card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  Landmark, 
  DollarSign, 
  LineChart, 
  RefreshCw, 
  Settings,
  Lightbulb,
  BarChart2,
  MessageCircle,
  CreditCard,
  Home,
  RefreshCcw,
  Wallet,
  PiggyBank
} from "lucide-react";

// Sample data for our dashboard
const liquidityData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 4000 },
  { name: "Sep", value: 3000 },
  { name: "Oct", value: 2000 },
  { name: "Nov", value: 2780 },
  { name: "Dec", value: 3890 },
];

const forecastData = [
  { name: "Jan", actual: 4000, forecast: 4200 },
  { name: "Feb", actual: 3000, forecast: 3200 },
  { name: "Mar", actual: 5000, forecast: 4800 },
  { name: "Apr", actual: 2780, forecast: 3000 },
  { name: "May", actual: 1890, forecast: 2200 },
  { name: "Jun", actual: 2390, forecast: 2500 },
  { name: "Jul", actual: 3490, forecast: 3600 },
  { name: "Aug", actual: 4000, forecast: 4100 },
  { name: "Sep", actual: null, forecast: 3800 },
  { name: "Oct", actual: null, forecast: 4200 },
  { name: "Nov", actual: null, forecast: 3900 },
  { name: "Dec", actual: null, forecast: 4500 },
];

const accounts = [
  {
    id: "1",
    name: "Main Checking",
    institution: "Chase Bank",
    accountNumber: "1234567890",
    balance: 125000.75,
    type: "Checking",
    status: "active",
    lastUpdated: "1h ago",
  },
  {
    id: "2",
    name: "Operations Account",
    institution: "Bank of America",
    accountNumber: "0987654321",
    balance: 85750.50,
    type: "Business",
    status: "active",
    lastUpdated: "2h ago",
  },
  {
    id: "3",
    name: "Reserve Account",
    institution: "Wells Fargo",
    accountNumber: "5432167890",
    balance: 250000.00,
    type: "Savings",
    status: "active",
    lastUpdated: "3h ago",
  },
];

const transfers = [
  {
    id: "TR-7890",
    from: {
      account: "Main Checking",
      institution: "Chase Bank",
    },
    to: {
      account: "Operations Account",
      institution: "Bank of America",
    },
    amount: 75000,
    date: "Tomorrow, 10:00 AM",
    status: "scheduled",
    automated: true,
    confidence: 92,
  },
  {
    id: "TR-7889",
    from: {
      account: "Operations Account",
      institution: "Bank of America",
    },
    to: {
      account: "Reserve Account",
      institution: "Wells Fargo",
    },
    amount: 25000,
    date: "Today, 3:15 PM",
    status: "completed",
    automated: true,
    confidence: 89,
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-8">
        <section>
          <SectionTitle 
            title="Liquidity Dashboard" 
            subtitle="Real-time overview of your multi-bank accounts and liquidity position"
          />
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Liquidity"
              value="$460,751.25"
              description="Across all accounts"
              icon={<DollarSign size={18} />}
              trend={{ value: 12.5, positive: true }}
              tooltip="Sum of all available funds across connected bank accounts"
            />
            <StatCard
              title="30-Day Cash Burn"
              value="$85,210.30"
              description="$2,840 per day"
              icon={<LineChart size={18} />}
              trend={{ value: 3.2, positive: false }}
              tooltip="Total outflow of cash over the last 30 days"
            />
          </div>
        </section>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ChartCard
              title="Liquidity Trend"
              subtitle="Historical and forecasted liquidity position"
              data={forecastData}
              height={300}
              type="area"
              dataKey="actual"
              color="hsl(220, 70%, 55%)"
              gradientColor="hsl(220, 70%, 95%)"
            />
            <ChartCard
              title="AI Forecast"
              subtitle="Next 90 days based on historical patterns"
              data={forecastData}
              height={300}
              type="line"
              dataKey="forecast"
              color="hsl(146, 70%, 55%)"
              strokeWidth={2}
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Connected Accounts</h3>
                <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs">
                  <span>View All</span>
                  <ArrowUpRight size={14} />
                </Button>
              </div>
              <div className="space-y-3">
                {accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    name={account.name}
                    institution={account.institution}
                    accountNumber={account.accountNumber}
                    balance={account.balance}
                    type={account.type}
                    status={account.status as any}
                    lastUpdated={account.lastUpdated}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Upcoming Transfers</h3>
                <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs">
                  <span>View All</span>
                  <ArrowUpRight size={14} />
                </Button>
              </div>
              <div className="space-y-3">
                {transfers.map((transfer) => (
                  <TransferCard
                    key={transfer.id}
                    id={transfer.id}
                    from={transfer.from}
                    to={transfer.to}
                    amount={transfer.amount}
                    date={transfer.date}
                    status={transfer.status as any}
                    automated={transfer.automated}
                    confidence={transfer.confidence}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full">
            <SectionTitle 
              title="AI-Powered Features" 
              subtitle="Leverage artificial intelligence to optimize your liquidity"
            />
          </div>
          
          <div className="glass-card p-6 rounded-lg border border-border transition-all hover:shadow-md hover-scale">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <RefreshCw size={18} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Automated Transfers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered system that automatically moves funds between accounts based on forecasted needs and cash flow patterns.
            </p>
            <Link to="/transfers">
              <Button size="sm">Configure Transfers</Button>
            </Link>
          </div>
          
          <div className="glass-card p-6 rounded-lg border border-border transition-all hover:shadow-md hover-scale">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart2 size={18} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">AI Forecasting</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced predictive models that forecast your cash position across all accounts with high accuracy.
            </p>
            <Link to="/forecasting">
              <Button size="sm">View Forecasts</Button>
            </Link>
          </div>
          
          <div className="glass-card p-6 rounded-lg border border-border transition-all hover:shadow-md hover-scale">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lightbulb size={18} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Optimization Engine</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Smart recommendations to maximize interest income and minimize fees across your banking relationships.
            </p>
            <Link to="/optimization">
              <Button size="sm">View Opportunities</Button>
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
