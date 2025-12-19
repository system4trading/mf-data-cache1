export function compare(mfs){
  return mfs.map(m=>({
    name:m.name,
    cagr:m.cagr,
    sharpe:m.sharpe
  }));
}
