export const API_URL = "https://api.frankfurter.app";

export async function getCurrencies() {
  const res = await fetch(`${API_URL}/currencies`);
  return res.json();
}

export async function convertCurrency(amount: number, from: string, to: string) {
  const res = await fetch(`${API_URL}/latest?amount=${amount}&from=${from}&to=${to}`);
  return res.json();
}

export async function getRates(base: string) {
  const res = await fetch(`${API_URL}/latest?from=${base}`);
  return res.json();
}

export async function getHistoricalRange(from: string, to: string, days: number = 30) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);

  const startStr = start.toISOString().split("T")[0];
  const endStr = end.toISOString().split("T")[0];

  const url = `https://api.frankfurter.app/${startStr}..${endStr}?from=${from}&to=${to}`;
  const res = await fetch(url);
  return res.json();
}
