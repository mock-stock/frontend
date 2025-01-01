"use client";
import type { HistoryData } from "./page";
import { deleteHistory } from "@/api/history";
import Icons from "@/components/icons";
import style from "./searchHistoryList.module.scss";

export default function SearchHistoryList({
  historyList,
}: {
  historyList: HistoryData[];
}) {
  return (
    <ul className={style["historyList-wrapper"]}>
      {historyList.map((history) => (
        <li key={history.fid} className={style["history-item"]}>
          <div className={style["item-content"]}>
            <h3 className={style["item-title"]}>{history.search_keyword}</h3>
            <Icons kind="close" onClick={() => deleteHistory(history.fid)} />
          </div>
        </li>
      ))}
    </ul>
  );
}
