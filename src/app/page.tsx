"use client";
import Icons from "@/components/icons";
import style from "./main.module.scss";

export default function Home() {
  return (
    <div className={style["home-container"]}>
      <header className={style.header}>
        <h1>Logo</h1>
        <nav className={style.nav}>
          <ul>
            <li>{/* 알림 */}</li>
            <li>
              <Icons kind="search" href={`search`} />
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section className={style["mypay-container"]}>
          <h2 className={style["title-box"]}>
            <Icons kind="pay" size={14} />
            <p className={style.title}>
              <span>my</span> pay
            </p>
          </h2>
          <div className={style["pay-box"]}>
            <p className={style.pay}>0 원</p>
            <button className={style.btn}>로그인</button>
          </div>
        </section>
        <section className={style["orderHistory-container"]}>
          <h2>주문내역</h2>
          <div>
            <Icons kind="chevronRight" onClick={() => {}} />
          </div>
        </section>
        <section className={style["InvestmentSection-container"]}>
          <h2 className={style.title}>내투자</h2>
          <div>
            <span className={style["subTitle-span"]}>전체 평가 금액</span>
            <p className={style.subTitle}>0 원</p>
            {/* <span className={style["price-details"]}>+30% (10,458원)</span> */}
          </div>
          <div className={style.empty}>
            <Icons kind="empty" size={100} />
            <p className={style["empty-text"]}>내역이 없어요.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
