import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PieChart } from 'lucide-react';

export default function PMSPage() {
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
                <PieChart className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl font-heading font-bold text-white mb-6 animate-pulse-neon">
              Portfolio Management Services
            </h1>
            
            <p className="text-xl text-foreground max-w-3xl mx-auto font-paragraph leading-relaxed mb-12">
              Coming Soon - Customized investment solutions and portfolio management services for high net worth individuals.
            </p>
            
            {/* PMS Definition Section */}
            <div className="bg-dark-800/30 border border-white/20 rounded-2xl p-8 backdrop-blur-sm mb-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 text-center">
                What is Portfolio Management Services (PMS)?
              </h2>
              <div className="space-y-6 text-left">
                <p className="text-foreground font-paragraph leading-relaxed">
                  Portfolio Management Services (PMS) is a professional service where qualified portfolio managers make investment decisions and execute trades on behalf of clients to help them achieve their financial goals. It offers personalized investment strategies tailored to individual risk profiles and investment objectives.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-heading font-semibold mb-3">Key Features:</h3>
                    <ul className="space-y-2 text-foreground font-paragraph">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Minimum investment of ₹50 lakhs
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Customized portfolio construction
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Direct ownership of securities
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Regular portfolio monitoring and rebalancing
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-heading font-semibold mb-3">Service Types:</h3>
                    <ul className="space-y-2 text-foreground font-paragraph">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        <strong>Discretionary:</strong> Full investment authority to manager
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        <strong>Non-Discretionary:</strong> Client approval required for trades
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        <strong>Advisory:</strong> Investment advice and recommendations
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <h3 className="text-white font-heading font-semibold mb-3">Benefits:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-foreground font-paragraph">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Professional expertise and research
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Personalized investment strategies
                      </li>
                    </ul>
                    <ul className="space-y-2 text-foreground font-paragraph">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Transparency in holdings and performance
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2"></div>
                        Tax efficiency and flexibility
                      </li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-foreground font-paragraph leading-relaxed">
                  PMS is regulated by SEBI and is ideal for high net worth individuals seeking professional portfolio management with greater control and customization compared to mutual funds.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-foreground font-paragraph">
                This section is currently under development.
              </p>
              <p className="text-foreground font-paragraph">
                Please check back soon for more information about our Portfolio Management Services.
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