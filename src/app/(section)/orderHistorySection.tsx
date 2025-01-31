import Icons from "@/components/icons";
import style from "./orderHistorySection.module.scss";

export default function OrderHistorySection() {
  return (
    <section className={style["orderHistory-container"]}>
      <h2>주문내역</h2>
      <div>
        <Icons kind="chevronRight" />
      </div>
    </section>
  );
}
