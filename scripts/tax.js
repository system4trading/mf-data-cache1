export function postTaxEquityReturn({
  invested,
  current,
  holdingDays
}) {
  const gain = current - invested;

  if (holdingDays < 365) {
    return gain * 0.85; // STCG
  }

  const taxable = Math.max(0, gain - 100000);
  const tax = taxable * 0.10;
  return gain - tax;
}
