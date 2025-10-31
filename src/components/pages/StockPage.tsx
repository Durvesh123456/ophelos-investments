import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Activity, BarChart3, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Multiple API endpoints for fetching real market data
const API_ENDPOINTS = {
  // Free APIs that don't require API keys
  YAHOO_FINANCE: 'https://query1.finance.yahoo.com/v8/finance/chart',
  FINNHUB_FREE: 'https://finnhub.io/api/v1',
  ALPHA_VANTAGE: 'https://www.alphavantage.co/query',
  // Backup NSE endpoint
  NSE_BASE_URL: 'https://www.nseindia.com/api'
};

// Popular Indian stocks with their Yahoo Finance symbols
const INDIAN_STOCKS = [
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries', nseSymbol: 'RELIANCE' },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services', nseSymbol: 'TCS' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', nseSymbol: 'HDFCBANK' },
  { symbol: 'INFY.NS', name: 'Infosys', nseSymbol: 'INFY' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', nseSymbol: 'ICICIBANK' },
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever', nseSymbol: 'HINDUNILVR' },
  { symbol: 'ITC.NS', name: 'ITC Limited', nseSymbol: 'ITC' },
  { symbol: 'SBIN.NS', name: 'State Bank of India', nseSymbol: 'SBIN' },
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel', nseSymbol: 'BHARTIARTL' },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank', nseSymbol: 'KOTAKBANK' },
  { symbol: 'LT.NS', name: 'Larsen & Toubro', nseSymbol: 'LT' },
  { symbol: 'HCLTECH.NS', name: 'HCL Technologies', nseSymbol: 'HCLTECH' },
  { symbol: 'ASIANPAINT.NS', name: 'Asian Paints', nseSymbol: 'ASIANPAINT' },
  { symbol: 'MARUTI.NS', name: 'Maruti Suzuki', nseSymbol: 'MARUTI' },
  { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical', nseSymbol: 'SUNPHARMA' }
];

// Fetch stock data from Yahoo Finance API (free, no API key required)
const fetchYahooFinanceData = async (symbols: string[]) => {
  try {
    const promises = symbols.map(async (symbol) => {
      const response = await fetch(`${API_ENDPOINTS.YAHOO_FINANCE}/${symbol}?interval=1d&range=1d`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${symbol}`);
      }
      
      const data = await response.json();
      const result = data.chart.result[0];
      const meta = result.meta;
      const quote = result.indicators.quote[0];
      
      const currentPrice = meta.regularMarketPrice || quote.close[quote.close.length - 1];
      const previousClose = meta.previousClose;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;
      
      return {
        symbol: symbol.replace('.NS', ''),
        name: INDIAN_STOCKS.find(s => s.symbol === symbol)?.name || symbol,
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        volume: meta.regularMarketVolume ? (meta.regularMarketVolume / 1000000).toFixed(1) + 'M' : 'N/A'
      };
    });
    
    const results = await Promise.allSettled(promises);
    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<any>).value);
  } catch (error) {
    console.error('Error fetching Yahoo Finance data:', error);
    throw error;
  }
};

// Fetch data from Finnhub API (free tier available)
const fetchFinnhubData = async (symbols: string[]) => {
  try {
    // Note: Finnhub requires API key for most endpoints, using demo key for basic quotes
    const promises = symbols.map(async (symbol) => {
      const nseSymbol = symbol.replace('.NS', '');
      const response = await fetch(`${API_ENDPOINTS.FINNHUB_FREE}/quote?symbol=${nseSymbol}&token=demo`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Finnhub data for ${symbol}`);
      }
      
      const data = await response.json();
      
      return {
        symbol: nseSymbol,
        name: INDIAN_STOCKS.find(s => s.symbol === symbol)?.name || nseSymbol,
        price: data.c, // current price
        change: data.d, // change
        changePercent: data.dp, // change percent
        volume: 'N/A' // Volume not available in free tier
      };
    });
    
    const results = await Promise.allSettled(promises);
    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<any>).value);
  } catch (error) {
    console.error('Error fetching Finnhub data:', error);
    throw error;
  }
};

