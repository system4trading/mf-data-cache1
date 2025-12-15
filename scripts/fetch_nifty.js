import fs from "fs";
import fetch from "node-fetch";

const symbol = "^NSEI";
const start = Math.floor(new Date("2010-01-01").getTime() / 1000);
const end = Math.floor(Date.now() / 1000);

const url = `https://query1.finance.yahoo.com/v7/finance/download/${encodeURIComponent(symbol)}?period1=${start}&period2=${end}&interval=1d&events=history`;

const csv = await fetch(url).then(r => r.text());
const rows = csv.split("\n").slice(1);

const data = rows.map(r => {
  const c = r.split(",");
  return { date: c[0], close: Number(c[5]) };
}).filter(d => d.close);

fs.mkdirSync("nifty", { recursive: true });
fs.writeFileSync("nifty/nifty50.json", JSON.stringify(data, null, 2));

console.log("Nifty 50 updated");
