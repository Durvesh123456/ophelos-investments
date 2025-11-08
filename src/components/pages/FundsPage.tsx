import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Building, Briefcase, PieChart } from 'lucide-react';

export default function FundsPage() {
  const fundTypes = [
    {
      title: 'Mutual Fund',
      description: 'Professionally managed investment funds that pool money from many investors to purchase securities.',
      icon: TrendingUp,
      path: '/funds/mutual-fund',
      features: ['Diversified Portfolio', 'Professional Management', 'Liquidity', 'Regulated Investment']
    },
    {
      title: 'SIF',
      description: 'Specialized Investment Funds designed for sophisticated investors seeking targeted investment strategies in specific sectors or themes.',
      icon: Building,
      path: '/funds/sif',
      features: ['Specialized Strategies', 'Sector Focused', 'Targeted Returns', 'Professional Management']
    },
    {
      title: 'AIF',
      description: 'Alternative Investment Funds for sophisticated investors seeking higher returns through alternative strategies.',
      icon: Briefcase,
      path: '/funds/aif',
      features: ['Alternative Strategies', 'Higher Returns', 'Sophisticated Investing', 'Flexible Structure']
    },
    {
      title: 'PMS',
      description: 'Portfolio Management Services offering customized investment solutions for high net worth individuals.',
      icon: PieChart,
      path: '/funds/pms',
      features: ['Customized Portfolio', 'Direct Ownership', 'Personalized Strategy', 'High Net Worth']
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

      {/* Header Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-[100rem] mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-foreground hover:text-white transition-colors mb-8 font-paragraph"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-16">
            <h1 className="text-6xl font-heading font-bold text-white mb-6 animate-pulse-neon">
              Investment Funds
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto font-paragraph leading-relaxed">
              Choose from our comprehensive range of investment solutions designed to meet diverse financial goals and risk profiles.
            </p>
          </div>
        </div>
      </section>

      {/* Fund Types Grid */}
      <section className="py-20 px-6">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fundTypes.map((fund, index) => {
              const IconComponent = fund.icon;
              return (
                <Card key={index} className="bg-dark-800/50 border-white/20 backdrop-blur-sm hover:bg-dark-700/50 transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-white/10 rounded-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-heading text-white group-hover:animate-subtle-glow">
                        {fund.title}
                      </CardTitle>
                    </div>
                    <p className="text-foreground font-paragraph leading-relaxed">
                      {fund.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-6">
                      {fund.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <span className="text-foreground font-paragraph text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={fund.path}>
                      <Button 
                        className="w-full bg-white text-black hover:bg-foreground hover:text-dark-900 transition-all duration-300 font-paragraph font-semibold"
                      >
                        Explore {fund.title}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-white/10">
        <div className="max-w-[100rem] mx-auto text-center">
          <p className="text-foreground font-paragraph">
            © 2024 Ophelos Investments. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}