import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building, TrendingUp, Shield, Target, Calendar, DollarSign, User, ExternalLink } from 'lucide-react';

export default function SIFPage() {
  const sifFunds = [
    {
      id: 1,
      fundName: "SBI Magnum SIF - Technology Sector",
      amc: "SBI Mutual Fund",
      fundType: "Sector Specific",
      riskLevel: "High",
      minimumInvestment: 1000000, // 10 Lakhs
      fundManager: "Dinesh Ahuja",
      inceptionDate: "2024-01-15",
      nav: 12.45,
      aum: "₹850 Crores",
      expenseRatio: 1.85,
      exitLoad: "1% if redeemed within 1 year",
      description: "A specialized fund focusing on technology companies with high growth potential in the Indian market.",
      keyFeatures: [
        "Technology sector focus",
        "Growth-oriented strategy",
        "Professional management",
        "Diversified tech portfolio"
      ],
      performance: {
        "1Y": 18.5,
        "3Y": 22.3,
        "5Y": 19.8
      }
    },
    {
      id: 2,
      fundName: "HDFC Infrastructure SIF",
      amc: "HDFC Asset Management",
      fundType: "Infrastructure Focused",
      riskLevel: "High",
      minimumInvestment: 2500000, // 25 Lakhs
      fundManager: "Prashant Jain",
      inceptionDate: "2024-03-20",
      nav: 10.78,
      aum: "₹1,200 Crores",
      expenseRatio: 2.10,
      exitLoad: "2% if redeemed within 2 years",
      description: "A newly launched specialized fund targeting infrastructure development and related opportunities in India.",
      keyFeatures: [
        "Infrastructure development focus",
        "Long-term value creation",
        "ESG compliant investments",
        "Strategic sector allocation"
      ],
      performance: {
        "1Y": 15.2,
        "3Y": "N/A",
        "5Y": "N/A"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-20 pointer-events-none"></div>
      
      {/* Animated Scan Line */}
      <div className="fixed top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50 animate-cyber-scan pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-20 p-6 backdrop-blur-sm bg-dark-900/30 border-b border-white/10">
        <div className="max-w-[100rem] mx-auto flex justify-between items-center">
          <div className="text-white font-heading text-2xl font-bold">
            Ophelos Investments
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-foreground hover:text-white transition-all duration-300 font-paragraph relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/funds" className="text-white font-paragraph relative group">
              Funds
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
            </Link>
            <Link to="/investor-resources" className="text-foreground hover:text-white transition-all duration-300 font-paragraph relative group">
              Investor
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/aum-details" className="text-foreground hover:text-white transition-all duration-300 font-paragraph relative group">
              AUM
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="text-foreground hover:text-white transition-all duration-300 font-paragraph relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="relative py-20 px-6">
        <div className="max-w-[100rem] mx-auto">
          <Link 
            to="/funds" 
            className="inline-flex items-center text-foreground hover:text-white transition-colors mb-8 font-paragraph"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Funds
          </Link>
          
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-white/10 rounded-2xl">
                <Building className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl font-heading font-bold text-white mb-6 animate-pulse-neon">
              Specialized Investment Funds
            </h1>
            
            <p className="text-xl text-foreground max-w-3xl mx-auto font-paragraph leading-relaxed mb-12">
              Specialized Investment Funds designed for sophisticated investors seeking targeted investment strategies in specific sectors or themes.
            </p>
            
            {/* SIF Funds Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {sifFunds.map((fund) => (
                <Card key={fund.id} className="bg-dark-800/50 border-white/20 backdrop-blur-sm hover:bg-dark-700/50 transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-white font-heading text-xl group-hover:text-neon-cyan transition-colors">
                        {fund.fundName}
                      </CardTitle>
                      <Badge variant="outline" className="border-white/30 text-white">
                        {fund.fundType}
                      </Badge>
                    </div>
                    <CardDescription className="text-foreground font-paragraph">
                      {fund.amc}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-foreground font-paragraph leading-relaxed">
                      {fund.description}
                    </p>
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <DollarSign className="w-4 h-4 mr-2 text-white" />
                          <span className="text-foreground font-paragraph">NAV: ₹{fund.nav}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <TrendingUp className="w-4 h-4 mr-2 text-white" />
                          <span className="text-foreground font-paragraph">AUM: {fund.aum}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Shield className="w-4 h-4 mr-2 text-white" />
                          <span className="text-foreground font-paragraph">Risk: {fund.riskLevel}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <User className="w-4 h-4 mr-2 text-white" />
                          <span className="text-foreground font-paragraph">{fund.fundManager}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-white" />
                          <span className="text-foreground font-paragraph">Since {new Date(fund.inceptionDate).getFullYear()}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Target className="w-4 h-4 mr-2 text-white" />
                          <span className="text-foreground font-paragraph">Min: ₹{(fund.minimumInvestment / 100000).toFixed(0)}L</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Performance */}
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-white font-heading font-semibold mb-3">Returns (Annualized %)</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-white font-bold text-lg">{fund.performance["1Y"]}%</div>
                          <div className="text-foreground text-sm font-paragraph">1 Year</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold text-lg">{fund.performance["3Y"]}</div>
                          <div className="text-foreground text-sm font-paragraph">3 Years</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold text-lg">{fund.performance["5Y"]}</div>
                          <div className="text-foreground text-sm font-paragraph">5 Years</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Key Features */}
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-white font-heading font-semibold mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {fund.keyFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                            <span className="text-foreground font-paragraph">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Fund Details */}
                    <div className="border-t border-white/10 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground font-paragraph">Expense Ratio:</span>
                        <span className="text-white">{fund.expenseRatio}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground font-paragraph">Exit Load:</span>
                        <span className="text-white">{fund.exitLoad}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button className="w-full bg-white text-black hover:bg-foreground hover:text-dark-900 transition-all duration-300 font-paragraph font-semibold">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Fact Sheet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Investment Information */}
            <div className="bg-dark-800/30 border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-heading font-bold text-white mb-6 text-center">
                Important Information
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-heading font-semibold mb-4">Investment Considerations</h4>
                  <ul className="space-y-2 text-foreground font-paragraph">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                      High minimum investment requirements
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                      Sector-specific concentration risk
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                      Professional fund management
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                      Long-term investment horizon recommended
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-heading font-semibold mb-4">Risk Factors</h4>
                  <ul className="space-y-2 text-foreground font-paragraph">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                      Market volatility and sector concentration
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                      Liquidity constraints due to specialized nature
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                      Regulatory and policy changes impact
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                      Past performance not indicative of future results
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-foreground font-paragraph mb-6">
                Interested in learning more about our Specialized Investment Funds?
              </p>
              <div className="space-x-4">
                <Link to="/contact">
                  <Button className="bg-white text-black hover:bg-foreground hover:text-dark-900 transition-all duration-300 font-paragraph font-semibold px-8 py-3">
                    Contact Our Team
                  </Button>
                </Link>
                <Link to="/funds">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-paragraph font-semibold px-8 py-3">
                    Explore Other Funds
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-white/10 mt-20">
        <div className="max-w-[100rem] mx-auto text-center">
          <p className="text-foreground font-paragraph">
            © 2024 Ophelos Investments. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}