import SearchHeader from "./components/searchHeader/searchHeader";

interface SearchLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div>
      <SearchHeader />
      <main>{children}</main>
    </div>
  );
}
