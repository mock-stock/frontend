"use client";
import { useEffect, useState } from "react";
import style from "./stock.module.scss";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Header from "./header";
import StockInfo from "./stockInfo";
import StockChart from "./stockChart";
import MyInvestmentInfo from "./myInvestments";
import { useStocksInfoSocket } from "./hooks/useStocks";

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

interface Tab {
  label: string;
  name: string;
  content: (stockCode: string) => JSX.Element;
}

const tabs: Tab[] = [
  {
    label: "chart",
    name: "차트",
    content: () => <StockChart />,
  },
  {
    label: "myInvestments",
    name: "내주식",
    content: (stockCode) => <MyInvestmentInfo stockCode={stockCode} />,
  },
];

export default function Page({ params: { stockCode } }: Params) {
  const { data } = useStocksInfoSocket(stockCode);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("label");

  const [activeTab, setActiveTab] = useState<string>("chart");

  useEffect(() => {
    setActiveTab(search ?? tabs[0].label);
  }, [search]);

  const handleTabClick = (label: string) => {
    setActiveTab(label);
    router.replace(`${pathname}?label=${label}`);
  };
  console.log(data);
  return (
    <div>
      <Header />
      <div className={style["stockInfo-container"]}>
        {data && <StockInfo stockData={data} />}
      </div>
      <div className={style["tab-container"]}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${style.tab} ${
              activeTab === tab.label ? style.active : ""
            }`}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <hr className="bar" />
      <div className={style["tab-content"]}>
        {tabs.find((tab) => tab.label === activeTab)?.content(stockCode)}
      </div>
    </div>
  );
}
