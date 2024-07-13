import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { setSymbol } from '../store';
import axios from 'axios';
import Modal from 'react-modal';

const HomePage: React.FC = () => {
  const symbol = useAppSelector(state => state.app.symbol);
  const dispatch = useAppDispatch();
  const [prices, setPrices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#__next');

    const fetchPrices = async () => {
      const response = await axios.get(`/api/getPrices?symbol=${symbol}`);
      setPrices(response.data);
    };

    const interval = setInterval(fetchPrices, 5000); // Fetch new data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [symbol]);

  return (
    <div>
      <h1>Real-time Prices for {symbol}</h1>
      <button onClick={() => setIsOpen(true)}>Change Symbol</button>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price: any) => (
            <tr key={price._id}>
              <td>{price.price}</td>
              <td>{new Date(price.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Select Symbol"
      >
        <h2>Select Symbol</h2>
        <button onClick={() => { dispatch(setSymbol('GOOG')); setIsOpen(false); }}>GOOG</button>
        <button onClick={() => { dispatch(setSymbol('bitcoin')); setIsOpen(false); }}>BTC</button>
        <button onClick={() => { dispatch(setSymbol('ethereum')); setIsOpen(false); }}>ETH</button>
        <button onClick={() => { dispatch(setSymbol('AAPL')); setIsOpen(false); }}>AAPL</button>
        <button onClick={() => { dispatch(setSymbol('AMZN')); setIsOpen(false); }}>AMZN</button>
      </Modal>
    </div>
  );
};

export default HomePage;
