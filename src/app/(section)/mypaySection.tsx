import Icons from "@/components/icons";
import style from "./mypaySection.module.scss";
import { LoginButton } from "@/components/button/loginButton";
import { GetAccountData } from "@/generate/data-contracts";

export default function MypaySection(props: { accountData?: GetAccountData }) {
  return (
    <section className={style["mypay-container"]}>
      <h2 className={style["title-box"]}>
        <Icons kind='pay' size={14} />
        <p className={style.title}>
          <span>my</span> pay
        </p>
      </h2>
      <div className={style["pay-box"]}>
        <p className={style.pay}>
          {props.accountData
            ? `${props.accountData.balance.toLocaleString()} 원`
            : "로딩 중"}
        </p>
        {localStorage.getItem("accessToken") ? null : (
          <LoginButton size='medium' />
        )}
      </div>
    </section>
  );
}
