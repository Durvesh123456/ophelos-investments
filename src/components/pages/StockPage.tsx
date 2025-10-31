import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';

// Mock data for Nifty 50 stocks - with live price simulation
const generateNifty50Stocks = () => [
  { symbol: 'RELIANCE', name: 'Reliance Industries', basePrice: 2456.75 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', basePrice: 3789.20 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', basePrice: 1678.90 },
  { symbol: 'INFY', name: 'Infosys', basePrice: 1456.30 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', basePrice: 987.45 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', basePrice: 2234.80 },
  { symbol: 'ITC', name: 'ITC Limited', basePrice: 456.70 },
  { symbol: 'SBIN', name: 'State Bank of India', basePrice: 623.15 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', basePrice: 1234.50 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', basePrice: 1789.25 },
  { symbol: 'LT', name: 'Larsen & Toubro', basePrice: 3456.80 },
  { symbol: 'HCLTECH', name: 'HCL Technologies', basePrice: 1567.90 },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', basePrice: 2987.45 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', basePrice: 9876.30 },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', basePrice: 1123.75 }
].map(stock => {
  const priceVariation = (Math.random() - 0.5) * 0.05; // ±2.5% variation
  const currentPrice = stock.basePrice * (1 + priceVariation);
  const change = currentPrice - stock.basePrice;
  const changePercent = (change / stock.basePrice) * 100;
  const volume = (Math.random() * 5 + 1).toFixed(1) + 'M';
  
  return {
    ...stock,
    price: currentPrice,
    change,
    changePercent,
    volume
  };
});

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

// Mock option chain data with more strike prices for horizontal scroll
const generateOptionChain = (index: string) => {
  const strikes = [17000, 17100, 17200, 17300, 17400, 17500, 17600, 17700, 17800, 17900, 18000, 18100, 18200, 18300, 18400, 18500, 18600, 18700, 18800, 18900, 19000, 19100, 19200, 19300, 19400, 19500, 19600, 19700, 19800, 19900, 20000];
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

// Generate live spot price for indices
const generateSpotPrice = (index: string) => {
  const basePrices = {
    'NIFTY': 18450,
    'BANKNIFTY': 42500,
    'FINNIFTY': 19800,
    'MIDCPNIFTY': 8950,
    'NIFTYNEXT50': 42300,
    'NIFTYIT': 28500,
    'NIFTYPHARMA': 15200,
    'NIFTYAUTO': 14800,
    'NIFTYMETAL': 6750,
    'NIFTYREALTY': 4200
  };
  
  const basePrice = basePrices[index as keyof typeof basePrices] || 18450;
  const priceVariation = (Math.random() - 0.5) * 0.02; // ±1% variation
  const currentPrice = basePrice * (1 + priceVariation);
  const change = currentPrice - basePrice;
  const changePercent = (change / basePrice) * 100;
  
  return {
    price: currentPrice,
    change,
    changePercent
  };
};

export default function StockPage() {
  const [selectedIndex, setSelectedIndex] = useState('NIFTY');
  const [optionChainData, setOptionChainData] = useState(generateOptionChain('NIFTY'));
  const [nifty50Stocks, setNifty50Stocks] = useState(generateNifty50Stocks());
  const [spotPrice, setSpotPrice] = useState(generateSpotPrice('NIFTY'));
  const [refreshKey, setRefreshKey] = useState(0);

  // Auto-refresh data every 5 seconds to simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOptionChainData(generateOptionChain(selectedIndex));
      setNifty50Stocks(generateNifty50Stocks());
      setSpotPrice(generateSpotPrice(selectedIndex));
      setRefreshKey(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedIndex]);

  useEffect(() => {
    setOptionChainData(generateOptionChain(selectedIndex));
    setSpotPrice(generateSpotPrice(selectedIndex));
  }, [selectedIndex]);

  const handleRefresh = () => {
    setOptionChainData(generateOptionChain(selectedIndex));
    setNifty50Stocks(generateNifty50Stocks());
    setSpotPrice(generateSpotPrice(selectedIndex));
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
            <div className="flex items-center space-x-4">
              <Button onClick={handleRefresh} variant="outline" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Refresh Data</span>
              </Button>
              <div className="text-sm text-secondary-foreground-alt">
                <span className="inline-flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Live Updates Every 5s
                </span>
              </div>
            </div>
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
            {/* Live Spot Price Display */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      {nseIndices.find(idx => idx.value === selectedIndex)?.label} Spot Price
                    </h3>
                    <div className="flex items-center justify-center space-x-4">
                      <span className="text-3xl font-heading font-bold text-foreground">
                        ₹{spotPrice.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                      <div className={`flex items-center space-x-1 ${
                        spotPrice.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {spotPrice.change >= 0 ? (
                          <TrendingUp className="h-5 w-5" />
                        ) : (
                          <TrendingDown className="h-5 w-5" />
                        )}
                        <span className="text-lg font-medium">
                          {spotPrice.change >= 0 ? '+' : ''}₹{Math.abs(spotPrice.change).toFixed(2)}
                        </span>
                        <span className="text-lg font-medium">
                          ({spotPrice.changePercent >= 0 ? '+' : ''}{spotPrice.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                  <div className="min-w-[1200px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center sticky left-0 bg-background z-10" colSpan={4}>CALL OPTIONS</TableHead>
                          <TableHead className="text-center sticky left-0 bg-background z-10">STRIKE</TableHead>
                          <TableHead className="text-center sticky right-0 bg-background z-10" colSpan={4}>PUT OPTIONS</TableHead>
                        </TableRow>
                        <TableRow>
                          <TableHead className="text-right min-w-[100px]">OI</TableHead>
                          <TableHead className="text-right min-w-[100px]">Volume</TableHead>
                          <TableHead className="text-right min-w-[100px]">LTP</TableHead>
                          <TableHead className="text-right min-w-[100px]">Change</TableHead>
                          <TableHead className="text-center font-bold min-w-[120px] sticky left-0 bg-background z-10 border-x-2 border-primary/20">Strike Price</TableHead>
                          <TableHead className="text-left min-w-[100px]">Change</TableHead>
                          <TableHead className="text-left min-w-[100px]">LTP</TableHead>
                          <TableHead className="text-left min-w-[100px]">Volume</TableHead>
                          <TableHead className="text-left min-w-[100px]">OI</TableHead>
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
                            <TableCell className="text-center font-bold bg-secondary/30 sticky left-0 z-10 border-x-2 border-primary/20">
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
                </div>
                <div className="mt-4 text-xs text-secondary-foreground-alt">
                  <p>OI = Open Interest, LTP = Last Traded Price</p>
                  <p>Data refreshes every few seconds during market hours</p>
                  <p>Scroll horizontally to view all strike prices</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}