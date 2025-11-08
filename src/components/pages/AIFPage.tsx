import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase } from 'lucide-react';

export default function AIFPage() {
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
                <Briefcase className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl font-heading font-bold text-white mb-6 animate-pulse-neon">
              Alternative Investment Funds
            </h1>
            
            <p className="text-xl text-foreground max-w-3xl mx-auto font-paragraph leading-relaxed mb-12">
              Coming Soon - Alternative investment strategies for sophisticated investors seeking higher returns through non-traditional approaches.
            </p>
            
            {/* AIF Definition Section */}
            <div className="bg-dark-800/30 border border-white/20 rounded-2xl p-8 backdrop-blur-sm mb-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 text-center">
                What are Alternative Investment Funds (AIFs)?
              </h2>
              <div className="space-y-6 text-left">
                <p className="text-foreground font-paragraph leading-relaxed">
                  Alternative Investment Funds (AIFs) are privately pooled investment vehicles that collect funds from sophisticated investors, both Indian and foreign, for investing in accordance with a defined investment policy for the benefit of its investors.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-heading font-semibold mb-3">Key Characteristics:</h3>
                    <ul className="space-y-2 text-foreground font-paragraph">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Regulated by SEBI under AIF Regulations 2012
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Minimum investment of ₹1 crore per investor
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Maximum of 1000 investors per fund
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Professional fund management
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-heading font-semibold mb-3">Investment Categories:</h3>
                    <ul className="space-y-2 text-foreground font-paragraph">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        <strong>Category I:</strong> Venture capital, infrastructure funds
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        <strong>Category II:</strong> Private equity, debt funds
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        <strong>Category III:</strong> Hedge funds, PIPE funds
                      </li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-foreground font-paragraph leading-relaxed">
                  AIFs provide access to alternative asset classes and investment strategies that are typically not available through traditional mutual funds, offering potential for higher returns and portfolio diversification.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-foreground font-paragraph">
                This section is currently under development.
              </p>
              <p className="text-foreground font-paragraph">
                Please check back soon for more information about our Alternative Investment Fund offerings.
              </p>
            </div>
            
            <div className="mt-12">
              <Link to="/funds">
                <Button className="bg-white text-black hover:bg-foreground hover:text-dark-900 transition-all duration-300 font-paragraph font-semibold px-8 py-3">
                  Explore Other Funds
                </Button>
              </Link>
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