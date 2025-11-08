import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { MutualFunds } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Calendar, User, TrendingUp, BarChart3 } from 'lucide-react';

export default function MutualFundsPage() {
  const [funds, setFunds] = useState<MutualFunds[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const { items } = await BaseCrudService.getAll<MutualFunds>('mutualfunds');
        setFunds(items);
      } catch (error) {
        console.error('Error fetching mutual funds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  const getRiskColor = (riskLevel?: string) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return 'bg-black text-white';
      case 'moderate':
        return 'bg-black text-white';
      case 'high':
        return 'bg-black text-white';
      default:
        return 'bg-black text-white';
    }
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'Contact for details';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatXIRR = (xirr?: number) => {
    if (!xirr) return 'N/A';
    return `${xirr.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="font-paragraph text-secondary-foreground">Loading mutual funds...</p>
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
              <Button variant="ghost" asChild className="text-secondary-foreground hover:text-white transition-colors duration-300">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="text-white font-heading text-2xl font-bold">
                Ophelos Investments
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-secondary-foreground hover:text-white transition-colors duration-300 font-paragraph">
                Home
              </Link>
              <Link to="/mutual-funds" className="text-white font-paragraph font-semibold">
                Mutual Funds
              </Link>
              <Link to="/investor-resources" className="text-secondary-foreground hover:text-white transition-colors duration-300 font-paragraph">
                Investor Resources
              </Link>
              <Link to="/aum-details" className="text-secondary-foreground hover:text-white transition-colors duration-300 font-paragraph">
                AUM Details
              </Link>
              <Link to="/contact" className="text-secondary-foreground hover:text-white transition-colors duration-300 font-paragraph">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 py-16 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-transparent to-neon-purple/10 animate-pulse"></div>
        </div>
        
        <div className="max-w-[100rem] mx-auto px-6 text-center relative z-10">
          <h1 className="font-heading text-5xl font-bold text-primary-foreground mb-6">
            Our Mutual Fund Portfolio
          </h1>
          <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Discover our carefully curated selection of mutual funds designed to meet diverse investment goals and risk profiles.
          </p>
        </div>
      </section>

      {/* Funds Grid */}
      <section className="py-16 bg-secondary relative">
        <div className="max-w-[100rem] mx-auto px-6">
          {funds.length === 0 ? (
            <div className="text-center py-16">
              <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-4">
                No Mutual Funds Available
              </h3>
              <p className="font-paragraph text-secondary-foreground/70 mb-8">
                We're currently updating our fund portfolio. Please check back soon or contact us for more information.
              </p>
              <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white border border-gray-400 shadow-soft-glow transition-all duration-300">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {funds.map((fund) => (
                <Card key={fund._id} className="bg-secondary/80 backdrop-blur-sm border border-neon-cyan/20 shadow-soft-glow hover:shadow-neon transition-all duration-300 hover:border-neon-cyan/40">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      {fund.fundLogo && (
                        <Image
                          src={fund.fundLogo}
                          alt={`${fund.fundName} logo`}
                          className="w-12 h-12 object-contain"
                          width={48}
                        />
                      )}
                      <Badge className={getRiskColor(fund.riskLevel)}>
                        {fund.riskLevel || 'Risk Level'} Risk
                      </Badge>
                    </div>
                    <CardTitle className="font-heading text-xl font-bold text-secondary-foreground">
                      {fund.fundName || 'Fund Name'}
                    </CardTitle>
                    <p className="font-paragraph text-sm text-secondary-foreground/70">
                      {fund.fundType || 'Fund Type'}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed">
                      {fund.fundDescription || 'Fund description not available.'}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-paragraph text-sm text-secondary-foreground/70">
                          Minimum Investment:
                        </span>
                        <span className="font-paragraph text-sm font-semibold text-secondary-foreground">
                          {formatCurrency(fund.minimumInvestment)}
                        </span>
                      </div>
                      
                      {fund.fundManager && (
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-secondary-foreground/50" />
                          <span className="font-paragraph text-sm text-secondary-foreground/70">
                            {fund.fundManager}
                          </span>
                        </div>
                      )}
                      
                      {fund.inceptionDate && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-secondary-foreground/50" />
                          <span className="font-paragraph text-sm text-secondary-foreground/70">
                            Since {formatDate(fund.inceptionDate)}
                          </span>
                        </div>
                      )}
                      
                      {fund.xirr && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="w-4 h-4 text-secondary-foreground/50" />
                            <span className="font-paragraph text-sm text-secondary-foreground/70">
                              XIRR (Since Inception):
                            </span>
                          </div>
                          <span className="font-paragraph text-sm font-semibold text-white">
                            {formatXIRR(fund.xirr)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex pt-4">
                      <Button asChild className="w-full bg-gray-600 hover:bg-gray-700 text-white border border-gray-400 shadow-soft-glow transition-all duration-300">
                        <Link to="/contact">Invest Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-transparent to-neon-purple/10 animate-pulse"></div>
        </div>
        
        <div className="max-w-[100rem] mx-auto px-6 text-center relative z-10">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-6">
            Need Help Choosing the Right Fund?
          </h2>
          <p className="font-paragraph text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Our expert advisors are here to help you select the perfect mutual fund based on your financial goals and risk tolerance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg border border-gray-400 shadow-soft-glow transition-all duration-300">
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
            <Button variant="outline" asChild className="border-white/60 text-white hover:bg-white/10 hover:text-white px-8 py-3 text-lg shadow-soft-glow transition-all duration-300 hover:shadow-neon backdrop-blur-sm">
              <Link to="/investor-resources">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 text-primary-foreground py-12 border-t border-neon-cyan/20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-neon-purple/10 to-transparent rounded-full"></div>
        </div>
        
        <div className="max-w-[100rem] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4 text-white">Ophelos Investments</h3>
              <p className="font-paragraph text-primary-foreground/80">
                Your trusted partner in mutual fund investments and wealth creation.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 font-paragraph">
                <li><Link to="/mutual-funds" className="text-primary-foreground/80 hover:text-white transition-colors duration-300">Mutual Funds</Link></li>
                <li><Link to="/investor-resources" className="text-primary-foreground/80 hover:text-white transition-colors duration-300">Investor Resources</Link></li>
                <li><Link to="/aum-details" className="text-primary-foreground/80 hover:text-white transition-colors duration-300">AUM Details</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 font-paragraph">
                <li className="text-primary-foreground/80">Portfolio Management</li>
                <li className="text-primary-foreground/80">Investment Advisory</li>
                <li className="text-primary-foreground/80">Financial Planning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-white">Contact Info</h4>
              <div className="space-y-2 font-paragraph text-primary-foreground/80">
                <p>ARN: 285360</p>
                <p>Email: ophelosinvestments@gmail.com</p>
                <p>Phone: +91 7620408920</p>
              </div>
            </div>
          </div>
          <div className="border-t border-neon-cyan/20 mt-8 pt-8 text-center font-paragraph text-primary-foreground/60">
            <p>&copy; 2024 Ophelos Investments. All rights reserved. | Mutual Fund investments are subject to market risks.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}