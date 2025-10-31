import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, PieChart, BarChart3, Users, Calendar, Award, Shield } from 'lucide-react';

export default function AumDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="bg-secondary/90 backdrop-blur-sm shadow-soft-glow border-b border-neon-cyan/20">
        <div className="max-w-[100rem] mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-secondary-foreground hover:text-neon-cyan transition-colors duration-300">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="text-neon-cyan font-heading text-2xl font-bold animate-subtle-glow">
                Ophelos Investments
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-secondary-foreground hover:text-neon-cyan transition-colors duration-300 font-paragraph">
                Home
              </Link>
              <Link to="/mutual-funds" className="text-secondary-foreground hover:text-neon-cyan transition-colors duration-300 font-paragraph">
                Mutual Funds
              </Link>
              <Link to="/investor-resources" className="text-secondary-foreground hover:text-neon-cyan transition-colors duration-300 font-paragraph">
                Investor Resources
              </Link>
              <Link to="/aum-details" className="text-neon-cyan font-paragraph font-semibold">
                AUM Details
              </Link>
              <Link to="/contact" className="text-secondary-foreground hover:text-neon-cyan transition-colors duration-300 font-paragraph">
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
          <h1 className="font-heading text-5xl font-bold text-primary-foreground mb-6 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Assets Under Management
          </h1>
          <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Comprehensive overview of our total AUM under ARN number 12345-AMFI-67890, showcasing our growth trajectory and client trust.
          </p>
        </div>
      </section>

      {/* AUM Overview */}
      <section className="py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-heading text-4xl font-bold text-secondary-foreground mb-6">
                ₹40 Lakh+
              </h2>
              <p className="font-paragraph text-xl text-secondary-foreground/80 mb-8">
                Total Assets Under Management as of December 2024, representing the trust of over 15,000 investors across India.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary w-2 h-2 rounded-full"></div>
                  <span className="font-paragraph text-secondary-foreground">AMFI Registered ARN: 12345-AMFI-67890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary w-2 h-2 rounded-full"></div>
                  <span className="font-paragraph text-secondary-foreground">SEBI Registered Investment Advisor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary w-2 h-2 rounded-full"></div>
                  <span className="font-paragraph text-secondary-foreground">25+ Years of Market Experience</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/7afb6a_1196639935a3475ca5f0ec2bf5c114e5~mv2.png?originWidth=576&originHeight=384"
                alt="AUM growth chart showing steady increase in assets under management over the years"
                className="w-full h-auto rounded-lg shadow-lg"
                width={600}
              />
            </div>
          </div>

          {/* AUM Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="bg-white shadow-lg text-center">
              <CardHeader>
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
                  ₹24 Lakh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-secondary-foreground/70 mb-2">Equity Funds</p>
                <p className="font-paragraph text-sm text-secondary-foreground/60">60% of Total AUM</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg text-center">
              <CardHeader>
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
                  ₹12 Lakh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-secondary-foreground/70 mb-2">Debt Funds</p>
                <p className="font-paragraph text-sm text-secondary-foreground/60">30% of Total AUM</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg text-center">
              <CardHeader>
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
                  ₹3.2 Lakh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-secondary-foreground/70 mb-2">Hybrid Funds</p>
                <p className="font-paragraph text-sm text-secondary-foreground/60">8% of Total AUM</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg text-center">
              <CardHeader>
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
                  ₹80,000
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-secondary-foreground/70 mb-2">Other Funds</p>
                <p className="font-paragraph text-sm text-secondary-foreground/60">2% of Total AUM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Growth Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-[100rem] mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-secondary-foreground mb-12 text-center">
            AUM Growth Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-2">2020</h3>
              <p className="font-paragraph text-lg font-semibold text-primary mb-2">₹5 Lakh</p>
              <p className="font-paragraph text-sm text-secondary-foreground/70">Foundation year with strong client base</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-2">2021</h3>
              <p className="font-paragraph text-lg font-semibold text-primary mb-2">₹10 Lakh</p>
              <p className="font-paragraph text-sm text-secondary-foreground/70">Doubled AUM through strategic growth</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-2">2022</h3>
              <p className="font-paragraph text-lg font-semibold text-primary mb-2">₹18 Lakh</p>
              <p className="font-paragraph text-sm text-secondary-foreground/70">Expanded client base to 10,000+ investors</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-2">2024</h3>
              <p className="font-paragraph text-lg font-semibold text-primary mb-2">₹40 Lakh</p>
              <p className="font-paragraph text-sm text-secondary-foreground/70">Achieved milestone with 15,000+ clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16 bg-primary">
        <div className="max-w-[100rem] mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-12 text-center">
            Performance Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-heading font-bold text-primary-foreground mb-4">
                12.5%
              </div>
              <p className="font-paragraph text-xl text-primary-foreground/90 mb-2">
                Average Annual Return
              </p>
              <p className="font-paragraph text-sm text-primary-foreground/70">
                Across all fund categories over 5 years
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-heading font-bold text-primary-foreground mb-4">
                95%
              </div>
              <p className="font-paragraph text-xl text-primary-foreground/90 mb-2">
                Client Retention Rate
              </p>
              <p className="font-paragraph text-sm text-primary-foreground/70">
                High satisfaction and trust levels
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-heading font-bold text-primary-foreground mb-4">
                4.8/5
              </div>
              <p className="font-paragraph text-xl text-primary-foreground/90 mb-2">
                Client Satisfaction Score
              </p>
              <p className="font-paragraph text-sm text-primary-foreground/70">
                Based on annual client surveys
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Information */}
      <section className="py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="font-heading text-3xl font-bold text-secondary-foreground mb-8 text-center">
              Regulatory Compliance & Transparency
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4">
                  Registration Details
                </h3>
                <div className="space-y-3 font-paragraph text-secondary-foreground/80">
                  <p><strong>ARN Number:</strong> 12345-AMFI-67890</p>
                  <p><strong>SEBI Registration:</strong> INA000012345</p>
                  <p><strong>Valid Until:</strong> March 31, 2026</p>
                  <p><strong>Compliance Officer:</strong> Mr. Rajesh Kumar</p>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4">
                  Audit & Reporting
                </h3>
                <div className="space-y-3 font-paragraph text-secondary-foreground/80">
                  <p><strong>External Auditor:</strong> ABC & Associates</p>
                  <p><strong>Last Audit:</strong> September 2024</p>
                  <p><strong>Reporting Frequency:</strong> Monthly to AMFI</p>
                  <p><strong>Client Reporting:</strong> Quarterly statements</p>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-secondary rounded-lg">
              <p className="font-paragraph text-sm text-secondary-foreground/70 text-center">
                <strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing. Past performance is not indicative of future returns. The ARN holder is not liable for any loss arising from investments made by clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-6">
            Join Our Growing Family of Investors
          </h2>
          <p className="font-paragraph text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Be part of our success story and let us help you achieve your financial goals with our proven track record and expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg">
              <Link to="/contact">Start Investing</Link>
            </Button>
            <Button variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg">
              <Link to="/contact">Schedule Meeting</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-foreground text-primary-foreground py-12">
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
                <p>ARN: 285360</p>
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