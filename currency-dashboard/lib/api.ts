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
