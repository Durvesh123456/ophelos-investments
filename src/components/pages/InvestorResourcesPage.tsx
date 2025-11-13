import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { InvestorResources } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ExternalLink, Calendar, User, BookOpen, Calculator, Minus, Plus, Divide, X } from 'lucide-react';

// SIP Calculator Component
function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [annualStepUp, setAnnualStepUp] = useState<number>(0);
  const [results, setResults] = useState({
    totalInvestment: 0,
    estimatedReturns: 0,
    totalValue: 0
  });
  const [history, setHistory] = useState<Array<{
    monthlyInvestment: number;
    expectedReturn: number;
    timePeriod: number;
    annualStepUp: number;
    totalValue: number;
    timestamp: Date;
  }>>([]);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = timePeriod * 12;
    
    let totalInvestment = 0;
    let futureValue = 0;
    let currentMonthlyInvestment = monthlyInvestment;

    // Calculate with annual step-up and monthly compounding
    for (let year = 0; year < timePeriod; year++) {
      const monthsInThisYear = Math.min(12, totalMonths - (year * 12));
      
      for (let month = 0; month < monthsInThisYear; month++) {
        const monthsRemaining = totalMonths - (year * 12 + month);
        totalInvestment += currentMonthlyInvestment;
        futureValue += currentMonthlyInvestment * Math.pow(1 + monthlyRate, monthsRemaining - 1);
      }
      
      // Apply step-up for next year
      if (year < timePeriod - 1) {
        currentMonthlyInvestment = currentMonthlyInvestment * (1 + annualStepUp / 100);
      }
    }
    
    const estimatedReturns = futureValue - totalInvestment;

    const newResults = {
      totalInvestment,
      estimatedReturns,
      totalValue: futureValue
    };

    setResults(newResults);

    // Add to history (keep last 10)
    const newHistoryEntry = {
      monthlyInvestment,
      expectedReturn,
      timePeriod,
      annualStepUp,
      totalValue: futureValue,
      timestamp: new Date()
    };

    setHistory(prev => {
      const updated = [newHistoryEntry, ...prev.filter(item => 
        !(item.monthlyInvestment === monthlyInvestment && 
          item.expectedReturn === expectedReturn && 
          item.timePeriod === timePeriod &&
          item.annualStepUp === annualStepUp)
      )];
      return updated.slice(0, 10);
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod, annualStepUp]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Calculator - Takes 3 columns */}
        <div className="xl:col-span-3">
          <Card className="bg-black shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-black" />
                </div>
                <div>
                  <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
                    SIP Calculator
                  </CardTitle>
                  <p className="font-paragraph text-secondary-foreground/70">
                    Calculate potential returns from your Systematic Investment Plan
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ... keep existing code (Input Section and Results Section) */}
                {/* Input Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block font-paragraph text-sm font-medium text-secondary-foreground mb-2">
                      Monthly Investment Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80">₹</span>
                      <input
                        type="number"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph text-white"
                        min="500"
                        step="500"
                      />
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="100000"
                      step="500"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="w-full mt-2 accent-primary"
                    />
                    <div className="flex justify-between text-xs text-secondary-foreground/60 mt-1">
                      <span>₹500</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm font-medium text-secondary-foreground mb-2">
                      Expected Annual Return (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph text-white"
                        min="1"
                        max="30"
                        step="0.5"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80">%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.5"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full mt-2 accent-primary"
                    />
                    <div className="flex justify-between text-xs text-secondary-foreground/60 mt-1">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm font-medium text-secondary-foreground mb-2">
                      Investment Period (Years)
                    </label>
                    <input
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph text-white"
                      min="1"
                      max="40"
                    />
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-full mt-2 accent-primary"
                    />
                    <div className="flex justify-between text-xs text-secondary-foreground/60 mt-1">
                      <span>1 Year</span>
                      <span>40 Years</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm font-medium text-secondary-foreground mb-2">
                      Annual Step-up (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={annualStepUp}
                        onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph text-white"
                        min="0"
                        max="20"
                        step="0.5"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80">%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="0.5"
                      value={annualStepUp}
                      onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                      className="w-full mt-2 accent-primary"
                    />
                    <div className="flex justify-between text-xs text-secondary-foreground/60 mt-1">
                      <span>0%</span>
                      <span>20%</span>
                    </div>
                    <p className="text-xs text-secondary-foreground/60 mt-1">
                      Increase investment amount annually by this percentage
                    </p>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                  <div className="bg-secondary p-6 rounded-lg">
                    <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-4">
                      Investment Summary
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-paragraph text-secondary-foreground/70">Total Investment:</span>
                        <span className="font-paragraph font-semibold text-secondary-foreground">
                          {formatCurrency(results.totalInvestment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-paragraph text-secondary-foreground/70">Estimated Returns:</span>
                        <span className="font-paragraph font-semibold text-white">
                          {formatCurrency(results.estimatedReturns)}
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-paragraph font-semibold text-secondary-foreground">Total Value:</span>
                          <span className="font-heading text-xl font-bold text-primary">
                            {formatCurrency(results.totalValue)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Representation */}
                  <div className="bg-secondary p-6 rounded-lg">
                    <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-4">
                      Investment Breakdown
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-paragraph text-secondary-foreground/70">Principal Amount</span>
                          <span className="font-paragraph text-secondary-foreground">
                            {((results.totalInvestment / results.totalValue) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-black rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(results.totalInvestment / results.totalValue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-paragraph text-secondary-foreground/70">Returns</span>
                          <span className="font-paragraph text-secondary-foreground">
                            {((results.estimatedReturns / results.totalValue) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-black rounded-full h-2">
                          <div 
                            className="bg-white h-2 rounded-full" 
                            style={{ width: `${(results.estimatedReturns / results.totalValue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black border border-white p-4 rounded-lg">
                    <p className="font-paragraph text-sm text-white">
                      <strong>Note:</strong> This calculator provides estimates based on the inputs provided. 
                      Actual returns may vary depending on market conditions. Mutual fund investments are subject to market risks.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Sidebar - Takes 1 column */}
        <div className="xl:col-span-1">
          <Card className="bg-black shadow-lg border border-white/20 h-fit">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-bold text-secondary-foreground">
                Calculation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="font-paragraph text-sm text-secondary-foreground/60 text-center py-4">
                    No calculations yet
                  </p>
                ) : (
                  history.map((entry, index) => (
                    <div key={index} className="bg-secondary p-3 rounded-lg border border-white/10">
                      <div className="text-xs text-secondary-foreground/60 mb-2">
                        {entry.timestamp.toLocaleTimeString()}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="font-paragraph text-secondary-foreground/80">
                          ₹{entry.monthlyInvestment.toLocaleString()} × {entry.timePeriod}y @ {entry.expectedReturn}%
                          {entry.annualStepUp > 0 && ` (+${entry.annualStepUp}% step-up)`}
                        </div>
                        <div className="font-paragraph font-semibold text-primary">
                          = {formatCurrency(entry.totalValue)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// SWP Calculator Component
function SWPCalculator() {
  const [totalInvestment, setTotalInvestment] = useState<number>(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(8000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(20);
  const [annualStepUp, setAnnualStepUp] = useState<number>(0);
  const [results, setResults] = useState({
    totalWithdrawals: 0,
    remainingAmount: 0,
    monthsLasted: 0
  });
  const [history, setHistory] = useState<Array<{
    totalInvestment: number;
    monthlyWithdrawal: number;
    expectedReturn: number;
    timePeriod: number;
    annualStepUp: number;
    monthsLasted: number;
    timestamp: Date;
  }>>([]);

  const calculateSWP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    let balance = totalInvestment;
    let months = 0;
    let totalWithdrawn = 0;
    let currentWithdrawal = monthlyWithdrawal;
    const maxMonths = timePeriod * 12;

    while (balance > currentWithdrawal && months < maxMonths) {
      balance = balance * (1 + monthlyRate) - currentWithdrawal;
      totalWithdrawn += currentWithdrawal;
      months++;

      // Apply annual step-up every 12 months
      if (months % 12 === 0 && annualStepUp > 0) {
        currentWithdrawal = currentWithdrawal * (1 + annualStepUp / 100);
      }
    }

    const newResults = {
      totalWithdrawals: totalWithdrawn,
      remainingAmount: Math.max(0, balance),
      monthsLasted: months
    };

    setResults(newResults);

    // Add to history (keep last 10)
    const newHistoryEntry = {
      totalInvestment,
      monthlyWithdrawal,
      expectedReturn,
      timePeriod,
      annualStepUp,
      monthsLasted: months,
      timestamp: new Date()
    };

    setHistory(prev => {
      const updated = [newHistoryEntry, ...prev.filter(item => 
        !(item.totalInvestment === totalInvestment && 
          item.monthlyWithdrawal === monthlyWithdrawal && 
          item.expectedReturn === expectedReturn &&
          item.timePeriod === timePeriod &&
          item.annualStepUp === annualStepUp)
      )];
      return updated.slice(0, 10);
    });
  };

  useEffect(() => {
    calculateSWP();
  }, [totalInvestment, monthlyWithdrawal, expectedReturn, timePeriod, annualStepUp]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Calculator - Takes 3 columns */}
        <div className="xl:col-span-3">
          <Card className="bg-black shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-black" />
                </div>
                <div>
                  <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
                    SWP Calculator
                  </CardTitle>
                  <p className="font-paragraph text-secondary-foreground/70">
                    Calculate how long your investment will last with Systematic Withdrawal Plan
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ... keep existing code (Input Section and Results Section) */}
                {/* Input Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block font-paragraph text-sm font-medium text-secondary-foreground mb-2">
                      Total Investment Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80">₹</span>
                      <input
                        type="number"
                        value={totalInvestment}
                        onChange={(e) => setTotalInvestment(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph text-white"
                        min="100000"
                        step="50000"
                      />
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="10000000"
                      step="50000"
                      value={totalInvestment}
                      onChange={(e) => setTotalInvestment(Number(e.target.value))}
                      className="w-full mt-2 accent-primary"
                    />
                    <div className="flex justify-between text-xs text-secondary-foreground/60 mt-1">
                      <span>₹1,00,000</span>
                      <span>₹1,00,00,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm font-medium text-secondary-foreground mb-2">
                      Monthly Withdrawal Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80">₹</span>
                      <input
                        type="number"
                        value={monthlyWithdrawal}
                        onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph text-white"
                        min="1000"
                        step="1000"
                      />
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={monthlyWithdrawal}
                      onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
                      className="w-full mt-2 accent-primary"
                    />
                    <div className="flex justify-between text-xs text-secondary-foreground/60 mt-1">
                      <span>₹1,000</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm font-medium text-secondary-foreground mb-2">
                      Expected Annual Return (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph text-white"
                        min="1"
                        max="30"
                        step="0.5"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80">%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.5"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full mt-2 accent-primary"
                    />
                    <div className="flex justify-between text-xs text-secondary-foreground/60 mt-1">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm font-medium text-secondary-foreground mb-2">
                      Withdrawal Period (Years)
                    </label>
                    <input
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph text-white"
                      min="1"
                      max="50"
                    />
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-full mt-2 accent-primary"
                    />
                    <div className="flex justify-between text-xs text-secondary-foreground/60 mt-1">
                      <span>1 Year</span>
                      <span>50 Years</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm font-medium text-secondary-foreground mb-2">
                      Annual Step-up (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={annualStepUp}
                        onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph text-white"
                        min="0"
                        max="20"
                        step="0.5"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80">%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="0.5"
                      value={annualStepUp}
                      onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                      className="w-full mt-2 accent-primary"
                    />
                    <div className="flex justify-between text-xs text-secondary-foreground/60 mt-1">
                      <span>0%</span>
                      <span>20%</span>
                    </div>
                    <p className="text-xs text-secondary-foreground/60 mt-1">
                      Increase withdrawal amount annually by this percentage
                    </p>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                  <div className="bg-secondary p-6 rounded-lg">
                    <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-4">
                      Withdrawal Summary
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-paragraph text-secondary-foreground/70">Duration:</span>
                        <span className="font-paragraph font-semibold text-secondary-foreground">
                          {Math.floor(results.monthsLasted / 12)} years {results.monthsLasted % 12} months
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-paragraph text-secondary-foreground/70">Total Withdrawals:</span>
                        <span className="font-paragraph font-semibold text-white">
                          {formatCurrency(results.totalWithdrawals)}
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-paragraph font-semibold text-secondary-foreground">Remaining Amount:</span>
                          <span className="font-heading text-xl font-bold text-primary">
                            {formatCurrency(results.remainingAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black border border-white p-4 rounded-lg">
                    <p className="font-paragraph text-sm text-white">
                      <strong>Note:</strong> This calculator assumes a constant withdrawal amount and return rate. 
                      Actual performance may vary based on market conditions. Consider inflation impact on withdrawal needs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Sidebar - Takes 1 column */}
        <div className="xl:col-span-1">
          <Card className="bg-black shadow-lg border border-white/20 h-fit">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-bold text-secondary-foreground">
                Calculation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="font-paragraph text-sm text-secondary-foreground/60 text-center py-4">
                    No calculations yet
                  </p>
                ) : (
                  history.map((entry, index) => (
                    <div key={index} className="bg-secondary p-3 rounded-lg border border-white/10">
                      <div className="text-xs text-secondary-foreground/60 mb-2">
                        {entry.timestamp.toLocaleTimeString()}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="font-paragraph text-secondary-foreground/80">
                          ₹{entry.totalInvestment.toLocaleString()} → ₹{entry.monthlyWithdrawal.toLocaleString()}/mo @ {entry.expectedReturn}%
                          {entry.timePeriod && ` (${entry.timePeriod}y)`}
                          {entry.annualStepUp > 0 && ` (+${entry.annualStepUp}% step-up)`}
                        </div>
                        <div className="font-paragraph font-semibold text-primary">
                          = {Math.floor(entry.monthsLasted / 12)}y {entry.monthsLasted % 12}m
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Normal Calculator Component
function NormalCalculator() {
  const [display, setDisplay] = useState<string>('0');
  const [formula, setFormula] = useState<string>('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [history, setHistory] = useState<Array<{
    formula: string;
    result: string;
    timestamp: Date;
  }>>([]);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setFormula(prev => prev + num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
      setFormula(prev => prev === '' ? num : prev + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setFormula(prev => prev + '0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
      setFormula(prev => prev + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFormula('');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
    
    const operatorSymbol = nextOperation === '*' ? '×' : nextOperation === '/' ? '÷' : nextOperation;
    setFormula(prev => prev + ' ' + operatorSymbol + ' ');
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      const finalFormula = formula + ' = ' + newValue;
      
      setDisplay(String(newValue));
      
      // Add to history (keep last 10)
      const newHistoryEntry = {
        formula: finalFormula,
        result: String(newValue),
        timestamp: new Date()
      };

      setHistory(prev => {
        const updated = [newHistoryEntry, ...prev];
        return updated.slice(0, 10);
      });

      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
      setFormula('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="bg-black shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-black" />
                </div>
                <div>
                  <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
                    Normal Calculator
                  </CardTitle>
                  <p className="font-paragraph text-secondary-foreground/70">
                    Basic arithmetic calculator for everyday calculations
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Formula Display */}
                <div className="bg-dark-700 p-3 rounded-lg">
                  <div className="text-right text-sm font-mono text-gray-400 min-h-[20px]">
                    {formula || 'Enter calculation...'}
                  </div>
                </div>

                {/* Result Display */}
                <div className="bg-dark-700 p-4 rounded-lg">
                  <div className="text-right text-2xl font-mono text-white overflow-hidden">
                    {display}
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-4 gap-3">
                  <Button
                    onClick={clear}
                    className="bg-red-600 hover:bg-red-700 text-white col-span-2"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={() => performOperation('/')}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    <Divide className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => performOperation('*')}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <Button
                    onClick={() => inputNumber('7')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    7
                  </Button>
                  <Button
                    onClick={() => inputNumber('8')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    8
                  </Button>
                  <Button
                    onClick={() => inputNumber('9')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    9
                  </Button>
                  <Button
                    onClick={() => performOperation('-')}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>

                  <Button
                    onClick={() => inputNumber('4')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    4
                  </Button>
                  <Button
                    onClick={() => inputNumber('5')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    5
                  </Button>
                  <Button
                    onClick={() => inputNumber('6')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    6
                  </Button>
                  <Button
                    onClick={() => performOperation('+')}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>

                  <Button
                    onClick={() => inputNumber('1')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    1
                  </Button>
                  <Button
                    onClick={() => inputNumber('2')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    2
                  </Button>
                  <Button
                    onClick={() => inputNumber('3')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    3
                  </Button>
                  <Button
                    onClick={handleEquals}
                    className="bg-primary hover:bg-primary/90 text-black row-span-2"
                  >
                    =
                  </Button>

                  <Button
                    onClick={() => inputNumber('0')}
                    className="bg-dark-700 hover:bg-dark-600 text-white col-span-2"
                  >
                    0
                  </Button>
                  <Button
                    onClick={inputDecimal}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    .
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Sidebar - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card className="bg-black shadow-lg border border-white/20 h-fit">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-bold text-secondary-foreground">
                Calculation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="font-paragraph text-sm text-secondary-foreground/60 text-center py-4">
                    No calculations yet
                  </p>
                ) : (
                  history.map((entry, index) => (
                    <div key={index} className="bg-secondary p-3 rounded-lg border border-white/10">
                      <div className="text-xs text-secondary-foreground/60 mb-2">
                        {entry.timestamp.toLocaleTimeString()}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="font-paragraph font-mono text-secondary-foreground/80 break-all">
                          {entry.formula}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// BA II Plus Calculator Component
function BAIIPlusCalculator() {
  const [display, setDisplay] = useState<string>('0');
  const [memory, setMemory] = useState<{ [key: string]: number }>({
    N: 0,
    I: 0,
    PV: 0,
    PMT: 0,
    FV: 0
  });
  const [currentVariable, setCurrentVariable] = useState<string>('');
  const [history, setHistory] = useState<Array<{
    operation: string;
    variables: { [key: string]: number };
    result: string;
    timestamp: Date;
  }>>([]);

  const inputNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const inputDecimal = () => {
    if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
  };

  const clearAll = () => {
    setDisplay('0');
    setMemory({ N: 0, I: 0, PV: 0, PMT: 0, FV: 0 });
    setCurrentVariable('');
  };

  const storeValue = (variable: string) => {
    const value = parseFloat(display);
    setMemory(prev => ({ ...prev, [variable]: value }));
    setCurrentVariable(variable);
    setDisplay('0');
  };

  const recallValue = (variable: string) => {
    setDisplay(String(memory[variable]));
    setCurrentVariable(variable);
  };

  const computeTVM = (solve: string) => {
    const { N, I, PV, PMT, FV } = memory;
    const monthlyRate = I / 100 / 12;

    try {
      let result = 0;

      switch (solve) {
        case 'N':
          if (PMT !== 0) {
            result = Math.log(1 + (FV * monthlyRate) / PMT) / Math.log(1 + monthlyRate);
          }
          break;
        case 'I':
          // Simplified calculation - in reality this requires iterative methods
          if (N !== 0 && PV !== 0) {
            result = (Math.pow(FV / PV, 1 / N) - 1) * 12 * 100;
          }
          break;
        case 'PV':
          if (monthlyRate !== 0) {
            result = (PMT * (1 - Math.pow(1 + monthlyRate, -N)) / monthlyRate) + (FV / Math.pow(1 + monthlyRate, N));
          }
          break;
        case 'PMT':
          if (monthlyRate !== 0) {
            result = (PV * monthlyRate * Math.pow(1 + monthlyRate, N)) / (Math.pow(1 + monthlyRate, N) - 1);
          }
          break;
        case 'FV':
          result = PV * Math.pow(1 + monthlyRate, N) + PMT * ((Math.pow(1 + monthlyRate, N) - 1) / monthlyRate);
          break;
      }

      setDisplay(result.toFixed(2));
      setMemory(prev => ({ ...prev, [solve]: result }));

      // Add to history (keep last 10)
      const newHistoryEntry = {
        operation: `Computed ${solve}`,
        variables: { ...memory, [solve]: result },
        result: result.toFixed(2),
        timestamp: new Date()
      };

      setHistory(prev => {
        const updated = [newHistoryEntry, ...prev];
        return updated.slice(0, 10);
      });
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="bg-black shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-black" />
                </div>
                <div>
                  <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
                    BA II Plus Calculator
                  </CardTitle>
                  <p className="font-paragraph text-secondary-foreground/70">
                    Texas Instruments BA II Plus Financial Calculator
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Display */}
                <div className="bg-dark-700 p-4 rounded-lg">
                  <div className="text-right text-xl font-mono text-white">
                    {display}
                  </div>
                  {currentVariable && (
                    <div className="text-right text-sm text-gray-400">
                      {currentVariable}
                    </div>
                  )}
                </div>

                {/* Memory Display */}
                <div className="grid grid-cols-5 gap-2 text-xs">
                  {Object.entries(memory).map(([key, value]) => (
                    <div key={key} className="bg-dark-700 p-2 rounded text-center text-white">
                      <div className="font-semibold">{key}</div>
                      <div className="text-gray-400">{value.toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                {/* TVM Buttons */}
                <div className="grid grid-cols-5 gap-2">
                  <Button
                    onClick={() => storeValue('N')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    N
                  </Button>
                  <Button
                    onClick={() => storeValue('I')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    I/Y
                  </Button>
                  <Button
                    onClick={() => storeValue('PV')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    PV
                  </Button>
                  <Button
                    onClick={() => storeValue('PMT')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    PMT
                  </Button>
                  <Button
                    onClick={() => storeValue('FV')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    FV
                  </Button>
                </div>

                {/* Compute Buttons */}
                <div className="grid grid-cols-5 gap-2">
                  <Button
                    onClick={() => computeTVM('N')}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  >
                    CPT N
                  </Button>
                  <Button
                    onClick={() => computeTVM('I')}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  >
                    CPT I/Y
                  </Button>
                  <Button
                    onClick={() => computeTVM('PV')}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  >
                    CPT PV
                  </Button>
                  <Button
                    onClick={() => computeTVM('PMT')}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  >
                    CPT PMT
                  </Button>
                  <Button
                    onClick={() => computeTVM('FV')}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  >
                    CPT FV
                  </Button>
                </div>

                {/* Number Pad */}
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    onClick={clearAll}
                    className="bg-red-600 hover:bg-red-700 text-white col-span-2"
                  >
                    CLR TVM
                  </Button>
                  <Button
                    onClick={clear}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    CE
                  </Button>
                  <Button
                    onClick={() => inputNumber('+')}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    +/-
                  </Button>

                  <Button
                    onClick={() => inputNumber('7')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    7
                  </Button>
                  <Button
                    onClick={() => inputNumber('8')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    8
                  </Button>
                  <Button
                    onClick={() => inputNumber('9')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    9
                  </Button>
                  <Button
                    onClick={() => inputNumber('/')}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    ÷
                  </Button>

                  <Button
                    onClick={() => inputNumber('4')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    4
                  </Button>
                  <Button
                    onClick={() => inputNumber('5')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    5
                  </Button>
                  <Button
                    onClick={() => inputNumber('6')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    6
                  </Button>
                  <Button
                    onClick={() => inputNumber('*')}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    ×
                  </Button>

                  <Button
                    onClick={() => inputNumber('1')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    1
                  </Button>
                  <Button
                    onClick={() => inputNumber('2')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    2
                  </Button>
                  <Button
                    onClick={() => inputNumber('3')}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    3
                  </Button>
                  <Button
                    onClick={() => inputNumber('-')}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    -
                  </Button>

                  <Button
                    onClick={() => inputNumber('0')}
                    className="bg-dark-700 hover:bg-dark-600 text-white col-span-2"
                  >
                    0
                  </Button>
                  <Button
                    onClick={inputDecimal}
                    className="bg-dark-700 hover:bg-dark-600 text-white"
                  >
                    .
                  </Button>
                  <Button
                    onClick={() => inputNumber('+')}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    +
                  </Button>
                </div>

                <div className="bg-black border border-white p-4 rounded-lg">
                  <p className="font-paragraph text-sm text-white">
                    <strong>TVM Variables:</strong> N = Number of periods, I/Y = Interest rate per year, 
                    PV = Present Value, PMT = Payment, FV = Future Value
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Sidebar - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card className="bg-black shadow-lg border border-white/20 h-fit">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-bold text-secondary-foreground">
                Calculation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="font-paragraph text-sm text-secondary-foreground/60 text-center py-4">
                    No calculations yet
                  </p>
                ) : (
                  history.map((entry, index) => (
                    <div key={index} className="bg-secondary p-3 rounded-lg border border-white/10">
                      <div className="text-xs text-secondary-foreground/60 mb-2">
                        {entry.timestamp.toLocaleTimeString()}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="font-paragraph font-semibold text-primary">
                          {entry.operation}
                        </div>
                        <div className="font-paragraph text-secondary-foreground/80">
                          Result: {entry.result}
                        </div>
                        <div className="text-xs text-secondary-foreground/60">
                          N:{entry.variables.N.toFixed(1)} I:{entry.variables.I.toFixed(1)}% PV:{entry.variables.PV.toFixed(0)} PMT:{entry.variables.PMT.toFixed(0)} FV:{entry.variables.FV.toFixed(0)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function InvestorResourcesPage() {
  const [resources, setResources] = useState<InvestorResources[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCalculator, setSelectedCalculator] = useState<string>('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { items } = await BaseCrudService.getAll<InvestorResources>('investorresources');
        setResources(items);
      } catch (error) {
        console.error('Error fetching investor resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case 'sip':
        return <SIPCalculator />;
      case 'swp':
        return <SWPCalculator />;
      case 'normal':
        return <NormalCalculator />;
      case 'ba2plus':
        return <BAIIPlusCalculator />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-paragraph text-secondary-foreground">Loading investor resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="bg-secondary/90 backdrop-blur-sm shadow-soft-glow border-b border-neon-cyan/20">
        <div className="max-w-[100rem] mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-secondary-foreground">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="text-primary font-heading text-2xl font-bold">
                Ophelos Investments
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                Home
              </Link>
              <Link to="/funds" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                Funds
              </Link>
              <Link to="/investor-resources" className="text-primary font-paragraph font-semibold">
                Investor
              </Link>
              <Link to="/aum-details" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                AUM
              </Link>
              <Link to="/contact" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-black py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/7afb6a_e698a40e647f4beca073d8a7a92a2875~mv2.png?originWidth=1600&originHeight=576"
            alt="London cityscape with impressive skyscrapers and modern buildings"
            className="w-full h-full object-cover opacity-40"
            width={1600}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-[100rem] mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl font-bold text-white mb-6">
            Investor Education & Resources
          </h1>
          <p className="font-paragraph text-xl text-white/90 max-w-3xl mx-auto">
            Empower your investment decisions with our comprehensive collection of educational resources, market insights, and financial planning guides.
          </p>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-secondary-foreground mb-6 text-center">
              Essential Investment Knowledge
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-black shadow-lg border border-white/20">
                <CardHeader>
                  <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-black" />
                  </div>
                  <CardTitle className="font-heading text-xl font-bold text-secondary-foreground">
                    Mutual Fund Basics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-secondary-foreground/80 mb-4">
                    Learn the fundamentals of mutual fund investing, including types of funds, NAV, expense ratios, and how to read fund fact sheets.
                  </p>
                  <ul className="font-paragraph text-sm text-secondary-foreground/70 space-y-2">
                    <li>• Understanding SIP vs Lump Sum</li>
                    <li>• Risk and Return Analysis</li>
                    <li>• Tax Implications</li>
                    <li>• Exit Load and Lock-in Periods</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black shadow-lg border border-white/20">
                <CardHeader>
                  <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-black" />
                  </div>
                  <CardTitle className="font-heading text-xl font-bold text-secondary-foreground">
                    Portfolio Diversification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-secondary-foreground/80 mb-4">
                    Discover how to build a well-diversified portfolio across asset classes, sectors, and market capitalizations.
                  </p>
                  <ul className="font-paragraph text-sm text-secondary-foreground/70 space-y-2">
                    <li>• Asset Allocation Strategies</li>
                    <li>• Equity vs Debt Balance</li>
                    <li>• International Diversification</li>
                    <li>• Rebalancing Techniques</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black shadow-lg border border-white/20">
                <CardHeader>
                  <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-black" />
                  </div>
                  <CardTitle className="font-heading text-xl font-bold text-secondary-foreground">
                    Financial Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-secondary-foreground/80 mb-4">
                    Master the art of goal-based investing and create comprehensive financial plans for your future needs.
                  </p>
                  <ul className="font-paragraph text-sm text-secondary-foreground/70 space-y-2">
                    <li>• Retirement Planning</li>
                    <li>• Child's Education Fund</li>
                    <li>• Emergency Fund Creation</li>
                    <li>• Wealth Accumulation Goals</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Resources Articles */}
          {resources.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-4">
                Resources Coming Soon
              </h3>
              <p className="font-paragraph text-secondary-foreground/70 mb-8">
                We're preparing comprehensive educational content for our investors. Please check back soon or contact us for personalized guidance.
              </p>
              <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white">
                <Link to="/contact">Contact Our Advisors</Link>
              </Button>
            </div>
          ) : (
            <>
              <h2 className="font-heading text-3xl font-bold text-secondary-foreground mb-8">
                Latest Articles & Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource) => (
                  <Card key={resource._id} className="bg-black shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
                    {resource.mainImage && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <Image
                          src={resource.mainImage}
                          alt={resource.title || 'Article image'}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          width={400}
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="font-heading text-xl font-bold text-secondary-foreground line-clamp-2">
                        {resource.title || 'Article Title'}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-secondary-foreground/60">
                        {resource.author && (
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span className="font-paragraph">{resource.author}</span>
                          </div>
                        )}
                        {resource.publicationDate && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span className="font-paragraph">{formatDate(resource.publicationDate)}</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed line-clamp-3">
                        {resource.summary || resource.content || 'Article summary not available.'}
                      </p>
                      
                      <div className="flex space-x-3 pt-4">
                        <Button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white">
                          Read More
                        </Button>
                        {resource.externalUrl && (
                          <Button variant="outline" size="sm" asChild className="border-white/40 text-white hover:bg-white/10 hover:text-white">
                            <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* SIP Calculator Section */}
      <section className="py-16 bg-black">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-secondary-foreground mb-6">
              Financial Calculators
            </h2>
            <div className="max-w-md mx-auto">
              <Select value={selectedCalculator} onValueChange={setSelectedCalculator}>
                <SelectTrigger className="w-full bg-dark-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select a Calculator" />
                </SelectTrigger>
                <SelectContent className="bg-dark-700 border-gray-600">
                  <SelectItem value="sip" className="text-white hover:bg-dark-600">
                    SIP Calculator
                  </SelectItem>
                  <SelectItem value="swp" className="text-white hover:bg-dark-600">
                    SWP Calculator
                  </SelectItem>
                  <SelectItem value="normal" className="text-white hover:bg-dark-600">
                    Normal Calculator
                  </SelectItem>
                  <SelectItem value="ba2plus" className="text-white hover:bg-dark-600">
                    BA II Plus Calculator (Texas Instruments)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {selectedCalculator && (
            <div className="mt-8">
              {renderCalculator()}
            </div>
          )}
          
          {!selectedCalculator && (
            <div className="text-center py-16">
              <Calculator className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-4">
                Choose Your Calculator
              </h3>
              <p className="font-paragraph text-secondary-foreground/70 mb-8 max-w-2xl mx-auto">
                Select from our comprehensive suite of financial calculators to help you make informed investment decisions. 
                From SIP planning to advanced financial calculations, we have the tools you need.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Investment Tools Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-secondary-foreground mb-12 text-center">
            Other Investment Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black shadow-lg border border-white/20 text-center">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold text-secondary-foreground">
                  Goal Planner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-secondary-foreground/80 text-sm mb-4">
                  Plan your investments to achieve specific financial goals.
                </p>
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                  Plan Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black shadow-lg border border-white/20 text-center">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold text-secondary-foreground">
                  Risk Profiler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-secondary-foreground/80 text-sm mb-4">
                  Assess your risk tolerance and investment preferences.
                </p>
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                  Assess Risk
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black shadow-lg border border-white/20 text-center">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold text-secondary-foreground">
                  Tax Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-secondary-foreground/80 text-sm mb-4">
                  Understand tax implications of your mutual fund investments.
                </p>
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="font-paragraph text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Armed with knowledge, take the next step towards building your wealth with our expert guidance and carefully selected mutual funds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg">
              <Link to="/contact">Explore Our Funds</Link>
            </Button>
            <Button variant="outline" asChild className="border-white/40 text-white hover:bg-white/10 hover:text-white px-8 py-3 text-lg">
              <Link to="/contact">Get Expert Advice</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-600 text-primary-foreground py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">Ophelos Investments</h3>
              <p className="font-paragraph text-primary-foreground/80">
                Your trusted partner in mutual fund investments and wealth creation.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 font-paragraph">
                <li><Link to="/mutual-funds" className="text-primary-foreground/80 hover:text-primary-foreground">Mutual Funds</Link></li>
                <li><Link to="/investor-resources" className="text-primary-foreground/80 hover:text-primary-foreground">Investor Resources</Link></li>
                <li><Link to="/aum-details" className="text-primary-foreground/80 hover:text-primary-foreground">AUM</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 font-paragraph">
                <li className="text-primary-foreground/80">Portfolio Management</li>
                <li className="text-primary-foreground/80">Investment Advisory</li>
                <li className="text-primary-foreground/80">Financial Planning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 font-paragraph text-primary-foreground/80">
                <p>ARN-285360</p>
                <p>Email: ophelosinvestments@gmail.com</p>
                <p>Phone: +91 7620408920</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center font-paragraph text-primary-foreground/60">
            <p>&copy; 2024 Ophelos Investments. All rights reserved. | Mutual Fund investments are subject to market risks.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}