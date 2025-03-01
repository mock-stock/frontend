import {
  formatNumberToKoreanLocale,
  formatNumberWithSign,
} from "@/lib/utils/numberUtils";

import style from "./stockInfoSection.module.scss";
import { StockDetailData } from "@/generate/data-contracts";
import { getPriceColor } from "@/lib/utils/priceUtils";

export default function StockInfoSection({ data }: { data: StockDetailData }) {
  if (!data) return;

  return (
    <section className={style["stockInfo-container"]}>
      <div className={style["stock-header"]}>
        <h2 className={style["info-title"]}>{data.stck_name}</h2>
        {/* <Icons kind="watchStar" fill={"#2D3748"} onClick={() => {}} /> */}
      </div>
      <p className={style["stock-details"]}>
        {formatNumberToKoreanLocale(data.stck_cur_price)}
        <span
          className={style[`${getPriceColor(data.stck_prev_cls_diff_price)}`]}
        >
          {formatNumberWithSign(data.stck_prev_cls_diff_percent)}% (
          {formatNumberToKoreanLocale(data.stck_prev_cls_diff_price)})
        </span>
      </p>
    </section>
  );
}
