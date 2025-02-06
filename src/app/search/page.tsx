import style from "./page.module.scss";
import SearchHeader from "./(section)/searchHeader";
import { Suspense } from "react";
export interface HistoryData {
  fid: number;
  search_keyword: string;
}

export default function Page() {
  return (
    <div className={style["page-container"]}>
      <Suspense fallback={<>...Loading</>}>
        <SearchHeader />
      </Suspense>
      <main></main>
    </div>
  );
}
