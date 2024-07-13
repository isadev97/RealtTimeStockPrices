import connectMongo from '../../lib/mongodb';
import Price from '../../models/Price';

const symbols = ['GOOG', 'bitcoin', 'ethereum', 'AAPL', 'AMZN']; // Add more symbols as needed

// Mock data for testing
const mockData: { [key: string]: { usd: number } } = {
  GOOG: { usd: 2700 },
  bitcoin: { usd: 32000 },
  ethereum: { usd: 2000 },
  AAPL: { usd: 145 },
  AMZN: { usd: 3500 }
};

export const fetchData = async () => {
  await connectMongo();

  for (const symbol of symbols) {
    try {
      // Simulate API response with mock data
      const priceData = mockData[symbol]?.usd || 0;
      const newPrice = new Price({
        symbol: symbol,
        price: Math.random() * 1000 || priceData, // Adjust the logic for generating mock data as needed
      });

      await newPrice.save();
      console.log(`Saved ${symbol} price data: ${newPrice.price}`);
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
    }
  }
};
