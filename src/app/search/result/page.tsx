import style from "./result.module.scss";
import ResultStockList from "./resultStockList";
import { Suspense } from "react";
import SearchHeader from "../searchHeader";
import { getKeywordStock } from "@/app/api/keyword";

export interface StockData {
  sid: number;
  stck_name: string;
  stck_code: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { search_query: string };
}) {
  const { search_query } = searchParams;
  const data: StockData[] = await getKeywordStock(search_query ?? "");

  return (
    <div className={style["page-container"]}>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchHeader />
        <div className={style["stockList-container"]}>
          <h2 className={style["title"]}>주식</h2>
          {data?.length > 0 ? (
            <ResultStockList stockList={data} />
          ) : (
            <p className={style["no-results"]}>
              <span>&quot;{search_query}&quot;</span>에 대한 검색결과가 없어요.
            </p>
          )}
        </div>
      </Suspense>
    </div>
  );
}
