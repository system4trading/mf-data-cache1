export function drawdownSeries(prices) {
  let peak = prices[0];
  return prices.map(p => {
    peak = Math.max(peak, p);
    return (p / peak) - 1;
  });
}

export function drawdownHeatmap(prices, dates) {
  const dd = drawdownSeries(prices);
  return dates.map((d, i) => ({
    year: d.slice(0,4),
    month: d.slice(5,7),
    drawdown: dd[i]
  }));
}
