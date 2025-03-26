
import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SectionTitle } from "@/components/ui/section-title";
import { ChartCard } from "@/components/dashboard/chart-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, Download, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Sample data
const forecastData = [
  { name: "Jan", actual: 4000, forecast: 4200, low: 3800, high: 4400 },
  { name: "Feb", actual: 3000, forecast: 3200, low: 2800, high: 3400 },
  { name: "Mar", actual: 5000, forecast: 4800, low: 4400, high: 5200 },
  { name: "Apr", actual: 2780, forecast: 3000, low: 2600, high: 3400 },
  { name: "May", actual: 1890, forecast: 2200, low: 1800, high: 2600 },
  { name: "Jun", actual: 2390, forecast: 2500, low: 2100, high: 2900 },
  { name: "Jul", actual: 3490, forecast: 3600, low: 3200, high: 4000 },
  { name: "Aug", actual: 4000, forecast: 4100, low: 3700, high: 4500 },
  { name: "Sep", actual: null, forecast: 3800, low: 3400, high: 4200 },
  { name: "Oct", actual: null, forecast: 4200, low: 3800, high: 4600 },
  { name: "Nov", actual: null, forecast: 3900, low: 3500, high: 4300 },
  { name: "Dec", actual: null, forecast: 4500, low: 4100, high: 4900 },
];

const accountForecastData = [
  { name: "Chase Bank", value: 125000, forecast: 135000 },
  { name: "Bank of America", value: 85000, forecast: 92000 },
  { name: "Wells Fargo", value: 250000, forecast: 230000 },
];

const financialMetrics = [
  { name: "Cash Burn Rate", value: "$2,840/day", trend: { value: 3.2, positive: false } },
  { name: "Runway", value: "162 days", trend: { value: 12, positive: true } },
  { name: "Interest Income", value: "$4,520/mo", trend: { value: 15, positive: true } },
  { name: "Avg. Cash Balance", value: "$460,751", trend: { value: 8.5, positive: true } },
];

const Forecasting = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-8">
        <section>
          <SectionTitle 
            title="AI-Powered Forecasting" 
            subtitle="Predict your future liquidity position with machine learning"
          />
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>AI Model Information</AlertTitle>
            <AlertDescription>
              Forecasts are generated using a machine learning model trained on your historical banking data. 
              The model has a 92.7% accuracy rate over the past 90 days and is updated daily.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="aggregate" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="aggregate">Aggregate View</TabsTrigger>
              <TabsTrigger value="account">By Account</TabsTrigger>
              <TabsTrigger value="metrics">Financial Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="aggregate" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Aggregate Liquidity Forecast</h3>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download size={14} />
                    <span>Export Data</span>
                  </Button>
                </div>
                
                <ChartCard
                  title="Liquidity Forecast (90 Days)"
                  subtitle="Includes confidence intervals and historical data"
                  data={forecastData}
                  height={400}
                  type="area"
                  dataKey="forecast"
                  color="hsl(220, 70%, 55%)"
                  gradientColor="hsl(220, 70%, 95%)"
                />
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
                      <CardDescription className="text-xs">Based on historical predictions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">30-Day Accuracy</span>
                            <span className="text-sm font-medium">95.3%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "95.3%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">90-Day Accuracy</span>
                            <span className="text-sm font-medium">92.7%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "92.7%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">180-Day Accuracy</span>
                            <span className="text-sm font-medium">87.2%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "87.2%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Key Insights</CardTitle>
                      <CardDescription className="text-xs">AI generated observations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex gap-2">
                          <Info size={16} className="shrink-0 text-primary mt-0.5" />
                          <p className="text-sm">Expected 15% increase in overall liquidity by December due to seasonal patterns.</p>
                        </li>
                        <li className="flex gap-2">
                          <Info size={16} className="shrink-0 text-primary mt-0.5" />
                          <p className="text-sm">Potential cash flow gap detected in mid-October. Consider adjusting payment schedules.</p>
                        </li>
                        <li className="flex gap-2">
                          <Info size={16} className="shrink-0 text-primary mt-0.5" />
                          <p className="text-sm">Bank of America account shows declining balance trend. Review operational expenses.</p>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="account" className="animate-fade-in">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {accountForecastData.map((account, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
                        <CardDescription className="text-xs">30-day forecast</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Current Balance</p>
                            <p className="text-xl font-semibold">${account.value.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Forecasted (30 Days)</p>
                            <p className="text-xl font-semibold">${account.forecast.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">
                              {account.forecast > account.value 
                                ? `+${(((account.forecast - account.value) / account.value) * 100).toFixed(1)}%` 
                                : `-${(((account.value - account.forecast) / account.value) * 100).toFixed(1)}%`}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <ChartCard
                  title="Account Balance Forecasts"
                  subtitle="Projected balances for each connected account"
                  data={forecastData}
                  height={400}
                  type="bar"
                  dataKey="forecast"
                  color="hsl(220, 70%, 55%)"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="animate-fade-in">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {financialMetrics.map((metric, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{metric.value}</div>
                        {metric.trend && (
                          <div className="flex items-center text-xs text-muted-foreground mt-1.5">
                            <span
                              className={`mr-1.5 rounded-sm px-1.5 py-0.5 font-medium ${
                                metric.trend.positive
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400"
                              }`}
                            >
                              {metric.trend.positive ? "+" : "-"}
                              {Math.abs(metric.trend.value)}%
                            </span>
                            <p>vs last period</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <ChartCard
                  title="Historical Burn Rate"
                  subtitle="Daily cash outflow over time"
                  data={forecastData}
                  height={300}
                  type="line"
                  dataKey="low"
                  color="hsl(0, 70%, 55%)"
                />
                
                <ChartCard
                  title="Projected Interest Income"
                  subtitle="Based on current rates and forecasted balances"
                  data={forecastData}
                  height={300}
                  type="area"
                  dataKey="high"
                  color="hsl(146, 70%, 55%)"
                  gradientColor="hsl(146, 70%, 95%)"
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Forecasting;
