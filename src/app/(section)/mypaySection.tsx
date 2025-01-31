import Icons from "@/components/icons";
import Link from "next/link";
import style from "./mypaySection.module.scss";

export default function MypaySection() {
  return (
    <section className={style["mypay-container"]}>
      <h2 className={style["title-box"]}>
        <Icons kind="pay" size={14} />
        <p className={style.title}>
          <span>my</span> pay
        </p>
      </h2>
      <div className={style["pay-box"]}>
        <p className={style.pay}>0 원</p>
        <Link href="/signin" legacyBehavior>
          <a className={style.btn}>로그인</a>
        </Link>
      </div>
    </section>
  );
}
