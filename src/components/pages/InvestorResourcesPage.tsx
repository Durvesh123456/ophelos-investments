import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { InvestorResources } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Calendar, User, BookOpen, Calculator } from 'lucide-react';

// SIP Calculator Component
function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [results, setResults] = useState({
    totalInvestment: 0,
    estimatedReturns: 0,
    totalValue: 0
  });

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = timePeriod * 12;
    const totalInvestment = monthlyInvestment * totalMonths;
    
    // SIP Future Value formula: P * [((1 + r)^n - 1) / r] * (1 + r)
    const futureValue = monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    
    const estimatedReturns = futureValue - totalInvestment;

    setResults({
      totalInvestment,
      estimatedReturns,
      totalValue: futureValue
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary-foreground" />
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
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block font-paragraph text-sm font-medium text-secondary-foreground mb-2">
                  Monthly Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-foreground/60">₹</span>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
                    min="1"
                    max="30"
                    step="0.5"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-foreground/60">%</span>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
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
                    <span className="font-paragraph font-semibold text-green-600">
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
                    <div className="w-full bg-gray-200 rounded-full h-2">
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
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(results.estimatedReturns / results.totalValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="font-paragraph text-sm text-yellow-800">
                  <strong>Note:</strong> This calculator provides estimates based on the inputs provided. 
                  Actual returns may vary depending on market conditions. Mutual fund investments are subject to market risks.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function InvestorResourcesPage() {
  const [resources, setResources] = useState<InvestorResources[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-secondary">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
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
                WealthGrow Capital
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                Home
              </Link>
              <Link to="/mutual-funds" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                Mutual Funds
              </Link>
              <Link to="/investor-resources" className="text-primary font-paragraph font-semibold">
                Investor Resources
              </Link>
              <Link to="/aum-details" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                AUM Details
              </Link>
              <Link to="/contact" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl font-bold text-primary-foreground mb-6">
            Investor Education & Resources
          </h1>
          <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
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
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
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

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
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

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
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
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
                  <Card key={resource._id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                          Read More
                        </Button>
                        {resource.externalUrl && (
                          <Button variant="outline" size="sm" asChild className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
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
      <section className="py-16 bg-white">
        <div className="max-w-[100rem] mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-secondary-foreground mb-12 text-center">
            SIP Calculator
          </h2>
          <SIPCalculator />
        </div>
      </section>

      {/* Investment Tools Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-secondary-foreground mb-12 text-center">
            Other Investment Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg text-center">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold text-secondary-foreground">
                  Goal Planner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-secondary-foreground/80 text-sm mb-4">
                  Plan your investments to achieve specific financial goals.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Plan Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg text-center">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold text-secondary-foreground">
                  Risk Profiler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-secondary-foreground/80 text-sm mb-4">
                  Assess your risk tolerance and investment preferences.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Assess Risk
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg text-center">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold text-secondary-foreground">
                  Tax Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-secondary-foreground/80 text-sm mb-4">
                  Understand tax implications of your mutual fund investments.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="font-paragraph text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Armed with knowledge, take the next step towards building your wealth with our expert guidance and carefully selected mutual funds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg">
              <Link to="/mutual-funds">Explore Our Funds</Link>
            </Button>
            <Button variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg">
              <Link to="/contact">Get Expert Advice</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-foreground text-primary-foreground py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">WealthGrow Capital</h3>
              <p className="font-paragraph text-primary-foreground/80">
                Your trusted partner in mutual fund investments and wealth creation.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 font-paragraph">
                <li><Link to="/mutual-funds" className="text-primary-foreground/80 hover:text-primary-foreground">Mutual Funds</Link></li>
                <li><Link to="/investor-resources" className="text-primary-foreground/80 hover:text-primary-foreground">Investor Resources</Link></li>
                <li><Link to="/aum-details" className="text-primary-foreground/80 hover:text-primary-foreground">AUM Details</Link></li>
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
                <p>ARN: 12345-AMFI-67890</p>
                <p>Email: info@wealthgrowcapital.com</p>
                <p>Phone: +91 98765 43210</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center font-paragraph text-primary-foreground/60">
            <p>&copy; 2024 WealthGrow Capital. All rights reserved. | Mutual Fund investments are subject to market risks.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}