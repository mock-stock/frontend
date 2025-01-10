"use client";
import { useEffect, useState } from "react";
import { WS_PATHS } from "@/lib/utils/paths";
import { getStock } from "@/api/stock";
import Header from "./header";
import StockInfo from "./stockInfo";
import { connectSocket } from "@/lib/stompClient";
import style from "./stock.module.scss";

export interface StockData {
  sid: number; //고유 식별자
  stck_name: string; //종목명
  stck_code: string; //종목코드
  stck_cur_price: number; //현재 시세가
  stck_prev_cls_diff_price: number; //전일종가 대비 현재가 차익 금액
  stck_prev_cls_diff_percent: number; //전일종가 대비 현재가 차익 퍼센트
}

interface Params {
  params: { stockCode: string };
}

export default function Page({ params: { stockCode } }: Params) {
  const [stockData, setStockData] = useState<StockData | null>(null);
  useEffect(() => {
    const fetchStockData = async () => {
      const data = await getStock(stockCode);
      setStockData(data);
    };
    fetchStockData();

    // 소켓 연결
    const { unsubscribe } = connectSocket(
      WS_PATHS.SUB_ENDPOINT(stockCode),
      WS_PATHS.PUB_ENDPOINT,
      { action: "SUBSCRIBE", ids: [stockCode] },
      (data) => setStockData(data)
    );

    return () => {
      unsubscribe();
    };
  }, [stockCode]);

  return (
    <div>
      <Header />
      <div className={style["stockInfo-container"]}>
        <StockInfo stockData={stockData} />
      </div>
    </div>
  );
}
