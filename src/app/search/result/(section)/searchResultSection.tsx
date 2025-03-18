import style from "./searchResultSection.module.scss";
// import ResultStockList from "../resultStockList";
import Link from "next/link";
import axios from "axios";
import { SearchStocksData } from "@/generate/data-contracts";

export default async function SearchResultSection({
  searechQuery,
}: {
  searechQuery: string;
}) {
  // const stockApi = new Stocks();
  const { data }: { data: SearchStocksData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_UR}/stocks/search/${searechQuery}`
  );

  // const { data } = await stockApi.searchStocks(searechQuery);

  if (!data || data.length === 0) {
    return (
      <p className={style["no-results"]}>
        <span>&quot;{searechQuery}&quot;</span>에 대한 검색결과가 없어요.
      </p>
    );
  }

  // const handleStockWatchToggle = (sid: number, watched: boolean) => {
  //   if (watched) {
  //     deleteStock(sid);
  //   } else {
  //     postStock(sid);
  //   }
  // };

  return (
    <div className={style["stockList-container"]}>
      <h2 className={style["title"]}>주식</h2>
      <ul className={style["stockList-wrapper"]}>
        {data.map((item) => (
          <li className={style["stock-item"]} key={item.sid}>
            <Link
              href={`/stock/${item.stck_code}`}
              className={style["stock-link"]}
            >
              <h3 className={style["stock-title"]}>{item.stck_name}</h3>
              <p className={style["stock-symbol"]}>{item.stck_code}</p>
            </Link>
            {/* <Icons
            kind="watchStar"
            fill={stock.is_watched ? "#2D3748" : ""}
            onClick={() => handleStockWatchToggle(stock.sid, stock.is_watched)}
          /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
