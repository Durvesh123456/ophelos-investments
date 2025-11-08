import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building } from 'lucide-react';

export default function SIFPage() {
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
              Coming Soon - Specialized Investment Funds designed for sophisticated investors seeking targeted investment strategies in specific sectors or themes.
            </p>
            
            <div className="space-y-4">
              <p className="text-foreground font-paragraph">
                This section is currently under development.
              </p>
              <p className="text-foreground font-paragraph">
                Please check back soon for more information about our Specialized Investment Fund offerings.
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