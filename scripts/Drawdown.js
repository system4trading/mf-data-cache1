function drawdownSeries(prices) {
  let peak = prices[0];
  return prices.map(p => {
    peak = Math.max(peak, p);
    return (p / peak) - 1;
  });
}
