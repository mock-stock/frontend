import { Suspense } from "react";
import { getHistory } from "@/api/history";
import { getServerToken } from "@/lib/auth";
import SearchHistoryList from "./searchHistoryList";

import style from "./search.module.scss";
export interface HistoryData {
  fid: number;
  search_keyword: string;
}

async function fetchHistory() {
  const session = await getServerToken();
  return session ? await getHistory() : [];
}

export default async function Page() {
  const data: HistoryData[] = await fetchHistory();

  return (
    <div className={style["historyList-container"]}>
      {data.length && <h1 className={style["title"]}>검색 기록</h1>}
      <Suspense fallback={<p>Loading...</p>}>
        {data.length && <SearchHistoryList historyList={data} />}
      </Suspense>
    </div>
  );
}
