// lib/poll_data.ts

import { fetchData } from "@pages/api/fetchData";

const fetchInterval = 5000; // 5 seconds

const startFetching = () => {
  console.log("Fetching data ...");
  fetchData(); // Initial fetch

  setInterval(() => {
    console.log("Fetching data ...");
    fetchData(); // Polling interval
  }, fetchInterval);
};

startFetching();
