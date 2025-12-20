export function rebalance(portfolio, targets, threshold=5) {
  return portfolio.map(p => {
    const drift = p.weight - targets[p.asset];
    return {
      ...p,
      rebalance: Math.abs(drift) > threshold
    };
  });
}
