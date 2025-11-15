import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Users, Award, Phone } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-20 pointer-events-none"></div>
      
      {/* Animated Scan Line */}
      <div className="fixed top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50 animate-cyber-scan pointer-events-none"></div>
      
      {/* Hero Section - Full Bleed */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-screen flex items-center">
        {/* Background Image with Futuristic Overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/7afb6a_8c712924d0e14685973458ca18930500~mv2.png?originWidth=1600&originHeight=896"
            alt="Daylight aerial view of New York City showing Central Park in the middle, surrounded by Manhattan skyscrapers under bright blue sky"
            className="w-full h-full object-cover object-top"
            width={1600}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/80 via-dark-800/70 to-dark-700/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-gray-300/10"></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-20 p-6 backdrop-blur-sm bg-dark-900/30 border-b border-white/10">
          <div className="max-w-[100rem] mx-auto flex justify-between items-center">
            <div className="text-white font-heading text-2xl font-bold">
              Ophelos Investments
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-foreground hover:text-white transition-all duration-300 font-paragraph relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/funds" className="text-foreground hover:text-white transition-all duration-300 font-paragraph relative group">
                Funds
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
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

        {/* Hero Content */}
        <div className="relative z-10 max-w-[100rem] mx-auto px-6 text-center pt-24 md:pt-32">
          <div className="text-foreground max-w-4xl mx-auto">
            <p className="text-lg font-paragraph mb-4 tracking-wide text-white md:text-base lg:text-lg bg-dark-900/40 backdrop-blur-sm px-4 py-2 rounded-lg inline-block border border-white/20">
              MFD - DURVESH PRASHANT BADHE | BUILDING YOUR FINANCIAL FUTURE
            </p>
            <h1 className="font-heading text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Expert Mutual Fund
              <br />
              Investment Solutions
            </h1>
            <p className="text-xl font-paragraph mb-8 leading-relaxed opacity-90">
              Navigate the complexities of mutual fund investments with our comprehensive portfolio management and expert financial guidance under the expertise of MFD - Durvesh Prashant Badhe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg border border-gray-400 shadow-soft-glow transition-all duration-300">
                <Link to="/mutual-funds">Explore Our Funds</Link>
              </Button>
              <Button variant="outline" asChild className="border-gray-400 text-white hover:bg-gray-100 hover:text-gray-700 px-8 py-3 text-lg shadow-soft-glow transition-all duration-300 hover:shadow-neon backdrop-blur-sm">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        
        <div className="max-w-[100rem] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-secondary-foreground mb-6">
              Why Choose Ophelos Investments
            </h2>
            <p className="font-paragraph text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
              Our commitment to excellence and client success drives everything we do in mutual fund management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-neon-cyan to-neon-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft-glow group-hover:shadow-neon transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4 group-hover:text-white transition-colors duration-300">
                Proven Performance
              </h3>
              <p className="font-paragraph text-secondary-foreground/70">
                Consistent returns across market cycles with our expertly managed fund portfolio.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-neon-purple to-neon-pink w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft-glow group-hover:shadow-neon transition-all duration-300">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4 group-hover:text-white transition-colors duration-300">
                Risk Management
              </h3>
              <p className="font-paragraph text-secondary-foreground/70">
                Advanced risk assessment and mitigation strategies to protect your investments.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-neon-green to-neon-cyan w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft-glow group-hover:shadow-neon transition-all duration-300">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4 group-hover:text-white transition-colors duration-300">
                Expert Guidance
              </h3>
              <p className="font-paragraph text-secondary-foreground/70">
                Dedicated financial advisory services by MFD - Durvesh Prashant Badhe with decades of mutual fund expertise.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-neon-pink to-neon-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft-glow group-hover:shadow-neon transition-all duration-300">
                <Award className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4 group-hover:text-white transition-colors duration-300">
                Award Winning
              </h3>
              <p className="font-paragraph text-secondary-foreground/70">
                Recognized excellence in mutual fund management and client service.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-transparent to-neon-purple/10 animate-pulse"></div>
        </div>
        
        <div className="max-w-[100rem] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="group">
              <div className="text-5xl font-heading font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                ₹40 Lakh+
              </div>
              <p className="font-paragraph text-xl text-primary-foreground/90">
                Assets Under Management
              </p>
            </div>
            <div className="group">
              <div className="text-5xl font-heading font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.5s'}}>
                15,000+
              </div>
              <p className="font-paragraph text-xl text-primary-foreground/90">
                Satisfied Investors
              </p>
            </div>
            <div className="group">
              <div className="text-5xl font-heading font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300" style={{animationDelay: '1s'}}>
                25+ Years
              </div>
              <p className="font-paragraph text-xl text-primary-foreground/90">
                Market Experience
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        {/* Futuristic Grid Pattern */}
        <div className="absolute inset-0 bg-cyber-grid opacity-30"></div>
        
        <div className="max-w-[100rem] mx-auto px-6 text-center relative z-10">
          <h2 className="font-heading text-4xl font-bold text-secondary-foreground mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="font-paragraph text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust Ophelos Investments for their mutual fund investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg border border-gray-400 shadow-soft-glow transition-all duration-300">
              <Link to="/mutual-funds">View Our Funds</Link>
            </Button>
            <Button variant="outline" asChild className="border-white/60 text-white hover:bg-white/10 hover:text-white px-8 py-3 text-lg shadow-soft-glow transition-all duration-300 hover:shadow-neon backdrop-blur-sm">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Direct Call Box */}
      <section className="py-8 bg-gradient-to-r from-dark-900 to-dark-800">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="bg-gradient-to-br from-secondary to-dark-800 rounded-lg shadow-cyber border border-neon-cyan/30 p-6 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-white mr-3" />
              <h3 className="font-heading text-2xl font-bold text-secondary-foreground">
                Need Immediate Assistance?
              </h3>
            </div>
            <p className="font-paragraph text-secondary-foreground/70 mb-6">
              Speak directly with our investment experts for personalized guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg border border-gray-400 shadow-soft-glow transition-all duration-300">
                <a href="tel:+917620408920">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +91 7620408920
                </a>
              </Button>
              <span className="font-paragraph text-sm text-secondary-foreground/60">
                Available Mon-Fri, 9 AM - 6 PM
              </span>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 font-paragraph">
                <li><Link to="/mutual-funds" className="text-primary-foreground/80 hover:text-white transition-colors duration-300">Mutual Funds</Link></li>
                <li><Link to="/investor-resources" className="text-primary-foreground/80 hover:text-white transition-colors duration-300">Investor Resources</Link></li>
                <li><Link to="/aum-details" className="text-primary-foreground/80 hover:text-white transition-colors duration-300">AUM Details</Link></li>
                <li><Link to="/contact" className="text-primary-foreground/80 hover:text-white transition-colors duration-300">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 font-paragraph">
                <li className="text-primary-foreground/80">Portfolio Management</li>
                <li className="text-primary-foreground/80">Investment Advisory</li>
                <li className="text-primary-foreground/80">Financial Planning</li>
                <li className="text-primary-foreground/80">Risk Assessment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-white">Contact Info</h4>
              <div className="space-y-2 font-paragraph text-primary-foreground/80">
                <p><strong>MFD:</strong> Durvesh Prashant Badhe</p>
                <p>ARN-285360</p>
                <p>Email: ophelosinvestments@gmail.com</p>
                <p>Phone: +91 7620408920</p>
                <p>Available: Mon-Fri, 9 AM - 6 PM</p>
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