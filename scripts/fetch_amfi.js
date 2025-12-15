import fs from "fs";
import fetch from "node-fetch";

const AMFI_URL = "https://www.amfiindia.com/spages/NAVAll.txt";

const text = await fetch(AMFI_URL).then(r => r.text());
const lines = text.split("\n");

const schemes = {};
lines.forEach(l => {
  const p = l.split(";");
  if (p.length > 4 && !isNaN(p[0])) {
    const code = p[0];
    const nav = parseFloat(p[4]);
    const date = p[7];
    if (!schemes[code]) schemes[code] = [];
    schemes[code].push({ date, nav });
  }
});

fs.mkdirSync("amfi", { recursive: true });
Object.keys(schemes).forEach(code => {
  fs.writeFileSync(
    `amfi/nav_${code}.json`,
    JSON.stringify(schemes[code], null, 2)
  );
});

console.log("AMFI NAV data updated");
