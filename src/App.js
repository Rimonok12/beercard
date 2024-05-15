// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeerList from './BeerList';

const App = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("Hello")
    const fetchBeers = async () => {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        setBeers(response.data);
      } catch (error) {
        console.error('Error fetching beers: ', error);
      }
    };

    fetchBeers();
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search beers..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <BeerList beers={filteredBeers} />
    </div>
  );
};

export default App;
