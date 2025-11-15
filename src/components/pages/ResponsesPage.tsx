import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff, Download, Settings, Trash2, Menu } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Consultations } from '@/entities';
import { format, differenceInDays } from 'date-fns';

export default function ResponsesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [consultations, setConsultations] = useState<Consultations[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deletionDays, setDeletionDays] = useState<number>(7);
  const [customDays, setCustomDays] = useState<string>('7');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [deletingOld, setDeletingOld] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load deletion days setting from localStorage on component mount
  useEffect(() => {
    const savedDeletionDays = localStorage.getItem('responseDeletionDays');
    if (savedDeletionDays) {
      const days = parseInt(savedDeletionDays, 10);
      if (!isNaN(days) && days > 0) {
        setDeletionDays(days);
        setCustomDays(days.toString());
      }
    }
  }, []);

  // Auto-delete old responses when consultations are loaded
  useEffect(() => {
    if (consultations.length > 0 && isAuthenticated) {
      deleteOldResponses();
    }
  }, [consultations, deletionDays, isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123456789') {
      setIsAuthenticated(true);
      setError('');
      loadConsultations();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const deleteOldResponses = async () => {
    if (deletingOld) return; // Prevent multiple simultaneous deletions
    
    setDeletingOld(true);
    try {
      const currentDate = new Date();
      const responsesToDelete: string[] = [];
      
      consultations.forEach(consultation => {
        const submissionDate = new Date(consultation.submissionDate || consultation._createdDate || 0);
        const daysDifference = differenceInDays(currentDate, submissionDate);
        
        if (daysDifference >= deletionDays) {
          responsesToDelete.push(consultation._id);
        }
      });

      if (responsesToDelete.length > 0) {
        // Delete old responses
        for (const id of responsesToDelete) {
          await BaseCrudService.delete('consultations', id);
        }
        
        // Reload consultations to reflect deletions
        await loadConsultations();
        
        console.log(`Automatically deleted ${responsesToDelete.length} responses older than ${deletionDays} days`);
      }
    } catch (error) {
      console.error('Error deleting old responses:', error);
    } finally {
      setDeletingOld(false);
    }
  };

  const handleDeletionSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const days = parseInt(customDays, 10);
    
    if (isNaN(days) || days <= 0) {
      alert('Please enter a valid number of days (greater than 0)');
      return;
    }
    
    setDeletionDays(days);
    localStorage.setItem('responseDeletionDays', days.toString());
    setIsSettingsOpen(false);
    
    // Trigger immediate deletion check with new settings
    if (consultations.length > 0) {
      deleteOldResponses();
    }
  };

  const manualDeleteOldResponses = async () => {
    if (window.confirm(`Are you sure you want to delete all responses older than ${deletionDays} days? This action cannot be undone.`)) {
      await deleteOldResponses();
    }
  };

  const loadConsultations = async () => {
    setLoading(true);
    try {
      const { items } = await BaseCrudService.getAll<Consultations>('consultations');
      // Sort by submission date, newest first
      const sortedItems = items.sort((a, b) => {
        const dateA = new Date(a.submissionDate || a._createdDate || 0);
        const dateB = new Date(b.submissionDate || b._createdDate || 0);
        return dateB.getTime() - dateA.getTime();
      });
      setConsultations(sortedItems);
    } catch (error) {
      console.error('Error loading consultations:', error);
      setError('Failed to load consultation data.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'dd/MM/yyyy HH:mm');
    } catch {
      return 'Invalid Date';
    }
  };

  const formatInvestmentAmount = (amount: number | undefined) => {
    if (!amount) return 'Not specified';
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Crore`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} Lakh`;
    return `₹${amount.toLocaleString()}`;
  };

  const exportToCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Investment Amount', 'Message', 'Submission Date'];
    const csvContent = [
      headers.join(','),
      ...consultations.map(consultation => [
        consultation.firstName || '',
        consultation.lastName || '',
        consultation.email || '',
        consultation.phone || '',
        formatInvestmentAmount(consultation.investmentAmount),
        `"${(consultation.message || '').replace(/"/g, '""')}"`, // Escape quotes in message
        formatDate(consultation.submissionDate)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `consultation_responses_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        {/* Cyber Grid Background */}
        <div className="fixed inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
        
        <Card className="w-full max-w-md bg-black shadow-lg border border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
              Access Responses
            </CardTitle>
            <p className="font-paragraph text-secondary-foreground/70">
              Enter password to view consultation responses
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph text-black pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {error && (
                <p className="text-red-400 text-sm font-paragraph">{error}</p>
              )}
              
              <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3">
                Access Responses
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Link to="/contact" className="text-secondary-foreground/70 hover:text-secondary-foreground font-paragraph text-sm">
                ← Back to Contact Page
              </Link>
            </div>
          </CardContent>
        </Card>
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
              <Button variant="ghost" asChild className="text-secondary-foreground">
                <Link to="/contact">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Contact
                </Link>
              </Button>
              <div className="text-primary font-heading text-2xl font-bold hidden lg:block">
                Consultation Responses
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground hover:text-black"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Auto-Delete Settings
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black border border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-secondary-foreground font-heading">
                      Auto-Delete Settings
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleDeletionSettingsSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="deletionDays" className="text-secondary-foreground font-paragraph">
                        Delete responses older than (days):
                      </Label>
                      <Input
                        id="deletionDays"
                        type="number"
                        min="1"
                        value={customDays}
                        onChange={(e) => setCustomDays(e.target.value)}
                        className="mt-1 bg-black border-white/20 text-secondary-foreground"
                        placeholder="Enter number of days"
                        required
                      />
                      <p className="text-sm text-secondary-foreground/70 mt-1 font-paragraph">
                        Current setting: {deletionDays} days. Responses are automatically deleted when the page loads.
                      </p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsSettingsOpen(false)}
                        className="text-secondary-foreground"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gray-600 hover:bg-gray-700 text-white"
                      >
                        Save Settings
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Button
                onClick={manualDeleteOldResponses}
                variant="outline"
                className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black"
                disabled={deletingOld}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deletingOld ? 'Deleting...' : `Delete Old (${deletionDays}+ days)`}
              </Button>
              
              <Button
                onClick={exportToCSV}
                variant="outline"
                className="text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground hover:text-black"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={() => setIsAuthenticated(false)}
                variant="ghost"
                className="text-secondary-foreground"
              >
                Logout
              </Button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-secondary-foreground p-2"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black border border-white/20 w-[90vw] max-w-sm">
                  <DialogHeader>
                    <DialogTitle className="text-secondary-foreground font-heading">
                      Menu
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground hover:text-black justify-start"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Auto-Delete Settings
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-black border border-white/20">
                        <DialogHeader>
                          <DialogTitle className="text-secondary-foreground font-heading">
                            Auto-Delete Settings
                          </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleDeletionSettingsSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="deletionDaysMobile" className="text-secondary-foreground font-paragraph">
                              Delete responses older than (days):
                            </Label>
                            <Input
                              id="deletionDaysMobile"
                              type="number"
                              min="1"
                              value={customDays}
                              onChange={(e) => setCustomDays(e.target.value)}
                              className="mt-1 bg-black border-white/20 text-secondary-foreground"
                              placeholder="Enter number of days"
                              required
                            />
                            <p className="text-sm text-secondary-foreground/70 mt-1 font-paragraph">
                              Current setting: {deletionDays} days. Responses are automatically deleted when the page loads.
                            </p>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => setIsSettingsOpen(false)}
                              className="text-secondary-foreground"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="bg-gray-600 hover:bg-gray-700 text-white"
                            >
                              Save Settings
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      onClick={() => {
                        manualDeleteOldResponses();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full text-red-400 border-red-400 hover:bg-red-400 hover:text-black justify-start"
                      disabled={deletingOld}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {deletingOld ? 'Deleting...' : `Delete Old (${deletionDays}+ days)`}
                    </Button>
                    
                    <Button
                      onClick={() => {
                        exportToCSV();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground hover:text-black justify-start"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                    
                    <Button
                      onClick={() => {
                        setIsAuthenticated(false);
                        setIsMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full text-secondary-foreground justify-start"
                    >
                      Logout
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-[100rem] mx-auto px-6">
          {/* Mobile/Tablet Title - Hidden on Desktop */}
          <div className="mb-6 lg:hidden">
            <h1 className="font-heading text-3xl font-bold text-secondary-foreground mb-2">
              Consultation Responses
            </h1>
          </div>
          
          <div className="mb-6">
            <h1 className="font-heading text-3xl font-bold text-secondary-foreground mb-2 hidden lg:block">
              Consultation Responses
            </h1>
            <p className="font-paragraph text-secondary-foreground/70">
              Total responses: {consultations.length}
            </p>
          </div>

          {loading ? (
            <Card className="bg-black shadow-lg border border-white/20">
              <CardContent className="py-12 text-center">
                <p className="font-paragraph text-secondary-foreground">Loading responses...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="bg-black shadow-lg border border-white/20">
              <CardContent className="py-12 text-center">
                <p className="font-paragraph text-red-400">{error}</p>
                <Button onClick={loadConsultations} className="mt-4">
                  Retry
                </Button>
              </CardContent>
            </Card>
          ) : consultations.length === 0 ? (
            <Card className="bg-black shadow-lg border border-white/20">
              <CardContent className="py-12 text-center">
                <p className="font-paragraph text-secondary-foreground">No consultation responses yet.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black shadow-lg border border-white/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-secondary-foreground font-paragraph font-semibold">First Name</TableHead>
                        <TableHead className="text-secondary-foreground font-paragraph font-semibold">Last Name</TableHead>
                        <TableHead className="text-secondary-foreground font-paragraph font-semibold">Email</TableHead>
                        <TableHead className="text-secondary-foreground font-paragraph font-semibold">Phone</TableHead>
                        <TableHead className="text-secondary-foreground font-paragraph font-semibold">Investment Amount</TableHead>
                        <TableHead className="text-secondary-foreground font-paragraph font-semibold">Message</TableHead>
                        <TableHead className="text-secondary-foreground font-paragraph font-semibold">Submission Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consultations.map((consultation) => (
                        <TableRow key={consultation._id} className="border-white/20 hover:bg-white/5">
                          <TableCell className="font-paragraph text-secondary-foreground">
                            {consultation.firstName || 'N/A'}
                          </TableCell>
                          <TableCell className="font-paragraph text-secondary-foreground">
                            {consultation.lastName || 'N/A'}
                          </TableCell>
                          <TableCell className="font-paragraph text-secondary-foreground">
                            {consultation.email || 'N/A'}
                          </TableCell>
                          <TableCell className="font-paragraph text-secondary-foreground">
                            {consultation.phone || 'N/A'}
                          </TableCell>
                          <TableCell className="font-paragraph text-secondary-foreground">
                            {formatInvestmentAmount(consultation.investmentAmount)}
                          </TableCell>
                          <TableCell className="font-paragraph text-secondary-foreground max-w-xs">
                            <div className="truncate" title={consultation.message || 'N/A'}>
                              {consultation.message || 'N/A'}
                            </div>
                          </TableCell>
                          <TableCell className="font-paragraph text-secondary-foreground">
                            {formatDate(consultation.submissionDate)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}