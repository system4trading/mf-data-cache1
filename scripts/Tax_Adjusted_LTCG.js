function postTaxReturn(gain, invested) {
  const taxable = Math.max(0, gain - 100000);
  const tax = taxable * 0.10;
  return (gain - tax) / invested;
}
