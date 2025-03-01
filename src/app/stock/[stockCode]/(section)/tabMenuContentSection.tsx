import { useRouter } from "next/navigation";
import style from "./tabMenuContentSection.module.scss";
import { useWindowSize, WindowSize } from "../hooks/useWindowSize";
import StockChart from "./stockChart";

export type TabType = "chart" | "myInvestments";

interface Tab {
  label: TabType;
  name: string;
}

const tabs: Tab[] = [
  {
    label: "chart",
    name: "차트",
  },
  {
    label: "myInvestments",
    name: "내주식",
  },
];

export default function TabMenuContentSection({
  stockCode,
  activeTab = "chart",
  routerPath,
  setActiveTab,
}: {
  stockCode: string;
  activeTab?: TabType;
  routerPath: string;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}) {
  const size: WindowSize = useWindowSize();
  const router = useRouter();
  const handleTabClick = (label: TabType) => {
    setActiveTab(label);

    router.replace(routerPath);
  };
  return (
    <section>
      <div className={style["tab-container"]}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`
      ${style.tab} 
      ${activeTab === tab.label ? style.active : ""}
      `}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <hr className="bar" />
      <div className={style["tab-content"]}>
        {activeTab === "chart" && (
          <StockChart size={size} stockCode={stockCode} />
        )}
        {activeTab === "myInvestments" && (
          <>myInvestments</>
          // <MyInvestmentInfo stockCode={stockCode} />
        )}
      </div>
    </section>
  );
}
