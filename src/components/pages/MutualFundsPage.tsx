import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { MutualFunds } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ExternalLink, Calendar, User, TrendingUp, BarChart3, Filter } from 'lucide-react';

export default function MutualFundsPage() {
  const [funds, setFunds] = useState<MutualFunds[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<MutualFunds[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedAMC, setSelectedAMC] = useState<string>('');
  const [selectedFundType, setSelectedFundType] = useState<string>(''); // Active Fund or Passive Fund
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // For Active: Equity/Debt/Hybrid, For Passive: Index categories
  
  // Available options for filters
  const [amcOptions, setAmcOptions] = useState<string[]>([]);
  const [fundTypeOptions] = useState<string[]>(['Active Fund', 'Passive Fund']);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const { items } = await BaseCrudService.getAll<MutualFunds>('mutualfunds');
        
        // Transform the data to match new categorization
        const transformedItems = items.map(fund => {
          // Convert Index Fund to Passive Fund
          if (fund.category === 'Index Fund') {
            return {
              ...fund,
              category: 'Passive Fund',
              // Keep existing subcategory for index funds (like Nifty 50, Sensex, etc.)
            };
          }
          
          // For non-index funds, categorize as Active Fund
          if (fund.category && fund.category !== 'Index Fund') {
            return {
              ...fund,
              category: 'Active Fund',
              // Map existing categories to subcategories for active funds
              subcategory: fund.category === 'Equity' ? 'Equity' : 
                          fund.category === 'Debt' ? 'Debt' : 
                          fund.category === 'Hybrid' ? 'Hybrid' : 
                          fund.subcategory || fund.category
            };
          }
          
          return fund;
        });
        
        setFunds(transformedItems);
        setFilteredFunds(transformedItems);
        
        // Extract unique AMCs
        const uniqueAMCs = [...new Set(transformedItems.map(fund => fund.amc).filter(Boolean))];
        setAmcOptions(uniqueAMCs);
        
      } catch (error) {
        console.error('Error fetching mutual funds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  // Filter effect
  useEffect(() => {
    let filtered = funds;

    if (selectedAMC) {
      filtered = filtered.filter(fund => fund.amc === selectedAMC);
    }

    if (selectedFundType) {
      filtered = filtered.filter(fund => fund.category === selectedFundType);
    }

    if (selectedCategory) {
      filtered = filtered.filter(fund => fund.subcategory === selectedCategory);
    }

    setFilteredFunds(filtered);
  }, [funds, selectedAMC, selectedFundType, selectedCategory]);

  // Update category options based on selected fund type
  useEffect(() => {
    if (selectedFundType) {
      const fundTypeFunds = funds.filter(fund => fund.category === selectedFundType);
      
      if (selectedFundType === 'Active Fund') {
        // For Active Funds, show Equity, Debt, Hybrid as categories
        const activeCategories = ['Equity', 'Debt', 'Hybrid'];
        const availableCategories = activeCategories.filter(cat => 
          fundTypeFunds.some(fund => fund.subcategory === cat)
        );
        setCategoryOptions(availableCategories);
      } else if (selectedFundType === 'Passive Fund') {
        // For Passive Funds (Index Funds), show their subcategories
        const uniqueSubcategories = [...new Set(fundTypeFunds.map(fund => fund.subcategory).filter(Boolean))];
        setCategoryOptions(uniqueSubcategories);
      }
    } else {
      setCategoryOptions([]);
    }
    setSelectedCategory(''); // Reset category when fund type changes
  }, [selectedFundType, funds]);

  // Reset filters
  const resetFilters = () => {
    setSelectedAMC('');
    setSelectedFundType('');
    setSelectedCategory('');
  };

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
                <Link to="/funds">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Funds
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
              <Link to="/funds" className="text-white font-paragraph font-semibold">
                Funds
              </Link>
              <Link to="/investor-resources" className="text-secondary-foreground hover:text-white transition-colors duration-300 font-paragraph">
                Investor
              </Link>
              <Link to="/aum-details" className="text-secondary-foreground hover:text-white transition-colors duration-300 font-paragraph">
                AUM
              </Link>
              <Link to="/contact" className="text-secondary-foreground hover:text-white transition-colors duration-300 font-paragraph">
                About
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

      {/* Filter Section */}
      <section className="py-8 bg-secondary/50 border-b border-neon-cyan/20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Filter className="w-5 h-5 text-white" />
            <h2 className="font-heading text-xl font-bold text-white">Filter Funds</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters}
              className="ml-auto border-white/60 text-white hover:bg-white/10 hover:text-white"
            >
              Reset Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* AMC Filter */}
            <div className="space-y-2">
              <label className="font-paragraph text-sm font-medium text-white">
                Asset Management Company (AMC)
              </label>
              <Select value={selectedAMC} onValueChange={setSelectedAMC}>
                <SelectTrigger className="bg-secondary/80 border-neon-cyan/20 text-white">
                  <SelectValue placeholder="Select AMC" />
                </SelectTrigger>
                <SelectContent>
                  {amcOptions.map((amc) => (
                    <SelectItem key={amc} value={amc}>
                      {amc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fund Type Filter */}
            <div className="space-y-2">
              <label className="font-paragraph text-sm font-medium text-white">
                Fund Type
              </label>
              <Select value={selectedFundType} onValueChange={setSelectedFundType}>
                <SelectTrigger className="bg-secondary/80 border-neon-cyan/20 text-white">
                  <SelectValue placeholder="Select Fund Type" />
                </SelectTrigger>
                <SelectContent>
                  {fundTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="font-paragraph text-sm font-medium text-white">
                {selectedFundType === 'Active Fund' ? 'Asset Class' : 
                 selectedFundType === 'Passive Fund' ? 'Index Category' : 'Category'}
                {selectedFundType === 'Active Fund' && (
                  <span className="text-xs text-white/60 ml-1">(Equity/Debt/Hybrid)</span>
                )}
                {selectedFundType === 'Passive Fund' && (
                  <span className="text-xs text-white/60 ml-1">(Index Type)</span>
                )}
              </label>
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
                disabled={!selectedFundType || categoryOptions.length === 0}
              >
                <SelectTrigger className="bg-secondary/80 border-neon-cyan/20 text-white disabled:opacity-50">
                  <SelectValue placeholder={
                    !selectedFundType 
                      ? "Select fund type first" 
                      : categoryOptions.length === 0 
                        ? "No categories" 
                        : selectedFundType === 'Active Fund' 
                          ? "Select Asset Class"
                          : "Select Index Category"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedAMC || selectedFundType || selectedCategory) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="font-paragraph text-sm text-white/70">Active filters:</span>
              {selectedAMC && (
                <Badge variant="outline" className="border-white/60 text-white">
                  AMC: {selectedAMC}
                </Badge>
              )}
              {selectedFundType && (
                <Badge variant="outline" className="border-white/60 text-white">
                  Type: {selectedFundType}
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="outline" className="border-white/60 text-white">
                  {selectedFundType === 'Active Fund' ? 'Asset Class' : 'Index'}: {selectedCategory}
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Funds Grid */}
      <section className="py-16 bg-secondary relative">
        <div className="max-w-[100rem] mx-auto px-6">
          {/* Results Summary */}
          <div className="mb-8">
            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              {filteredFunds.length === 0 ? 'No Funds Found' : `${filteredFunds.length} Fund${filteredFunds.length !== 1 ? 's' : ''} Found`}
            </h3>
            {(selectedAMC || selectedFundType || selectedCategory) && (
              <p className="font-paragraph text-white/70">
                Showing results for your selected criteria
              </p>
            )}
          </div>

          {filteredFunds.length === 0 ? (
            <div className="text-center py-16">
              <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-4">
                {(selectedAMC || selectedFundType || selectedCategory) 
                  ? 'No Funds Match Your Criteria' 
                  : 'No Mutual Funds Available'
                }
              </h3>
              <p className="font-paragraph text-secondary-foreground/70 mb-8">
                {(selectedAMC || selectedFundType || selectedCategory)
                  ? 'Try adjusting your filters to see more options, or contact us for personalized recommendations.'
                  : 'We\'re currently updating our fund portfolio. Please check back soon or contact us for more information.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {(selectedAMC || selectedFundType || selectedCategory) && (
                  <Button 
                    onClick={resetFilters}
                    variant="outline" 
                    className="border-white/60 text-white hover:bg-white/10 hover:text-white"
                  >
                    Clear Filters
                  </Button>
                )}
                <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white border border-gray-400 shadow-soft-glow transition-all duration-300">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFunds.map((fund) => (
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
                    <div className="space-y-1">
                      {fund.amc && (
                        <p className="font-paragraph text-sm text-white font-semibold">
                          {fund.amc}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {fund.category && (
                          <Badge variant="outline" className="border-white/40 text-white/80 text-xs">
                            {fund.category}
                          </Badge>
                        )}
                        {fund.subcategory && (
                          <Badge variant="outline" className="border-white/40 text-white/80 text-xs">
                            {fund.subcategory}
                          </Badge>
                        )}
                      </div>
                      <p className="font-paragraph text-sm text-secondary-foreground/70">
                        {fund.fundType || 'Fund Type'}
                      </p>
                    </div>
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
                <p><strong>MFD:</strong> Durvesh Prashant Badhe</p>
                <p>ARN-285360</p>
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