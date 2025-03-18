"use client";

import { useEffect, useState } from "react";
import Icons from "@/components/icons";
import style from "./mypaySection.module.scss";
import { LoginButton } from "@/components/button/loginButton";
import { GetAccountData } from "@/generate/data-contracts";

export default function MypaySection(props: { accountData?: GetAccountData }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 브라우저에서 실행될 때만 localStorage 접근
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    }
  }, []);

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
            : isLoggedIn
              ? "로딩 중"
              : "로그인 후 이용 가능"}
        </p>
        {!isLoggedIn && <LoginButton size='medium' />}
      </div>
    </section>
  );
}
