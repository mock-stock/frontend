"use client";

import Icons from "@/components/icons";
import style from "./header.module.scss";
import { useRouter } from "next/navigation";
// import { StockData } from "./page";
import { useStocksInfoSocket } from "./hooks/useStocks";

export default function Header({ stockCode }: { stockCode: string }) {
  const router = useRouter();
  const { data } = useStocksInfoSocket(stockCode);
  console.log(data);
  return (
    <header className={style["header-container"]}>
      <div className={style["back-icon-box"]}>
        <Icons kind="chevronLeft" onClick={() => router.back()} />
      </div>
    </header>
  );
}
