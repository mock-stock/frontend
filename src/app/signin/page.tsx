import style from "./signin.module.scss";
import SigninSection from "./(section)/signinSection";
import Header from "./(section)/header";

export default function Page() {
  return (
    <div className={style["content-wrapper"]}>
      <Header />
      <SigninSection />
    </div>
  );
}
