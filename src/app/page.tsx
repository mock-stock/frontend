import style from "./page.module.scss";

import Header from "./(section)/header";
import MypaySection from "./(section)/mypaySection";
// import OrderHistorySection from "./(section)/orderHistorySection";
import InvestmentSection from "./(section)/investmentSection";

export default function Home() {
  return (
    <div className={style["home-container"]}>
      <Header />
      <main>
        <MypaySection />
        {/* <OrderHistorySection /> */}
        <InvestmentSection />
      </main>
    </div>
  );
}
