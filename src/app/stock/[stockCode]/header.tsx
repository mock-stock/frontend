"use client";
import Icons from "@/components/icons";
import style from "./header.module.scss";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className={style["header-container"]}>
      <div className={style["back-icon-box"]}>
        <Icons kind="chevronLeft" onClick={() => router.back()} />
      </div>
    </header>
  );
}
