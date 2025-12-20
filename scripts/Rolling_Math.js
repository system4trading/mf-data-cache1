function returns(prices){
  return prices.slice(1).map((p,i)=>Math.log(p/prices[i]));
}

function mean(a){ return a.reduce((x,y)=>x+y,0)/a.length; }

function stdev(a){
  const m = mean(a);
  return Math.sqrt(mean(a.map(x=>(x-m)**2)));
}
