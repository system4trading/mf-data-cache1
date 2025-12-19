const BASE = "https://raw.githubusercontent.com/system4trading/mf-data-cache/main/";

export async function analyzeMF(code) {
  const nav = await fetch(`${BASE}amfi/nav_${code}.json`).then(r => r.json());
  const nifty = await fetch(`${BASE}nifty/nifty50.json`).then(r => r.json());

  const prices = nav.map(x => x.nav);
  const returns = prices.slice(1).map((p,i)=>Math.log(p/prices[i]));

  const mean = a => a.reduce((x,y)=>x+y,0)/a.length;
  const sd = a => Math.sqrt(mean(a.map(x=>(x-mean(a))**2)));

  return {
    sharpe: mean(returns)/sd(returns)*Math.sqrt(252),
    alpha: mean(returns) - mean(nifty.slice(1).map((p,i)=>Math.log(p.close/nifty[i].close)))
  };
}
