export function savePortfolio(p) {
  localStorage.setItem("portfolio", JSON.stringify(p));
}
