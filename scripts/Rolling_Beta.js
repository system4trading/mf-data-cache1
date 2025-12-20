function beta(fund, bench){
  const cov = mean(fund.map((r,i)=>r*bench[i]));
  return cov / (stdev(bench)**2);
}
