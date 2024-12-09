"use client";
import { useRouter } from "next/navigation";
import SearchForm from "@/app/search/searchForm";
import Icons from "@/components/icons";

interface SearchLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  const router = useRouter();
  return (
    <>
      <header>
        <Icons kind="chevronLeft" onClick={() => router.back()} />
        <SearchForm />
      </header>
      {children}
    </>
  );
}
