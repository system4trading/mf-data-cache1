async function loadAMFINav(schemeCode) {
  const res = await fetch(`${AMFI_BASE}nav_${schemeCode}.json`);
  return await res.json();
}

async function loadNifty() {
  const res = await fetch(`https://www.amfiindia.com/spages/NAVAll.txt/${encodeURIComponent(
  SYMBOL
)}?period1=${START}&period2=${END}&interval=1d&events=history&includeAdjustedClose=true`);
  return await res.json();
}
