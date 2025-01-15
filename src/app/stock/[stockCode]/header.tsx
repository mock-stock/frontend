"use client";

import Icons from "@/components/icons";
import style from "./header.module.scss";
import { useRouter } from "next/navigation";
import { StockData } from "./page";
// import { useStocksInfoSocket } from "./hooks/useStocks";
import { useEffect, useState } from "react";

export async function getStock(stockCode: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stock/${stockCode}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch stock data:", error);
    throw error;
  }
}

export default function Header({ stockCode }: { stockCode: string }) {
  const router = useRouter();
  const [data, setData] = useState<StockData>();
  const [error, setError] = useState<string | null>(null);
  // const { data } = useStocksInfoSocket(stockCode);
  console.log(data);

  useEffect(() => {
    const fetchStockData = async () => {
      const response = await fetch(`/api/stock?code=${stockCode}`);
      if (!response.ok) {
        const errorMessage = await response.text();
        setError(`Error: ${errorMessage}`);
        return;
      }
      const data = await response.json();
      setData(data);
    };

    fetchStockData();
  }, [stockCode]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data);
  return (
    <header className={style["header-container"]}>
      <div className={style["back-icon-box"]}>
        <Icons kind="chevronLeft" onClick={() => router.back()} />
      </div>
    </header>
  );
}
