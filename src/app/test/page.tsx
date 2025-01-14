"use client";

import { getStock } from "@/api/stock";
import { useEffect, useState } from "react";

export interface StockData {
  sid: number; //고유 식별자
  stck_name: string; //종목명
  stck_code: string; //종목코드
  stck_cur_price: number; //현재 시세가
  stck_prev_cls_diff_price: number; //전일종가 대비 현재가 차익 금액
  stck_prev_cls_diff_percent: number; //전일종가 대비 현재가 차익 퍼센트
}

export default function Page() {
  const [data, setData] = useState<StockData>();

  useEffect(() => {
    const fetchData = async () => {
      const stockData = await getStock("005930");
      setData(stockData);
    };

    fetchData();
  }, []);
  console.log(data);

  return <>testpage</>;
}
