import { BaseCrudService } from '@/integrations';
import { MutualFunds } from '@/entities';

// Temporary component to check and clean up mutual funds
export default function TempCleanup() {
  const checkFunds = async () => {
    try {
      const { items } = await BaseCrudService.getAll<MutualFunds>('mutualfunds');
      console.log('Current mutual funds:', items);
      console.log('Total funds:', items.length);
      
      // Get the last 8 funds (assuming they were added most recently)
      const fundsToDelete = items.slice(-8);
      console.log('Funds to delete (last 8):', fundsToDelete);
      
      // Delete each fund
      for (const fund of fundsToDelete) {
        if (fund._id) {
          await BaseCrudService.delete('mutualfunds', fund._id);
          console.log(`Deleted fund: ${fund.fundName} (ID: ${fund._id})`);
        }
      }
      
      console.log('Cleanup completed!');
      
      // Check remaining funds
      const { items: remainingItems } = await BaseCrudService.getAll<MutualFunds>('mutualfunds');
      console.log('Remaining funds:', remainingItems.length);
      
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  };

  return (
    <div className="p-8">
      <h1>Mutual Funds Cleanup</h1>
      <button 
        onClick={checkFunds}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Remove Last 8 Sample Funds
      </button>
    </div>
  );
}