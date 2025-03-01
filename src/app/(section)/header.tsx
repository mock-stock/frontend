import Icons from "@/components/icons";
import style from "./header.module.scss";

export default function Header() {
  return (
    <header className={style.header}>
      <h1>Logo</h1>
      <nav className={style.nav}>
        <ul>
          <li>{/* 알림 */}</li>
          <li>
            <Icons kind="search" href={`search`} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
