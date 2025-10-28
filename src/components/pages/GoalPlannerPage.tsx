import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Calculator, Target, Mail, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface GoalData {
  goalName: string;
  targetAmount: number;
  timeHorizon: number;
  expectedReturn: number;
  monthlySIP: number;
}

export default function GoalPlannerPage() {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [calculatedSIP, setCalculatedSIP] = useState<number | null>(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  // Calculate reverse SIP
  const calculateSIP = () => {
    if (!targetAmount || !timeHorizon || !expectedReturn) return;

    const P = parseFloat(targetAmount);
    const r = parseFloat(expectedReturn) / 100 / 12; // Monthly rate
    const n = parseFloat(timeHorizon) * 12; // Total months

    // SIP formula: SIP = P * r / ((1 + r)^n - 1)
    const sip = (P * r) / (Math.pow(1 + r, n) - 1);
    setCalculatedSIP(Math.round(sip));
  };

  const handleCalculate = () => {
    calculateSIP();
  };

  const handleSendEmail = async () => {
    if (!emailAddress || !goalName || !calculatedSIP) return;

    // Simulate email sending
    setTimeout(() => {
      setIsEmailSent(true);
      setTimeout(() => setIsEmailSent(false), 3000);
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-[120rem] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Target className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-heading font-bold text-foreground">Goal Planner</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="/mutual-funds" className="text-foreground hover:text-primary transition-colors">Mutual Funds</a>
              <a href="/investor-resources" className="text-foreground hover:text-primary transition-colors">Resources</a>
              <a href="/contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/20 py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-heading font-bold text-foreground mb-6">
              Plan Your Financial Goals
            </h1>
            <p className="text-xl font-paragraph text-secondary-foreground-alt mb-8">
              Calculate the exact monthly investment needed to achieve your financial dreams. 
              Set your goals, get precise SIP calculations, and stay on track.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-secondary-foreground">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-primary" />
                <span>Reverse SIP Calculator</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Goal Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Email Reports</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Goal Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-6 w-6 text-primary" />
                    <span>Define Your Goal</span>
                  </CardTitle>
                  <CardDescription>
                    Enter your financial goal details to calculate the required monthly investment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="goalName">Goal Name</Label>
                    <Input
                      id="goalName"
                      placeholder="e.g., Child's Education, Dream Home, Retirement"
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                    <Input
                      id="targetAmount"
                      type="number"
                      placeholder="e.g., 5000000"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeHorizon">Time Horizon (Years)</Label>
                    <Input
                      id="timeHorizon"
                      type="number"
                      placeholder="e.g., 15"
                      value={timeHorizon}
                      onChange={(e) => setTimeHorizon(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                    <Input
                      id="expectedReturn"
                      type="number"
                      step="0.1"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(e.target.value)}
                    />
                    <p className="text-sm text-secondary-foreground-alt">
                      Typical equity mutual funds: 10-15% annually
                    </p>
                  </div>

                  <Button 
                    onClick={handleCalculate}
                    className="w-full"
                    disabled={!goalName || !targetAmount || !timeHorizon}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Monthly SIP
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results and Email */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Calculation Results */}
              {calculatedSIP && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      <span>Your Investment Plan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-secondary/50 rounded-lg">
                        <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-secondary-foreground-alt">Monthly SIP Required</p>
                        <p className="text-2xl font-bold text-foreground">
                          {formatCurrency(calculatedSIP)}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-secondary/50 rounded-lg">
                        <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-secondary-foreground-alt">Investment Period</p>
                        <p className="text-2xl font-bold text-foreground">
                          {timeHorizon} Years
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Goal Summary:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-secondary-foreground-alt">Goal:</span>
                          <span className="font-medium text-foreground">{goalName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-foreground-alt">Target Amount:</span>
                          <span className="font-medium text-foreground">
                            {formatCurrency(parseFloat(targetAmount))}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-foreground-alt">Total Investment:</span>
                          <span className="font-medium text-foreground">
                            {formatCurrency(calculatedSIP * parseFloat(timeHorizon) * 12)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-foreground-alt">Expected Returns:</span>
                          <span className="font-medium text-primary">
                            {formatCurrency(parseFloat(targetAmount) - (calculatedSIP * parseFloat(timeHorizon) * 12))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Email Section */}
              {calculatedSIP && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mail className="h-6 w-6 text-primary" />
                      <span>Email Your Plan</span>
                    </CardTitle>
                    <CardDescription>
                      Send this goal plan to your email for future reference
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Add any notes or reminders..."
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <Button 
                      onClick={handleSendEmail}
                      className="w-full"
                      disabled={!emailAddress}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Goal Plan
                    </Button>

                    {isEmailSent && (
                      <Alert>
                        <Mail className="h-4 w-4" />
                        <AlertDescription>
                          Goal plan sent successfully to {emailAddress}!
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-12">
              Goal Planning Tips
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Start Early</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary-foreground-alt">
                    The power of compounding works best when you start investing early. 
                    Even small amounts can grow significantly over time.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Be Realistic</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary-foreground-alt">
                    Set achievable goals and realistic return expectations. 
                    Consider inflation and adjust your targets accordingly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Review Regularly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary-foreground-alt">
                    Review your goals annually and adjust your investments based on 
                    life changes and market conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-heading font-bold mb-4">Goal Planner</h3>
              <p className="text-sm opacity-80">
                Plan your financial future with precision and confidence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/mutual-funds" className="hover:opacity-100">Mutual Funds</a></li>
                <li><a href="/investor-resources" className="hover:opacity-100">Resources</a></li>
                <li><a href="/contact" className="hover:opacity-100">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/goal-planner" className="hover:opacity-100">Goal Planner</a></li>
                <li><a href="/aum-details" className="hover:opacity-100">AUM Details</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm opacity-80">
                Get in touch for personalized investment advice.
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 Investment Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}