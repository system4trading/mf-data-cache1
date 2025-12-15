/**
 * Fetch Nifty 50 historical data from Yahoo Finance
 * Output: nifty/nifty50.json
 */

import fs from "fs";
import fetch from "node-fetch";

const SYMBOL = "^NSEI"; // Nifty 50
const START = Math.floor(new Date("2010-01-01").getTime() / 1000);
const END = Math.floor(Date.now() / 1000);

const URL = `https://query1.finance.yahoo.com/v7/finance/download/${encodeURIComponent(
  SYMBOL
)}?period1=${START}&period2=${END}&interval=1d&events=history&includeAdjustedClose=true`;

async function fetchNifty() {
  console.log("Fetching Nifty 50 data...");

  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error("Failed to fetch Nifty data");
  }

  const csv = await res.text();
  const lines = csv.trim().split("\n");
  const headers = lines.shift().split(",");

  const data = lines
    .map(line => {
      const cols = line.split(",");
      const obj = {};
      headers.forEach((h, i) => (obj[h] = cols[i]));
      return {
        date: obj.Date,
        close: Number(obj["Adj Close"])
      };
    })
    .filter(d => !isNaN(d.close));

  fs.mkdirSync("nifty", { recursive: true });
  fs.writeFileSync(
    "nifty/nifty50.json",
    JSON.stringify(data, null, 2)
  );

  console.log(`Saved ${data.length} Nifty records`);
}

fetchNifty().catch(err => {
  console.error(err);
  process.exit(1);
});

