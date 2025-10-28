import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Users, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Bleed */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/7afb6a_3b2d0ff8b9d243428f919efcc1b4cb34~mv2.png?originWidth=1920&originHeight=1024"
            alt="Professional financial district skyline representing investment growth and prosperity"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="max-w-[100rem] mx-auto flex justify-between items-center">
            <div className="text-white font-heading text-2xl font-bold">
              WealthGrow Capital
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-white hover:text-primary-foreground transition-colors font-paragraph">
                Home
              </Link>
              <Link to="/mutual-funds" className="text-white hover:text-primary-foreground transition-colors font-paragraph">
                Mutual Funds
              </Link>
              <Link to="/investor-resources" className="text-white hover:text-primary-foreground transition-colors font-paragraph">
                Investor Resources
              </Link>
              <Link to="/aum-details" className="text-white hover:text-primary-foreground transition-colors font-paragraph">
                AUM Details
              </Link>
              <Link to="/contact" className="text-white hover:text-primary-foreground transition-colors font-paragraph">
                Contact
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[100rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <p className="text-lg font-paragraph mb-4 tracking-wide">
              BUILDING YOUR FINANCIAL FUTURE
            </p>
            <h1 className="font-heading text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Expert Mutual Fund
              <br />
              Investment Solutions
            </h1>
            <p className="text-xl font-paragraph mb-8 leading-relaxed opacity-90">
              Navigate the complexities of mutual fund investments with our comprehensive portfolio management and expert financial guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                <Link to="/mutual-funds">Explore Our Funds</Link>
              </Button>
              <Button variant="outline" asChild className="border-white text-white hover:bg-white hover:text-secondary-foreground px-8 py-3 text-lg">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>

          <div className="bg-primary p-8 rounded-lg shadow-2xl">
            <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-6">
              GET AN INVESTMENT CONSULTATION TODAY
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-primary-foreground font-paragraph text-sm mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded border-0 bg-white/90 text-secondary-foreground font-paragraph"
                    required
                  />
                </div>
                <div>
                  <label className="block text-primary-foreground font-paragraph text-sm mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded border-0 bg-white/90 text-secondary-foreground font-paragraph"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-primary-foreground font-paragraph text-sm mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded border-0 bg-white/90 text-secondary-foreground font-paragraph"
                  required
                />
              </div>
              <div>
                <label className="block text-primary-foreground font-paragraph text-sm mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded border-0 bg-white/90 text-secondary-foreground font-paragraph"
                />
              </div>
              <div>
                <label className="block text-primary-foreground font-paragraph text-sm mb-2">
                  Investment Amount
                </label>
                <select className="w-full px-4 py-3 rounded border-0 bg-white/90 text-secondary-foreground font-paragraph">
                  <option>Select Range</option>
                  <option>₹1 Lakh - ₹5 Lakhs</option>
                  <option>₹5 Lakhs - ₹25 Lakhs</option>
                  <option>₹25 Lakhs - ₹1 Crore</option>
                  <option>₹1 Crore+</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-white text-primary hover:bg-white/90 py-3 text-lg font-semibold">
                Submit
              </Button>
            </form>
          </div>
        {/* Right Content - Contact Form */}
          </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-secondary-foreground mb-6">
              Why Choose WealthGrow Capital
            </h2>
            <p className="font-paragraph text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
              Our commitment to excellence and client success drives everything we do in mutual fund management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4">
                Proven Performance
              </h3>
              <p className="font-paragraph text-secondary-foreground/70">
                Consistent returns across market cycles with our expertly managed fund portfolio.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4">
                Risk Management
              </h3>
              <p className="font-paragraph text-secondary-foreground/70">
                Advanced risk assessment and mitigation strategies to protect your investments.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4">
                Expert Guidance
              </h3>
              <p className="font-paragraph text-secondary-foreground/70">
                Dedicated financial advisors with decades of mutual fund expertise.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4">
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
      <section className="py-20 bg-primary">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-heading font-bold text-primary-foreground mb-4">
                ₹2,500 Cr+
              </div>
              <p className="font-paragraph text-xl text-primary-foreground/90">
                Assets Under Management
              </p>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold text-primary-foreground mb-4">
                15,000+
              </div>
              <p className="font-paragraph text-xl text-primary-foreground/90">
                Satisfied Investors
              </p>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold text-primary-foreground mb-4">
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
      <section className="py-20 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl font-bold text-secondary-foreground mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="font-paragraph text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust WealthGrow Capital for their mutual fund investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
              <Link to="/mutual-funds">View Our Funds</Link>
            </Button>
            <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg">
              <Link to="/contact">Contact Us Today</Link>
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