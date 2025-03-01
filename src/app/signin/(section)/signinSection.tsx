import style from "./signinSection.module.scss";
import Icons from "@/components/icons";
import { WelcomeGift } from "@/components/images/welcomeGift";

export default function SigninSection() {
  return (
    <section className={style["signin-section"]}>
      <div className={style["signin-container"]}>
        <div className={style["title-box"]}>
          <h2 className={style["title"]}>
            간편하게 <span>로그인</span>하고 <br /> 모든 기능을 이용해 보세요!
          </h2>
          <span className={style["subTitle"]}>
            신규회원이라면 5억 포인트 즉시 지급!
          </span>
        </div>
        <WelcomeGift width={`100%`} />
        <button className={style["button"]}>
          <Icons kind="kakao" />
          <p>카카오 로그인</p>
        </button>
      </div>
    </section>
  );
}
