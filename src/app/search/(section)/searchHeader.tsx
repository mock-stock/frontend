"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Icons from "@/components/icons";
import style from "./searchHeader.module.scss";
import { useEffect, useState } from "react";

export default function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search_query") || "";
  const [inputValue, setInputValue] = useState(initialSearch);
  // TEST
  useEffect(() => {
    setInputValue(initialSearch);
  }, [initialSearch]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const keyword = inputValue.trim().replace(/\s+/g, "");
    const url = `/search/result?search_query=${keyword}`;
    if (keyword) {
      router.replace(`${url}`);
    }
  }

  return (
    <header className={style["header-container"]}>
      <div className={style["back-icon-box"]}>
        <Icons kind='chevronLeft' onClick={() => router.back()} />
      </div>
      <form
        method='post'
        onSubmit={handleSubmit}
        className={style["input-wrapper"]}
      >
        <label htmlFor='keyword' className={style["search-icon-box"]}>
          <Icons kind='search' />
        </label>
        <input
          id='keyword'
          name='keyword'
          type='text'
          value={inputValue}
          placeholder='종목을 검색해보세요'
          className={style["search-input"]}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label='검색어 입력'
        />
      </form>
    </header>
  );
}
