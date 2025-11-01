import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Search, Filter, RefreshCw } from 'lucide-react';

// Mock data for Nifty 500 stocks
const mockNifty500Stocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2456.75, change: 23.45, changePercent: 0.96, volume: '2.3M', marketCap: '16.6L Cr' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3789.20, change: -45.30, changePercent: -1.18, volume: '1.8M', marketCap: '13.8L Cr' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1654.85, change: 12.75, changePercent: 0.78, volume: '3.1M', marketCap: '12.5L Cr' },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1456.30, change: -8.90, changePercent: -0.61, volume: '2.7M', marketCap: '6.1L Cr' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 987.45, change: 15.60, changePercent: 1.61, volume: '4.2M', marketCap: '6.9L Cr' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', price: 2345.80, change: -12.35, changePercent: -0.52, volume: '1.2M', marketCap: '5.5L Cr' },
  { symbol: 'ITC', name: 'ITC Ltd', price: 456.70, change: 8.25, changePercent: 1.84, volume: '5.8M', marketCap: '5.7L Cr' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 623.90, change: -7.80, changePercent: -1.23, volume: '6.3M', marketCap: '5.6L Cr' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 1234.55, change: 18.90, changePercent: 1.55, volume: '2.9M', marketCap: '6.8L Cr' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1876.40, change: -22.15, changePercent: -1.17, volume: '1.9M', marketCap: '3.7L Cr' },
];

// Mock data for option chain
const mockOptionChain = [
  { strike: 24000, callOI: 45230, callVolume: 1250, callLTP: 156.75, putLTP: 89.30, putVolume: 980, putOI: 38450 },
  { strike: 24100, callOI: 52340, callVolume: 1890, callLTP: 134.20, putLTP: 102.85, putVolume: 1340, putOI: 41230 },
  { strike: 24200, callOI: 67890, callVolume: 2340, callLTP: 112.45, putLTP: 118.90, putVolume: 1780, putOI: 45670 },
  { strike: 24300, callOI: 78450, callVolume: 3120, callLTP: 92.30, putLTP: 136.75, putVolume: 2230, putOI: 52340 },
  { strike: 24400, callOI: 89230, callVolume: 4560, callLTP: 74.85, putLTP: 156.20, putVolume: 2890, putOI: 58920 },
  { strike: 24500, callOI: 95670, callVolume: 5890, callLTP: 59.40, putLTP: 178.65, putVolume: 3450, putOI: 64780 },
  { strike: 24600, callOI: 87340, callVolume: 4230, callLTP: 46.75, putLTP: 203.90, putVolume: 2980, putOI: 59340 },
  { strike: 24700, callOI: 76890, callVolume: 3120, callLTP: 36.20, putLTP: 231.45, putVolume: 2340, putOI: 52670 },
];

