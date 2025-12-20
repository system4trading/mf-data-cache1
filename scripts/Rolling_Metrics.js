function rollingMetric(fund, bench, window, fn){
  let out=[];
  for(let i=window;i<fund.length;i++){
    out.push(fn(
      fund.slice(i-window,i),
      bench.slice(i-window,i)
    ));
  }
  return out;
}
