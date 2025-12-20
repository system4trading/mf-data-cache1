function sharpe(r){
  return mean(r) / stdev(r) * Math.sqrt(252);
}
