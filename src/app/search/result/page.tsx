import style from "./page.module.scss";
import SearchHeader from "../(section)/searchHeader";
import SearchResultSection from "./(section)/searchResultSection";
interface SearchParamProps {
  searchParams: {
    search_query: string;
  };
}
export default function Page({ searchParams }: SearchParamProps) {
  const params = searchParams.search_query;

  return (
    <div className={style["page-container"]}>
      <SearchHeader />
      <main>
        <SearchResultSection params={params} />
      </main>
    </div>
  );
}
