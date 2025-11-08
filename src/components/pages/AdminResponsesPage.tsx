import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Eye, EyeOff, Download, Search, Calendar } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Consultations } from '@/entities';
import { format } from 'date-fns';

export default function AdminResponsesPage() {
  const [consultations, setConsultations] = useState<Consultations[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Simple password protection - in production, use proper authentication
  const ADMIN_PASSWORD = 'ophelos2024admin';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      loadConsultations();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
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

  const filteredConsultations = consultations.filter(consultation => {
    const searchLower = searchTerm.toLowerCase();
    return (
      consultation.firstName?.toLowerCase().includes(searchLower) ||
      consultation.lastName?.toLowerCase().includes(searchLower) ||
      consultation.email?.toLowerCase().includes(searchLower) ||
      consultation.phone?.toLowerCase().includes(searchLower) ||
      consultation.message?.toLowerCase().includes(searchLower)
    );
  });

  const exportToCSV = () => {
    const headers = ['Date', 'First Name', 'Last Name', 'Email', 'Phone', 'Investment Amount', 'Message'];
    const csvContent = [
      headers.join(','),
      ...filteredConsultations.map(consultation => [
        format(new Date(consultation.submissionDate || consultation._createdDate || ''), 'yyyy-MM-dd HH:mm'),
        consultation.firstName || '',
        consultation.lastName || '',
        consultation.email || '',
        consultation.phone || '',
        consultation.investmentAmount || '',
        `"${(consultation.message || '').replace(/"/g, '""')}"` // Escape quotes in message
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `consultation-responses-${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        {/* Cyber Grid Background */}
        <div className="fixed inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
        
        <Card className="w-full max-w-md bg-black shadow-lg border border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl font-bold text-secondary-foreground">
              Admin Access Required
            </CardTitle>
            <p className="font-paragraph text-secondary-foreground/70">
              Enter password to view consultation responses
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              
              {error && (
                <p className="text-red-400 text-sm font-paragraph">{error}</p>
              )}
              
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                Access Admin Panel
              </Button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-white/20">
              <Link to="/" className="inline-flex items-center text-secondary-foreground/70 hover:text-secondary-foreground font-paragraph text-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
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
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-[120rem]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="inline-flex items-center text-secondary-foreground/70 hover:text-secondary-foreground font-paragraph">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-white/20 text-secondary-foreground hover:bg-white/10"
            >
              Logout
            </Button>
          </div>
          
          <h1 className="font-heading text-4xl font-bold text-secondary-foreground mb-2">
            Consultation Responses
          </h1>
          <p className="font-paragraph text-secondary-foreground/70">
            View and manage consultation requests from potential clients
          </p>
        </div>

        {/* Controls */}
        <Card className="bg-black shadow-lg border border-white/20 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search consultations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <span className="font-paragraph text-secondary-foreground/70 text-sm">
                  {filteredConsultations.length} of {consultations.length} consultations
                </span>
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  className="border-white/20 text-secondary-foreground hover:bg-white/10"
                  disabled={filteredConsultations.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="bg-black shadow-lg border border-white/20">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center">
                <p className="font-paragraph text-secondary-foreground/70">Loading consultations...</p>
              </div>
            ) : filteredConsultations.length === 0 ? (
              <div className="p-8 text-center">
                <Calendar className="w-12 h-12 text-secondary-foreground/30 mx-auto mb-4" />
                <p className="font-paragraph text-secondary-foreground/70">
                  {searchTerm ? 'No consultations match your search.' : 'No consultation requests yet.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-secondary-foreground font-paragraph font-semibold">Date</TableHead>
                      <TableHead className="text-secondary-foreground font-paragraph font-semibold">Name</TableHead>
                      <TableHead className="text-secondary-foreground font-paragraph font-semibold">Email</TableHead>
                      <TableHead className="text-secondary-foreground font-paragraph font-semibold">Phone</TableHead>
                      <TableHead className="text-secondary-foreground font-paragraph font-semibold">Investment Amount</TableHead>
                      <TableHead className="text-secondary-foreground font-paragraph font-semibold">Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredConsultations.map((consultation) => (
                      <TableRow key={consultation._id} className="border-white/20 hover:bg-white/5">
                        <TableCell className="font-paragraph text-secondary-foreground/90">
                          {consultation.submissionDate || consultation._createdDate
                            ? format(new Date(consultation.submissionDate || consultation._createdDate || ''), 'MMM dd, yyyy HH:mm')
                            : 'N/A'}
                        </TableCell>
                        <TableCell className="font-paragraph text-secondary-foreground/90">
                          {consultation.firstName} {consultation.lastName}
                        </TableCell>
                        <TableCell className="font-paragraph text-secondary-foreground/90">
                          <a 
                            href={`mailto:${consultation.email}`}
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            {consultation.email}
                          </a>
                        </TableCell>
                        <TableCell className="font-paragraph text-secondary-foreground/90">
                          {consultation.phone ? (
                            <a 
                              href={`tel:${consultation.phone}`}
                              className="text-blue-400 hover:text-blue-300 underline"
                            >
                              {consultation.phone}
                            </a>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell className="font-paragraph text-secondary-foreground/90">
                          {consultation.investmentAmount || 'Not specified'}
                        </TableCell>
                        <TableCell className="font-paragraph text-secondary-foreground/90 max-w-xs">
                          <div className="truncate" title={consultation.message || ''}>
                            {consultation.message || 'No message'}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}