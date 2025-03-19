"use client";
import { useEffect, useState } from "react";
import style from "./page.module.scss";
import { usePathname } from "next/navigation";
import Header from "./(section)/header";
import StockInfoSection from "./(section)/stockInfoSection";
import { useStocksInfoSocket } from "./hooks/useStocks";
import TabMenuContentSection, {
  TabType,
} from "./(section)/tabMenuContentSection";

interface StockParamProps {
  params: {
    stockCode: string;
  };
  searchParams: {
    label?: string;
  };
}

export default function Page({ params, searchParams }: StockParamProps) {
  const { data, error } = useStocksInfoSocket(params.stockCode);

  const [activeTab, setActiveTab] = useState<TabType>("chart");

  function isTabType(label: string): label is TabType {
    return label === "chart" || label === "myInvestments";
  }

  useEffect(() => {
    const searchLabel = searchParams.label;
    if (searchLabel && isTabType(searchLabel)) {
      setActiveTab(searchParams.label as TabType);
    }
  }, [searchParams.label]);

  const pathname = usePathname();

  if (error) return;
  if (!data) return;

  return (
    <div className={style["section"]}>
      <Header />
      <main>
        <StockInfoSection data={data} />
        <TabMenuContentSection
          stockCode={params.stockCode}
          activeTab={activeTab}
          routerPath={`${pathname}?label=${activeTab}`}
          setActiveTab={setActiveTab}
        />
      </main>
    </div>
  );
}
