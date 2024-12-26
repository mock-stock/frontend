"use client";
import { usePathname, useRouter } from "next/navigation";

import Icons from "@/components/icons";

import style from "./searchHeader.module.scss";

export default function SearchHeader() {
  const router = useRouter();
  const pathname = usePathname();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const keyword = formData.get("keyword") as string;

    const url = `${pathname}?keyword=${encodeURIComponent(keyword)}`;

    if (keyword) {
      router.push(`${url}`);
    }
  }

  return (
    <header className={style["header-container"]}>
      <div className={style["back-icon-box"]}>
        <Icons kind="chevronLeft" onClick={() => router.back()} />
      </div>
      <form
        method="post"
        onSubmit={handleSubmit}
        className={style["input-wrapper"]}
      >
        <label htmlFor="keyword" className={style["search-icon-box"]}>
          <Icons kind="search" />
        </label>
        <input
          id="keyword"
          name="keyword"
          type="text"
          placeholder="종목을 검색해보세요"
          className={style["search-input"]}
        />
      </form>
    </header>
  );
}
