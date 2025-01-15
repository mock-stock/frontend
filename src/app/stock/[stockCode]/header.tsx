"use client";

import Icons from "@/components/icons";
import style from "./header.module.scss";
import { useRouter } from "next/navigation";
import { StockData } from "./page";
// import { useStocksInfoSocket } from "./hooks/useStocks";
import { useEffect, useState } from "react";
import { getStock } from "@/api/stock";

export default function Header({ stockCode }: { stockCode: string }) {
  const router = useRouter();
  const [data, setData] = useState<StockData>();
  // const { data } = useStocksInfoSocket(stockCode);
  console.log(data);
  const fetchData = async () => {
    const stockData = await getStock(stockCode);
    setData(stockData);
  };

  useEffect(() => {
    if (!stockCode) return;

    // 데이터 패치
    fetchData();

    // // 소켓 연결
    // const { unsubscribe } = connectSocket(
    //   WS_PATHS.SUB_ENDPOINT(stockCode),
    //   WS_PATHS.PUB_ENDPOINT,
    //   { action: "SUBSCRIBE", ids: [stockCode] },
    //   (socketData) => {
    //     setData(socketData); // 소켓 데이터로 업데이트
    //   }
    // );

    // return () => {
    //   // 구독 취소
    //   unsubscribe();
    // };
  }, [stockCode]);
  console.log(data);
  return (
    <header className={style["header-container"]}>
      <div className={style["back-icon-box"]}>
        <Icons kind="chevronLeft" onClick={() => router.back()} />
      </div>
    </header>
  );
}
