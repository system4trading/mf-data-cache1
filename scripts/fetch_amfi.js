import fs from 'fs';
import fetch from 'node-fetch';

const res = await fetch("https://www.amfiindia.com/spages/NAVAll.txt");
fs.writeFileSync("raw.txt", await res.text());

