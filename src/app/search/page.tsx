import { Suspense } from "react";
import { getHistory } from "@/api/history";
import { getServerToken } from "@/lib/auth";
import SearchHistoryList from "./searchHistoryList";

import style from "./search.module.scss";
export interface HistoryData {
  fid: number;
  search_keyword: string;
}

export default async function Page() {
  const session = await getServerToken();
  const data: HistoryData[] = session && (await getHistory());

  return (
    <div className={style["historyList-container"]}>
      {session && <h1 className={style["title"]}>검색 기록</h1>}
      <Suspense fallback={<p>Loading...</p>}>
        {data && <SearchHistoryList historyList={data} />}
      </Suspense>
    </div>
  );
}
