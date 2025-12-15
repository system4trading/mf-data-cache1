
/**
 * Build category-wise average CAGR (1Y, 3Y, 5Y)
 * Reads: amfi/nav_*.json + mf_master.json
 * Writes: category_avg.json
 */

import fs from "fs";

const MF_MASTER = JSON.parse(fs.readFileSync("mf_master.json"));
const AMFI_DIR = "amfi";

function CAGR(prices, years) {
  const days = years * 252;
  if (prices.length <= days) return null;
  return Math.pow(
    prices[prices.length - 1] / prices[prices.length - 1 - days],
    1 / years
  ) - 1;
}

const categoryData = {};

for (const mf of MF_MASTER) {
  const file = `${AMFI_DIR}/nav_${mf.code}.json`;
  if (!fs.existsSync(file)) continue;

  const navData = JSON.parse(fs.readFileSync(file));
  const prices = navData.map(d => d.nav);

  const c1 = CAGR(prices, 1);
  const c3 = CAGR(prices, 3);
  const c5 = CAGR(prices, 5);

  if (!categoryData[mf.category]) {
    categoryData[mf.category] = { "1": [], "3": [], "5": [] };
  }

  if (c1) categoryData[mf.category]["1"].push(c1);
  if (c3) categoryData[mf.category]["3"].push(c3);
  if (c5) categoryData[mf.category]["5"].push(c5);
}

// Average each category
const categoryAvg = {};
for (const cat in categoryData) {
  categoryAvg[cat] = {};
  for (const y of ["1", "3", "5"]) {
    const arr = categoryData[cat][y];
    categoryAvg[cat][y] =
      arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
  }
}

fs.writeFileSync(
  "category_avg.json",
  JSON.stringify(categoryAvg, null, 2)
);

console.log("Category averages updated");
