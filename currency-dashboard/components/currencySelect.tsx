"use client";

import { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function CurrencySelect({ value, onChange }: Props) {
  const [currencies, setCurrencies] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then(setCurrencies);
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2"
    >
      {Object.entries(currencies).map(([code, name]) => (
        <option key={code} value={code}>
          {code} – {name}
        </option>
      ))}
    </select>
  );
}
