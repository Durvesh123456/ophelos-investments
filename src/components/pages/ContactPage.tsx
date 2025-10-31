import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    investmentAmount: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        investmentAmount: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="bg-secondary/90 backdrop-blur-sm shadow-soft-glow border-b border-neon-cyan/20">
        <div className="max-w-[100rem] mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-secondary-foreground">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="text-primary font-heading text-2xl font-bold">
                Ophelos Investments
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                Home
              </Link>
              <Link to="/mutual-funds" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                Mutual Funds
              </Link>
              <Link to="/investor-resources" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                Investor Resources
              </Link>
              <Link to="/aum-details" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">
                AUM Details
              </Link>
              <Link to="/contact" className="text-primary font-paragraph font-semibold">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl font-bold text-primary-foreground mb-6">
            Get in Touch
          </h1>
          <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Ready to start your investment journey? Our expert advisors are here to guide you towards achieving your financial goals.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
                    Schedule Your Consultation
                  </CardTitle>
                  <p className="font-paragraph text-secondary-foreground/70">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-2">
                        Thank You!
                      </h3>
                      <p className="font-paragraph text-secondary-foreground/70">
                        Your message has been sent successfully. We'll contact you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-secondary-foreground font-paragraph text-sm font-medium mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-secondary-foreground font-paragraph text-sm font-medium mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-secondary-foreground font-paragraph text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-secondary-foreground font-paragraph text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
                        />
                      </div>

                      <div>
                        <label className="block text-secondary-foreground font-paragraph text-sm font-medium mb-2">
                          Investment Amount Range
                        </label>
                        <select
                          name="investmentAmount"
                          value={formData.investmentAmount}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
                        >
                          <option value="">Select Range</option>
                          <option value="1-5-lakhs">₹1 Lakh - ₹5 Lakhs</option>
                          <option value="5-25-lakhs">₹5 Lakhs - ₹25 Lakhs</option>
                          <option value="25-lakhs-1-crore">₹25 Lakhs - ₹1 Crore</option>
                          <option value="1-crore-plus">₹1 Crore+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-secondary-foreground font-paragraph text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph resize-none"
                          placeholder="Tell us about your investment goals and any specific questions you have..."
                        ></textarea>
                      </div>

                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-xl font-bold text-secondary-foreground">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-paragraph font-semibold text-secondary-foreground mb-1">Office Address</h3>
                      <p className="font-paragraph text-secondary-foreground/70">
                        Ophelos Investments Pvt. Ltd.<br />
                        123, Financial District<br />
                        Bandra Kurla Complex<br />
                        Mumbai, Maharashtra 400051
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-paragraph font-semibold text-secondary-foreground mb-1">Phone Numbers</h3>
                      <p className="font-paragraph text-secondary-foreground/70">
                        Main: +91 7620408920<br />
                        Toll Free: 1800-123-4567<br />
                        WhatsApp: +91 7620408920
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-paragraph font-semibold text-secondary-foreground mb-1">Email Addresses</h3>
                      <p className="font-paragraph text-secondary-foreground/70">
                        General: ophelosinvestments@gmail.com<br />
                        Support: support@ophelosinvestments.com<br />
                        Compliance: compliance@ophelosinvestments.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-paragraph font-semibold text-secondary-foreground mb-1">Business Hours</h3>
                      <p className="font-paragraph text-secondary-foreground/70">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="bg-white shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src="https://static.wixstatic.com/media/7afb6a_64e2018dcccc43479ee214cb7166b824~mv2.png?originWidth=576&originHeight=320"
                      alt="Ophelos Investments office location map showing Bandra Kurla Complex, Mumbai"
                      className="w-full h-full object-cover"
                      width={600}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Regulatory Info */}
              <Card className="bg-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-xl font-bold text-primary-foreground">
                    Regulatory Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-paragraph text-primary-foreground/90">
                    <strong>ARN Number:</strong> 12345-AMFI-67890
                  </p>
                  <p className="font-paragraph text-primary-foreground/90">
                    <strong>SEBI Registration:</strong> INA000012345
                  </p>
                  <p className="font-paragraph text-primary-foreground/90">
                    <strong>CIN:</strong> U65999MH2020PTC123456
                  </p>
                  <p className="font-paragraph text-sm text-primary-foreground/70 mt-4">
                    Ophelos Investments is a SEBI registered investment advisor and AMFI registered mutual fund distributor.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[100rem] mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-secondary-foreground mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-3">
                What is the minimum investment amount?
              </h3>
              <p className="font-paragraph text-secondary-foreground/80 mb-6">
                The minimum investment varies by fund, typically starting from ₹500 for SIP and ₹5,000 for lump sum investments.
              </p>

              <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-3">
                How do I start investing?
              </h3>
              <p className="font-paragraph text-secondary-foreground/80 mb-6">
                Simply contact us through this form or call our office. We'll guide you through the KYC process and help you choose suitable funds.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-3">
                Are there any charges for consultation?
              </h3>
              <p className="font-paragraph text-secondary-foreground/80 mb-6">
                Initial consultation is completely free. We earn through commissions from fund houses, not from client fees.
              </p>

              <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-3">
                How often will I receive portfolio updates?
              </h3>
              <p className="font-paragraph text-secondary-foreground/80 mb-6">
                You'll receive monthly statements and quarterly portfolio reviews. We also provide annual tax statements.
              </p>
            </div>
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