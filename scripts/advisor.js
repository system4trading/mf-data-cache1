export function saveClient(client){
  let c=JSON.parse(localStorage.getItem("clients")||"[]");
  c.push(client);
  localStorage.setItem("clients",JSON.stringify(c));
}
