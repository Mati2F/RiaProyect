"use client";

import { useState } from "react";
import { convertCurrency } from "@/lib/api";
import { CurrencySelect } from "../components/currencySelect";

export default function Home() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);

  async function handleConvert() {
    const data = await convertCurrency(amount, from, to);
    const value = Object.values(data.rates)[0] as number;
    setResult(value);
  }

  return (
    <div className="max-w-lg mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">Currency Converter</h1>

      <input
        type="number" min = "1"
        className="border px-3 py-2 w-full"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <CurrencySelect value={from} onChange={setFrom} />
      <CurrencySelect value={to} onChange={setTo} />

      <button
        onClick={handleConvert}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
      >
        Convert
      </button>

      {result !== null && (
        <p className="text-xl font-semibold">
          Result: {result.toFixed(2)} {to}
        </p>
      )}
    </div>
  );
}
