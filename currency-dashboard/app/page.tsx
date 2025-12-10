"use client";

import { useState } from "react";
import { convertCurrency } from "@/lib/api";
import { CurrencySelect } from "@/components/currencySelect";
import { RateStatsCard } from "@/components/rateStatsCard";

export default function Home() {
  const [amount, setAmount] = useState<string>("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleConvert() {
    const trimmed = amount.trim();

    // Empty validation or not numeric
    if (trimmed === "" || isNaN(Number(trimmed))) {
      setError("Please enter a valid amount.");
      setResult(null);
      return;
    }

    // Don't allow numbers that start with 0, except floats like 0.5
    if (trimmed.startsWith("0") && !trimmed.startsWith("0.") && trimmed.length > 1) {
      setError("Numbers cannot start with 0 unless it's a decimal like 0.5");
      setResult(null);
      return;
    }

    // Don't allow negative numbers
    if (Number(trimmed) <= 0) {
      setError("Amount must be greater than 0.");
      setResult(null);
      return;
    }

    // Equal Currency
    if (from === to) {
      setError("Please select two different currencies.");
      setResult(null);
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await convertCurrency(Number(trimmed), from, to);

      if (!data?.rates || Object.keys(data.rates).length === 0) {
        setError("Conversion not available.");
        return;
      }

      const value = Object.values(data.rates)[0] as number;
      setResult(value);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg space-y-6">

        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Currency Converter
        </h1>

        {/* Amount */}
        <div className="space-y-1">
          <label className="font-medium">Amount</label>
          <input
            type="number" min="1"
            className={`
              border rounded-lg px-4 py-2 w-full focus:outline-none
              ${error ? "border-red-500 ring-2 ring-red-300" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}
            `}
            value={amount}
            placeholder="Enter amount..."
            onChange={(e) => {
              setAmount(e.target.value);
              if (error) setError("");
            }}
          />

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
        </div>
        <div className="relative flex flex-col gap-4">

          {/* From */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">From</label>
            <CurrencySelect
              value={from}
              onChange={(v) => {
                setFrom(v);
                setResult(null);
                setError("");
              }}
            />
          </div>

          {/* Exchange currency type */}
          <button
            type="button"
            onClick={() => {
              const temp = from;
              setFrom(to);
              setTo(temp);
              setResult(null);
              setError("");
            }}
            className="
            absolute right-0 -top-3
            bg-gray-200 text-gray-700 
            p-1.5 rounded-full shadow-sm 
            hover:bg-gray-300 transition text-sm
          "
            title="Swap currencies"
          >
            ⇆
          </button>

          {/* To */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">To</label>
            <CurrencySelect
              value={to}
              onChange={(v) => {
                setTo(v);
                setResult(null);
                setError("");
              }}
            />
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={loading}
          className={`
            w-full py-3 rounded-lg font-semibold transition shadow-md
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"}
          `}
        >
          {loading ? "Converting..." : "Convert"}
        </button>

        {loading && (
          <div className="flex justify-center mt-4">
            <div className="w-6 h-6 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )}

        {result !== null && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
            <p className="text-xl font-semibold text-indigo-700">
              {result.toFixed(2)} {to}
            </p>
          </div>
        )}

        <RateStatsCard from={from} to={to} />
      </div>
    </div>
  );
}
