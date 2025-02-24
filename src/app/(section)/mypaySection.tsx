import Icons from "@/components/icons";
import style from "./mypaySection.module.scss";
import { LoginButton } from "@/components/button/loginButton";

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
        <LoginButton size="medium" />
      </div>
    </section>
  );
}
