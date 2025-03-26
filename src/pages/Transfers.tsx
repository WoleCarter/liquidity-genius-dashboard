
import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SectionTitle } from "@/components/ui/section-title";
import { TransferCard } from "@/components/dashboard/transfer-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRightLeft, Lightbulb, Plus, Settings } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Sample data
const scheduledTransfers = [
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
    id: "TR-7895",
    from: {
      account: "Revenue Account",
      institution: "Chase Bank",
    },
    to: {
      account: "Reserve Account",
      institution: "Wells Fargo",
    },
    amount: 50000,
    date: "Next Monday, 9:00 AM",
    status: "scheduled",
    automated: false,
  },
];

const completedTransfers = [
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
  {
    id: "TR-7888",
    from: {
      account: "Main Checking",
      institution: "Chase Bank",
    },
    to: {
      account: "Payroll Account",
      institution: "Bank of America",
    },
    amount: 120000,
    date: "Yesterday, 2:00 PM",
    status: "completed",
    automated: false,
  },
  {
    id: "TR-7885",
    from: {
      account: "Revenue Account",
      institution: "Chase Bank",
    },
    to: {
      account: "Tax Reserve",
      institution: "Wells Fargo",
    },
    amount: 35000,
    date: "Aug 15, 10:30 AM",
    status: "completed",
    automated: true,
    confidence: 94,
  },
];

const automationRules = [
  {
    id: "RULE-001",
    name: "Weekly Operating Capital",
    description: "Transfer funds to operations account when below threshold",
    from: "Main Checking (Chase)",
    to: "Operations (Bank of America)",
    condition: "Balance falls below $50,000",
    amount: "Up to $75,000",
    active: true,
  },
  {
    id: "RULE-002",
    name: "Reserve Account Funding",
    description: "Move excess cash to higher-yield reserve account",
    from: "Main Checking (Chase)",
    to: "Reserve Account (Wells Fargo)",
    condition: "Balance exceeds $200,000 for 3+ days",
    amount: "Excess above $150,000",
    active: true,
  },
  {
    id: "RULE-003",
    name: "Tax Payment Reserve",
    description: "Build up tax reserve for quarterly payments",
    from: "Revenue Account (Chase)",
    to: "Tax Reserve (Wells Fargo)",
    condition: "Monthly based on revenue forecast",
    amount: "22% of monthly revenue",
    active: false,
  },
];

const Transfers = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-8">
        <section>
          <SectionTitle 
            title="Automated Liquidity Transfers" 
            subtitle="AI-powered treasury automation for optimal cash positioning"
          />
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Smart Treasury Management</AlertTitle>
            <AlertDescription>
              Our AI analyzes your cash flow patterns and automatically schedules transfers 
              between accounts to optimize your liquidity position and maximize interest income.
              All automated transfers require your review and approval.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="scheduled" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="automation">Automation Rules</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scheduled" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Upcoming Transfers</h3>
                  <Button className="gap-1">
                    <Plus size={14} />
                    <span>New Transfer</span>
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {scheduledTransfers.map((transfer) => (
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
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
                    <CardDescription className="text-xs">Based on your cash flow forecast</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3 p-3 border rounded-lg hover-scale transition-all">
                        <Lightbulb size={18} className="text-amber-500 shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Recommended Transfer</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            Your operations account will need additional funds by next week based on upcoming expenses.
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs">
                              <strong>$50,000</strong> from Chase to Bank of America
                            </p>
                            <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                              <ArrowRightLeft size={12} />
                              <span>Schedule</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 p-3 border rounded-lg hover-scale transition-all">
                        <Lightbulb size={18} className="text-amber-500 shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Excess Cash Detected</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            Your main checking account has excess cash that could earn higher interest in your reserve account.
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs">
                              <strong>$85,000</strong> from Chase to Wells Fargo
                            </p>
                            <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                              <ArrowRightLeft size={12} />
                              <span>Schedule</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Transfer History</h3>
                  <Button variant="outline" size="sm">
                    Export History
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {completedTransfers.map((transfer) => (
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
                
                <div className="text-center">
                  <Button variant="ghost" size="sm">
                    Load More History
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="automation" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Automation Rules</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Settings size={14} />
                      <span>Settings</span>
                    </Button>
                    <Button className="gap-1">
                      <Plus size={14} />
                      <span>New Rule</span>
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {automationRules.map((rule) => (
                    <Card key={rule.id} className="hover-scale">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-sm font-medium">{rule.name}</CardTitle>
                            <CardDescription className="text-xs">{rule.description}</CardDescription>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Badge variant="outline" className={rule.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}>
                              {rule.active ? "Active" : "Inactive"}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Switch id={`rule-${rule.id}`} checked={rule.active} />
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">From</p>
                            <p className="text-sm font-medium">{rule.from}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">To</p>
                            <p className="text-sm font-medium">{rule.to}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Condition</p>
                            <p className="text-sm">{rule.condition}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="text-sm">{rule.amount}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">AI Suggestions</CardTitle>
                    <CardDescription className="text-xs">Machine learning insights for new automation rules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3 p-3 border rounded-lg hover-scale transition-all">
                        <Lightbulb size={18} className="text-amber-500 shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Payroll Pre-Funding</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            Based on your bi-weekly payroll patterns, we recommend an automated rule to pre-fund your payroll account.
                          </p>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Create Rule
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 p-3 border rounded-lg hover-scale transition-all">
                        <Lightbulb size={18} className="text-amber-500 shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Reactivate Tax Reserve Rule</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            Your tax reserve rule is currently inactive. With quarterly taxes due in 45 days, we recommend reactivating it.
                          </p>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Reactivate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Transfers;
