import Icons from "@/components/icons";
import { StockData } from "./page";
import {
  formatNumberToKoreanLocale,
  formatNumberWithSign,
} from "@/lib/utils/numberUtils";

import style from "./stockInfo.module.scss";

interface StockInfoProps {
  stockData: StockData | null;
}

export default function StockInfo({ stockData }: StockInfoProps) {
  if (!stockData) return;
  const {
    stck_name,
    stck_cur_price,
    stck_prev_cls_diff_percent,
    stck_prev_cls_diff_price,
  } = stockData;

  return (
    <section>
      <div className={style["stock-header"]}>
        <h2 className={style["info-title"]}>{stck_name}</h2>
        <Icons kind="watchStar" fill={"#2D3748"} onClick={() => {}} />
      </div>
      <p className={style["stock-details"]}>
        {formatNumberToKoreanLocale(stck_cur_price)}
        <span>
          {formatNumberWithSign(stck_prev_cls_diff_percent)}% (
          {formatNumberToKoreanLocale(stck_prev_cls_diff_price)})
          {/* Todo: 다시확인  */}
        </span>
      </p>
    </section>
  );
}
