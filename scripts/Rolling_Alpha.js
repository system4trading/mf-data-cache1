function alpha(fund, bench){
  return mean(fund) - beta(fund,bench)*mean(bench);
}
