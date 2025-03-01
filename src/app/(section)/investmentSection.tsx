import Icons from "@/components/icons";
import style from "./investmentSection.module.scss";

export default function InvestmentSection() {
  return (
    <section className={style["InvestmentSection-container"]}>
      <h2 className={style.title}>내투자</h2>
      <div>
        <span className={style["subTitle-span"]}>전체 평가 금액</span>
        <p className={style.subTitle}>0 원</p>
        {/* <span className={style["price-details"]}>+30% (10,458원)</span> */}
      </div>
      <div className={style.empty}>
        <Icons kind="empty" size={100} />
        <p className={style["empty-text"]}>투자 내역이 없어요.</p>
      </div>
    </section>
  );
}
