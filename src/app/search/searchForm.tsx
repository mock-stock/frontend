"use client";
import { usePathname, useRouter } from "next/navigation";

export default function SearchForm() {
  const pathname = usePathname();
  const router = useRouter();

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
    <form method="post" onSubmit={handleSubmit}>
      <input name="keyword" type="text" placeholder="종목을 검색해보세요" />
    </form>
  );
}
