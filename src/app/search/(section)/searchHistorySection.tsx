"use client";
import type { HistoryData } from "../page";
import { deleteHistory } from "@/app/api/history";
import Icons from "@/components/icons";
import style from "./searchHistoryList.module.scss";

export default function SearchHistorySection({
  historyList,
}: {
  historyList: HistoryData[];
}) {
  return (
    <div className={style["historyList-container"]}>
      <h1 className={style["title"]}>검색 기록</h1>
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
    </div>
  );
}
