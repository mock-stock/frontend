import Icons from "@/components/icons";

export default function Home() {
  return (
    <>
      <header>
        <h1>logo</h1>
        <nav>
          <Icons kind="search" href={`search`} />
        </nav>
      </header>
      <section>
        <div>
          <>
            <Icons kind="pay" />
          </>
          my pay
        </div>
      </section>
    </>
  );
}
