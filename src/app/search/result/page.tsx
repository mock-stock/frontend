import style from "./result.module.scss";
import ResultStockList from "./resultStockList";
import { Suspense } from "react";
import { getKeywordStock } from "@/app/api/keyword";
import SearchHeader from "../searchHeader";

export interface StockData {
  sid: number;
  stck_name: string;
  stck_code: string;
}

export default async function Page(props: {
  searchParams: Promise<{ search_query: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.search_query ?? "";

  const data: StockData[] = search && (await getKeywordStock(search));

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchHeader />
        <div className={style["stockList-container"]}>
          <h2 className={style["title"]}>주식</h2>
          {data.length > 0 ? (
            <ResultStockList stockList={data} />
          ) : (
            <p className={style["no-results"]}>
              <span>&quot;{search}&quot;</span>에 대한 검색결과가 없어요.
            </p>
          )}
        </div>
      </Suspense>
    </>
  );
}
