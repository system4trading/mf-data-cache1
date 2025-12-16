import fs from "fs";
import fetch from "node-fetch";

const SYMBOL = "^NSEI";
const OUT_DIR = "nifty";
const OUT_FILE = `${OUT_DIR}/nifty50.json`;

// 5 years of daily data
const RANGE = "5y";
const INTERVAL = "1d";

const URL = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
  SYMBOL
)}?range=${RANGE}&interval=${INTERVAL}&events=div%7Csplit`;

async function fetchWithRetry(url, retries = 3) {
  for (let i = 1; i <= retries; i++) {
    try {
      const res = await fetch(url, { timeout: 15000 });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`Retry ${i}/${retries} failed`);
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, 2000 * i));
    }
  }
}

console.log("Fetching Nifty 50 data…");

const json = await fetchWithRetry(URL);

// ---------------- VALIDATION ----------------
if (
  !json.chart ||
  !json.chart.result ||
  !json.chart.result[0]
) {
  throw new Error("Invalid Yahoo response structure");
}

const result = json.chart.result[0];
const timestamps = result.timestamp;
const prices = result.indicators?.quote?.[0]?.close;

if (!timestamps || !prices || timestamps.length !== prices.length) {
  throw new Error("Malformed Nifty price data");
}

// ---------------- NORMALIZATION ----------------
const data = [];

for (let i = 0; i < timestamps.length; i++) {
  const close = prices[i];
  if (close === null || isNaN(close)) continue;

  const date = new Date(timestamps[i] * 1000)
    .toISOString()
    .slice(0, 10);

  data.push({
    date,
    close: Number(close.toFixed(2))
  });
}

// Ensure chronological order
data.sort((a, b) => a.date.localeCompare(b.date));

if (data.length < 1000) {
  throw new Error("Suspiciously small Nifty dataset");
}

// ---------------- WRITE ----------------
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(data, null, 2));

console.log(`Nifty50 updated: ${data.length} records`);
