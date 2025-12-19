import { analyzeMF } from "./analytics.js";
import { scoreMF } from "./scoring.js";

const MASTER =
 "https://raw.githubusercontent.com/system4trading/mf-data-cache/main/mf_master.json";

let mfdb = [];

fetch(MASTER).then(r => r.json()).then(d => mfdb = d);

search.oninput = () => {
  const q = search.value.toLowerCase();
  results.innerHTML = mfdb
    .filter(m => m.name.toLowerCase().includes(q))
    .slice(0, 10)
    .map(m => `<div onclick="load('${m.code}')">${m.name}</div>`)
    .join("");
};

window.load = async code => {
  const data = await analyzeMF(code);
  factsheet.innerHTML = `
    <h3>${data.name}</h3>
    <p>Sharpe: ${data.sharpe.toFixed(2)}</p>
    <p>Alpha: ${(data.alpha*100).toFixed(2)}%</p>
    <p>Score: ${scoreMF(data).toFixed(1)}</p>
  `;
};
