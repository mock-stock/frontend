import SearchHeader from "./searchHeader";

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
