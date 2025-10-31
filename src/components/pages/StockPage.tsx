import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';

// Mock data for Nifty 50 stocks
const nifty50Stocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 23.45, changePercent: 0.96, volume: '2.3M' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3789.20, change: -12.30, changePercent: -0.32, volume: '1.8M' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.90, change: 15.60, changePercent: 0.94, volume: '3.1M' },
  { symbol: 'INFY', name: 'Infosys', price: 1456.30, change: 8.75, changePercent: 0.61, volume: '2.7M' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 987.45, change: -5.20, changePercent: -0.52, volume: '4.2M' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2234.80, change: 18.90, changePercent: 0.85, volume: '1.5M' },
  { symbol: 'ITC', name: 'ITC Limited', price: 456.70, change: 3.25, changePercent: 0.72, volume: '5.8M' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 623.15, change: -8.45, changePercent: -1.34, volume: '6.2M' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1234.50, change: 12.30, changePercent: 1.01, volume: '2.9M' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1789.25, change: 7.85, changePercent: 0.44, volume: '1.9M' },
  { symbol: 'LT', name: 'Larsen & Toubro', price: 3456.80, change: 25.40, changePercent: 0.74, volume: '1.2M' },
  { symbol: 'HCLTECH', name: 'HCL Technologies', price: 1567.90, change: -4.60, changePercent: -0.29, volume: '2.1M' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 2987.45, change: 34.20, changePercent: 1.16, volume: '0.8M' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 9876.30, change: -45.80, changePercent: -0.46, volume: '0.6M' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1123.75, change: 9.85, changePercent: 0.88, volume: '2.4M' }
];

// NSE indices for option chain
const nseIndices = [
  { value: 'NIFTY', label: 'NIFTY 50' },
  { value: 'BANKNIFTY', label: 'BANK NIFTY' },
  { value: 'FINNIFTY', label: 'FIN NIFTY' },
  { value: 'MIDCPNIFTY', label: 'MIDCAP NIFTY' },
  { value: 'NIFTYNEXT50', label: 'NIFTY NEXT 50' },
  { value: 'NIFTYIT', label: 'NIFTY IT' },
  { value: 'NIFTYPHARMA', label: 'NIFTY PHARMA' },
  { value: 'NIFTYAUTO', label: 'NIFTY AUTO' },
  { value: 'NIFTYMETAL', label: 'NIFTY METAL' },
  { value: 'NIFTYREALTY', label: 'NIFTY REALTY' }
];

// Mock option chain data
const generateOptionChain = (index: string) => {
  const strikes = [18000, 18100, 18200, 18300, 18400, 18500, 18600, 18700, 18800, 18900, 19000];
  return strikes.map(strike => ({
    strike,
    callOI: Math.floor(Math.random() * 100000) + 10000,
    callVolume: Math.floor(Math.random() * 50000) + 5000,
    callLTP: (Math.random() * 200 + 50).toFixed(2),
    callChange: (Math.random() * 20 - 10).toFixed(2),
    putOI: Math.floor(Math.random() * 100000) + 10000,
    putVolume: Math.floor(Math.random() * 50000) + 5000,
    putLTP: (Math.random() * 200 + 50).toFixed(2),
    putChange: (Math.random() * 20 - 10).toFixed(2)
  }));
};

export default function StockPage() {
  const [selectedIndex, setSelectedIndex] = useState('NIFTY');
  const [optionChainData, setOptionChainData] = useState(generateOptionChain('NIFTY'));
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setOptionChainData(generateOptionChain(selectedIndex));
  }, [selectedIndex]);

  const handleRefresh = () => {
    setOptionChainData(generateOptionChain(selectedIndex));
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-[120rem] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">Stock Market</h1>
                <p className="text-sm text-secondary-foreground-alt">Live market data and option chains</p>
              </div>
            </div>
            <Button onClick={handleRefresh} variant="outline" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Refresh Data</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[120rem] mx-auto px-6 py-8">
        <Tabs defaultValue="watchlist" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="watchlist">Nifty 50 Watchlist</TabsTrigger>
            <TabsTrigger value="options">Option Chain</TabsTrigger>
          </TabsList>

          {/* Nifty 50 Watchlist Tab */}
          <TabsContent value="watchlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Nifty 50 Stocks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead className="text-right">Price (₹)</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                        <TableHead className="text-right">Change %</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {nifty50Stocks.map((stock) => (
                        <TableRow key={stock.symbol} className="hover:bg-secondary/50">
                          <TableCell className="font-medium">{stock.symbol}</TableCell>
                          <TableCell>{stock.name}</TableCell>
                          <TableCell className="text-right font-medium">
                            ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className={`flex items-center justify-end space-x-1 ${
                              stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stock.change >= 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              <span>₹{Math.abs(stock.change).toFixed(2)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge 
                              variant={stock.changePercent >= 0 ? "default" : "destructive"}
                              className={stock.changePercent >= 0 ? "bg-green-100 text-green-800" : ""}
                            >
                              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-secondary-foreground-alt">
                            {stock.volume}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Option Chain Tab */}
          <TabsContent value="options" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>Option Chain</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-foreground">Select Index:</label>
                    <Select value={selectedIndex} onValueChange={setSelectedIndex}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select an index" />
                      </SelectTrigger>
                      <SelectContent>
                        {nseIndices.map((index) => (
                          <SelectItem key={index.value} value={index.value}>
                            {index.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center" colSpan={4}>CALL OPTIONS</TableHead>
                        <TableHead className="text-center">STRIKE</TableHead>
                        <TableHead className="text-center" colSpan={4}>PUT OPTIONS</TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-right">OI</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                        <TableHead className="text-right">LTP</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                        <TableHead className="text-center font-bold">Strike Price</TableHead>
                        <TableHead className="text-left">Change</TableHead>
                        <TableHead className="text-left">LTP</TableHead>
                        <TableHead className="text-left">Volume</TableHead>
                        <TableHead className="text-left">OI</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {optionChainData.map((option) => (
                        <TableRow key={option.strike} className="hover:bg-secondary/50">
                          <TableCell className="text-right text-sm">
                            {option.callOI.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            {option.callVolume.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ₹{option.callLTP}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={parseFloat(option.callChange) >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {parseFloat(option.callChange) >= 0 ? '+' : ''}{option.callChange}
                            </span>
                          </TableCell>
                          <TableCell className="text-center font-bold bg-secondary/30">
                            {option.strike}
                          </TableCell>
                          <TableCell className="text-left">
                            <span className={parseFloat(option.putChange) >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {parseFloat(option.putChange) >= 0 ? '+' : ''}{option.putChange}
                            </span>
                          </TableCell>
                          <TableCell className="text-left font-medium">
                            ₹{option.putLTP}
                          </TableCell>
                          <TableCell className="text-left text-sm">
                            {option.putVolume.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-left text-sm">
                            {option.putOI.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 text-xs text-secondary-foreground-alt">
                  <p>OI = Open Interest, LTP = Last Traded Price</p>
                  <p>Data refreshes every few seconds during market hours</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}