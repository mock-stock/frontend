import { Suspense } from "react";
import { getHistory } from "@/app/api/history";
import { getServerToken } from "@/lib/auth";
import SearchHistoryList from "./searchHistoryList";

import style from "./page.module.scss";
import SearchHeader from "./searchHeader";
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
    <Suspense fallback={<p>Loading...</p>}>
      <SearchHeader />
      <div className={style["historyList-container"]}>
        {data.length > 0 && <h1 className={style["title"]}>검색 기록</h1>}
        {data.length > 0 && <SearchHistoryList historyList={data} />}
      </div>
    </Suspense>
  );
}