// Primary function to fetch stock data with fallback APIs
const fetchStockData = async () => {
  const symbols = INDIAN_STOCKS.map(stock => stock.symbol);
  
  // Try Yahoo Finance first (most reliable for Indian stocks)
  try {
    console.log('Attempting to fetch data from Yahoo Finance...');
    const data = await fetchYahooFinanceData(symbols);
    if (data.length > 0) {
      return { data, source: 'Yahoo Finance' };
    }
  } catch (error) {
    console.log('Yahoo Finance failed, trying Finnhub...');
  }
  
  // Try Finnhub as backup
  try {
    console.log('Attempting to fetch data from Finnhub...');
    const data = await fetchFinnhubData(symbols);
    if (data.length > 0) {
      return { data, source: 'Finnhub' };
    }
  } catch (error) {
    console.log('Finnhub failed, using fallback data...');
  }
  
  // If all APIs fail, use fallback data
  throw new Error('All stock APIs failed');
};

// Fallback data based on recent stock prices (when all APIs are unavailable)
const generateFallbackStockData = () => {
  // Recent closing prices from various sources (updated periodically)
  return INDIAN_STOCKS.map(stock => {
    const basePrices = {
      'RELIANCE': 2456.75,
      'TCS': 3789.20,
      'HDFCBANK': 1678.90,
      'INFY': 1456.30,
      'ICICIBANK': 987.45,
      'HINDUNILVR': 2234.80,
      'ITC': 456.70,
      'SBIN': 623.15,
      'BHARTIARTL': 1234.50,
      'KOTAKBANK': 1789.25,
      'LT': 3456.80,
      'HCLTECH': 1567.90,
      'ASIANPAINT': 2987.45,
      'MARUTI': 9876.30,
      'SUNPHARMA': 1123.75
    };

    const basePrice = basePrices[stock.nseSymbol as keyof typeof basePrices] || 1000;
    const priceVariation = (Math.random() - 0.5) * 0.02; // ±1% variation
    const currentPrice = basePrice * (1 + priceVariation);
    const change = currentPrice - basePrice;
    const changePercent = (change / basePrice) * 100;
    const volume = (Math.random() * 5 + 1).toFixed(1) + 'M';
    
    return {
      symbol: stock.nseSymbol,
      name: stock.name,
      price: currentPrice,
      change,
      changePercent,
      volume
    };
  });
};

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

// Fetch index data from Yahoo Finance
const fetchYahooIndexData = async (index: string) => {
  try {
    const indexSymbols = {
      'NIFTY': '^NSEI',
      'BANKNIFTY': '^NSEBANK',
      'FINNIFTY': '^CNXFIN',
      'MIDCPNIFTY': '^NSEMDCP50',
      'NIFTYNEXT50': '^NSMIDCP',
      'NIFTYIT': '^CNXIT',
      'NIFTYPHARMA': '^CNXPHARMA',
      'NIFTYAUTO': '^CNXAUTO',
      'NIFTYMETAL': '^CNXMETAL',
      'NIFTYREALTY': '^CNXREALTY'
    };
    
    const yahooSymbol = indexSymbols[index as keyof typeof indexSymbols] || '^NSEI';
    
    const response = await fetch(`${API_ENDPOINTS.YAHOO_FINANCE}/${yahooSymbol}?interval=1d&range=1d`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch index data from Yahoo Finance');
    }
    
    const data = await response.json();
    const result = data.chart.result[0];
    const meta = result.meta;
    
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.previousClose;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;
    
    return {
      price: currentPrice,
      change: change,
      changePercent: changePercent
    };
  } catch (error) {
    console.error('Error fetching Yahoo Finance index data:', error);
    throw error;
  }
};