export default function StockMarketPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('symbol');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedExpiry, setSelectedExpiry] = useState('29-NOV-2024');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const filteredStocks = mockNifty500Stocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'gainers') return matchesSearch && stock.change > 0;
    if (filterBy === 'losers') return matchesSearch && stock.change < 0;
    return matchesSearch;
  });

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    switch (sortBy) {
      case 'price': return b.price - a.price;
      case 'change': return b.change - a.change;
      case 'volume': return parseFloat(b.volume) - parseFloat(a.volume);
      default: return a.symbol.localeCompare(b.symbol);
    }
  });

  const refreshData = () => {
    setLastUpdated(new Date());
    // In a real app, this would fetch fresh data
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-secondary border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-[120rem] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-white">Stock Market</h1>
              <p className="text-secondary-foreground-alt mt-1">Live market data and option chain analysis</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-secondary-foreground-alt">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button 
                onClick={refreshData}
                variant="outline" 
                size="sm"
                className="border-buttonborder text-white hover:bg-gray-800"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[120rem] mx-auto px-6 py-8">
        <Tabs defaultValue="watchlist" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="watchlist" className="text-white data-[state=active]:bg-gray-700">
              Nifty 500 Watchlist
            </TabsTrigger>
            <TabsTrigger value="options" className="text-white data-[state=active]:bg-gray-700">
              Option Chain
            </TabsTrigger>
          </TabsList>

          {/* Nifty 500 Watchlist Tab */}
          <TabsContent value="watchlist" className="space-y-6">
            {/* Controls */}
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search stocks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white w-64"
                      />
                    </div>
                    
                    <Select value={filterBy} onValueChange={setFilterBy}>
                      <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Stocks</SelectItem>
                        <SelectItem value="gainers">Gainers</SelectItem>
                        <SelectItem value="losers">Losers</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="symbol">Symbol</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="change">Change</SelectItem>
                        <SelectItem value="volume">Volume</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">24,567.89</div>
                      <div className="text-sm text-secondary-foreground-alt">Nifty 50</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">11,234.56</div>
                      <div className="text-sm text-secondary-foreground-alt">Nifty 500</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock Table */}
            <Card className="bg-secondary border-gray-800">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800 hover:bg-gray-800">
                        <TableHead className="text-white font-semibold">Symbol</TableHead>
                        <TableHead className="text-white font-semibold">Company Name</TableHead>
                        <TableHead className="text-white font-semibold text-right">Price (₹)</TableHead>
                        <TableHead className="text-white font-semibold text-right">Change</TableHead>
                        <TableHead className="text-white font-semibold text-right">Change %</TableHead>
                        <TableHead className="text-white font-semibold text-right">Volume</TableHead>
                        <TableHead className="text-white font-semibold text-right">Market Cap</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedStocks.map((stock) => (
                        <TableRow key={stock.symbol} className="border-gray-800 hover:bg-gray-800">
                          <TableCell className="font-mono font-semibold text-white">
                            {stock.symbol}
                          </TableCell>
                          <TableCell className="text-secondary-foreground-alt">
                            {stock.name}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-white">
                            ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className={`flex items-center justify-end ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {stock.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                              ₹{Math.abs(stock.change).toFixed(2)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant={stock.changePercent >= 0 ? "default" : "destructive"} 
                                   className={stock.changePercent >= 0 ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-secondary-foreground-alt">
                            {stock.volume}
                          </TableCell>
                          <TableCell className="text-right text-secondary-foreground-alt">
                            {stock.marketCap}
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
            {/* Option Chain Controls */}
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Option Chain - NIFTY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center">
                  <div>
                    <label className="text-sm text-secondary-foreground-alt mb-2 block">Expiry Date</label>
                    <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
                      <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="29-NOV-2024">29-NOV-2024</SelectItem>
                        <SelectItem value="06-DEC-2024">06-DEC-2024</SelectItem>
                        <SelectItem value="13-DEC-2024">13-DEC-2024</SelectItem>
                        <SelectItem value="20-DEC-2024">20-DEC-2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="ml-auto">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">24,456.75</div>
                      <div className="text-sm text-secondary-foreground-alt">Current Nifty Price</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Option Chain Table */}
            <Card className="bg-secondary border-gray-800">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-center text-green-400 font-semibold" colSpan={3}>CALLS</TableHead>
                        <TableHead className="text-center text-white font-semibold">STRIKE</TableHead>
                        <TableHead className="text-center text-red-400 font-semibold" colSpan={3}>PUTS</TableHead>
                      </TableRow>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-green-400 text-right">OI</TableHead>
                        <TableHead className="text-green-400 text-right">Volume</TableHead>
                        <TableHead className="text-green-400 text-right">LTP</TableHead>
                        <TableHead className="text-white text-center">Price</TableHead>
                        <TableHead className="text-red-400 text-left">LTP</TableHead>
                        <TableHead className="text-red-400 text-left">Volume</TableHead>
                        <TableHead className="text-red-400 text-left">OI</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockOptionChain.map((option) => (
                        <TableRow key={option.strike} className="border-gray-800 hover:bg-gray-800">
                          <TableCell className="text-right text-secondary-foreground-alt">
                            {option.callOI.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-secondary-foreground-alt">
                            {option.callVolume.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-green-400">
                            ₹{option.callLTP.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-center font-bold text-white bg-gray-700">
                            {option.strike.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-left font-semibold text-red-400">
                            ₹{option.putLTP.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-left text-secondary-foreground-alt">
                            {option.putVolume.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-left text-secondary-foreground-alt">
                            {option.putOI.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Option Chain Legend */}
            <Card className="bg-secondary border-gray-800">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Legend</h4>
                    <div className="space-y-1 text-secondary-foreground-alt">
                      <div>OI = Open Interest</div>
                      <div>LTP = Last Traded Price</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Call Options</h4>
                    <div className="text-green-400 text-sm">
                      Right to buy at strike price
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Put Options</h4>
                    <div className="text-red-400 text-sm">
                      Right to sell at strike price
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}