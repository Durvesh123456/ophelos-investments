import { Consultations } from '@/entities';
import { format } from 'date-fns';

/**
 * Formats investment amount for CSV export
 */
export const formatInvestmentAmount = (amount: number | undefined): string => {
  if (!amount) return 'Not specified';
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Crore`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} Lakh`;
  return `₹${amount.toLocaleString()}`;
};

/**
 * Formats date for CSV export
 */
export const formatDateForCSV = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  try {
    return format(new Date(date), 'dd/MM/yyyy HH:mm');
  } catch {
    return 'Invalid Date';
  }
};

/**
 * Generates CSV content from consultations array
 */
export const generateCSVContent = (consultations: Consultations[]): string => {
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
      formatDateForCSV(consultation.submissionDate)
    ].join(','))
  ].join('\n');

  return csvContent;
};

/**
 * Downloads CSV file to user's device
 */
export const downloadCSVFile = (csvContent: string, filename: string = 'consultation_responses.csv'): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
};

/**
 * Saves consultation to CSV file (downloads to user's device)
 * This is called automatically when a new consultation is submitted
 */
export const saveConsultationToCSV = async (consultation: Consultations): Promise<void> => {
  try {
    // Import BaseCrudService to fetch all consultations
    const { BaseCrudService } = await import('@/integrations');
    
    // Fetch all consultations to include in the CSV
    const { items } = await BaseCrudService.getAll<Consultations>('consultations');
    
    // Sort by submission date, newest first
    const sortedItems = items.sort((a, b) => {
      const dateA = new Date(a.submissionDate || a._createdDate || 0);
      const dateB = new Date(b.submissionDate || b._createdDate || 0);
      return dateB.getTime() - dateA.getTime();
    });
    
    // Generate CSV content
    const csvContent = generateCSVContent(sortedItems);
    
    // Download the file with timestamp
    const filename = `consultation_responses_${format(new Date(), 'yyyy-MM-dd_HHmmss')}.csv`;
    downloadCSVFile(csvContent, filename);
    
    console.log('CSV file generated and downloaded successfully');
  } catch (error) {
    console.error('Error generating CSV file:', error);
    // Don't throw error - this is a background operation
  }
};
