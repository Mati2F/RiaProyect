"use client";

import { useEffect, useState } from "react";
import { getRates } from "@/lib/api";
import { CurrencySelect } from "../../components/currencySelect";

export default function RatesPage() {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    getRates(base).then((data) => setRates(data.rates));
  }, [base]);

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">Exchange Rates</h1>

      <CurrencySelect value={base} onChange={setBase} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {Object.entries(rates).slice(0, 12).map(([code, rate]) => (
          <div key={code} className="border p-3 rounded shadow-sm">
            <p className="font-semibold">{code}</p>
            <p>{rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