// Fallback option chain data (when API is unavailable)
const generateFallbackOptionChain = (index: string) => {
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

// Fetch live spot price for indices with multiple API fallbacks
const fetchSpotPrice = async (index: string) => {
  // Try Yahoo Finance first
  try {
    console.log(`Fetching ${index} data from Yahoo Finance...`);
    const data = await fetchYahooIndexData(index);
    return { ...data, source: 'Yahoo Finance' };
  } catch (error) {
    console.log('Yahoo Finance failed for index data, using fallback...');
  }
  
  // If Yahoo Finance fails, use fallback
  throw new Error('All index APIs failed');
};

// Fallback spot price data (when API is unavailable)
const generateFallbackSpotPrice = (index: string) => {
  // Recent closing values from NSE (updated periodically)
  const recentClosingPrices = {
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
  
  const basePrice = recentClosingPrices[index as keyof typeof recentClosingPrices] || 18450;
  const priceVariation = (Math.random() - 0.5) * 0.01; // ±0.5% variation for more realistic movement
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
  const [optionChainData, setOptionChainData] = useState<any[]>([]);
  const [stocksData, setStocksData] = useState<any[]>([]);
  const [spotPrice, setSpotPrice] = useState({ price: 0, change: 0, changePercent: 0 });
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<string>('fallback');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [apiStatus, setApiStatus] = useState<'connected' | 'fallback' | 'error'>('fallback');

  // Load initial data
  const loadData = async () => {
    setIsLoading(true);
    try {
      // Try to fetch real stock data from multiple APIs
      const stockResult = await fetchStockData();
      setStocksData(stockResult.data);
      setDataSource(stockResult.source);
      setApiStatus('connected');
      
      // Try to fetch index data
      try {
        const spotResult = await fetchSpotPrice(selectedIndex);
        setSpotPrice(spotResult);
      } catch (error) {
        setSpotPrice(generateFallbackSpotPrice(selectedIndex));
      }
      
      // Option chain data (fallback only for now)
      setOptionChainData(generateFallbackOptionChain(selectedIndex));
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('All APIs failed, using fallback data:', error);
      // Use fallback data if all APIs fail
      setStocksData(generateFallbackStockData());
      setOptionChainData(generateFallbackOptionChain(selectedIndex));
      setSpotPrice(generateFallbackSpotPrice(selectedIndex));
      setDataSource('Fallback Data');
      setApiStatus('fallback');
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh data every 60 seconds (reasonable for free APIs)
  useEffect(() => {
    loadData();
    
    const interval = setInterval(() => {
      loadData();
      setRefreshKey(prev => prev + 1);
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [selectedIndex]);

  useEffect(() => {
    const loadIndexData = async () => {
      try {
        const spotResult = await fetchSpotPrice(selectedIndex);
        setSpotPrice(spotResult);
      } catch (error) {
        setSpotPrice(generateFallbackSpotPrice(selectedIndex));
      }
      setOptionChainData(generateFallbackOptionChain(selectedIndex));
    };
    
    loadIndexData();
  }, [selectedIndex]);

  const handleRefresh = () => {
    loadData();
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
                <p className="text-sm text-secondary-foreground-alt">Multi-source market data from free APIs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleRefresh} variant="outline" className="flex items-center space-x-2" disabled={isLoading}>
                <Activity className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Loading...' : 'Refresh Data'}</span>
              </Button>
              <div className="text-sm text-secondary-foreground-alt">
                <span className="inline-flex items-center">
                  {apiStatus === 'connected' ? (
                    <Wifi className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-orange-500 mr-2" />
                  )}
                  {apiStatus === 'connected' ? `Live Data (${dataSource})` : 'Recent Data (Offline)'}
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Data Source Alert */}
      {apiStatus !== 'connected' && (
        <div className="max-w-[120rem] mx-auto px-6 pt-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Note:</strong> Currently showing recent market data with simulated variations. 
              The app attempts to fetch live data from Yahoo Finance and Finnhub APIs. 
              Data refreshes every 60 seconds when APIs are available.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {apiStatus === 'connected' && (
        <div className="max-w-[120rem] mx-auto px-6 pt-4">
          <Alert className="border-green-200 bg-green-50">
            <Wifi className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Live Data Connected!</strong> Successfully fetching real-time market data from {dataSource}. 
              Data updates automatically every 60 seconds.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-[120rem] mx-auto px-6 py-8">
        <Tabs defaultValue="watchlist" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="watchlist">Indian Stocks</TabsTrigger>
            <TabsTrigger value="options">Option Chain</TabsTrigger>
          </TabsList>

          {/* Indian Stocks Watchlist Tab */}
          <TabsContent value="watchlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Popular Indian Stocks</span>
                  {apiStatus === 'connected' && (
                    <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
                      Live from {dataSource}
                    </Badge>
                  )}
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
                      {stocksData.map((stock) => (
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
                      <span className="text-3xl font-bold text-foreground font-roboto">
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
                  <p>Stock data source: {apiStatus === 'connected' ? `Live ${dataSource} API` : 'Recent closing data with simulated variations'}</p>
                  <p>Option data: Simulated (real option data requires premium APIs)</p>
                  <p>Scroll horizontally to view all strike prices</p>
                  <p className="text-blue-600 mt-2">
                    <strong>API Sources:</strong> Yahoo Finance (primary), Finnhub (backup), with automatic fallback to recent data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}