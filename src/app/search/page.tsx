// import { getHistory } from "@/app/api/history";
// import { getServerToken } from "@/lib/auth";
// import SearchHistorySection from "./(section)/searchHistorySection";

import style from "./page.module.scss";
import SearchHeader from "./(section)/searchHeader";
export interface HistoryData {
  fid: number;
  search_keyword: string;
}

// async function fetchHistory() {
//   const session = await getServerToken();
//   return session ? await getHistory() : [];
// }

export default async function Page() {
  // const data: HistoryData[] = await fetchHistory();

  return (
    <div className={style["page-container"]}>
      <SearchHeader />
      <main>{/* <SearchHistorySection historyList={data} /> */}</main>
    </div>
  );
}
