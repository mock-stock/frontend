"use client";
import Link from "next/link";
import { StockData } from "./page";

import style from "./resultStockList.module.scss";
import Icons from "@/components/icons";
import { deleteStock, postStock } from "@/api/stock";

export default function ResultStockList({
  stockList,
}: {
  stockList: StockData[];
}) {
  const handleStockWatchToggle = (sid: number, watched: boolean) => {
    if (watched) {
      deleteStock(sid);
    } else {
      postStock(sid);
    }
  };

  return (
    <ul className={style["stockList-wrapper"]}>
      {stockList.map((stock) => (
        <li className={style["stock-item"]} key={stock.sid}>
          <Link
            href={`/stock/${stock.stck_code}`}
            className={style["stock-link"]}
          >
            <h3 className={style["stock-title"]}>{stock.stck_name}</h3>
            <p className={style["stock-symbol"]}>{stock.stck_code}</p>
          </Link>
          <Icons
            kind="watchStar"
            fill={stock.is_watched ? "#2D3748" : ""}
            onClick={() => handleStockWatchToggle(stock.sid, stock.is_watched)}
          />
        </li>
      ))}
    </ul>
  );
}
