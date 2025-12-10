"use client";

import { useEffect, useState } from "react";
import { getHistoricalRange } from "@/lib/api";

interface Props {
  from: string;
  to: string;
}

export function RateStatsCard({ from, to }: Props) {
  const [minRate, setMinRate] = useState<number | null>(null);
  const [maxRate, setMaxRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);

      // Obtener últimos 30 días
      const data = await getHistoricalRange(from, to, 30);

      const rates = Object.values(data.rates).map((obj: any) => {
        const val = Object.values(obj)[0] as number;
        return val;
      });

      if (rates.length > 0) {
        setMinRate(Math.min(...rates));
        setMaxRate(Math.max(...rates));
      }

      setLoading(false);
    }

    loadStats();
  }, [from, to]);

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-md border space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600 text-center">
        Last 30 Days Overview
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200 text-center">
            <p className="text-sm text-gray-600">Worst rate</p>
            <p className="text-lg font-bold text-red-600">
              {minRate?.toFixed(4)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
            <p className="text-sm text-gray-600">Best rate</p>
            <p className="text-lg font-bold text-green-700">
              {maxRate?.toFixed(4)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
