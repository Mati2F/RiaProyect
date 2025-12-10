"use client";

import { useEffect, useState } from "react";
import { getRates } from "@/lib/api";
import { CurrencySelect } from "@/components/currencySelect";
import Link from "next/link";

export default function RatesPage() {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    getRates(base).then((data) => setRates(data.rates));
  }, [base]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl space-y-6">
        
        <h1 className="text-3xl font-bold text-indigo-600 text-center">
          Exchange Rates
        </h1>

        <CurrencySelect value={base} onChange={setBase} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
          {Object.entries(rates).slice(0, 12).map(([code, rate]) => (
            <div
              key={code}
              className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm"
            >
              <p className="text-lg font-semibold text-indigo-700">{code}</p>
              <p>{rate}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center mt-8">
          <Link
            href="/"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Go back
          </Link>
        </div>

      </div>
    </div>
  );
}
