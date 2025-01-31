import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  WatchStar,
  Close,
  Pay,
  ChartLine,
  ChartCandle,
} from "./icons";
import { Empty } from "./empty";
import Kakao from "./social";

const components = {
  search: Search,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  watchStar: WatchStar,
  close: Close,
  pay: Pay,
  chartLine: ChartLine,
  chartCandle: ChartCandle,
  empty: Empty,
  kakao: Kakao,
};

type IconProps = {
  kind: keyof typeof components;
  href?: string | undefined;
  size?: number;
  fill?: string;
  onClick?: () => void;
};

const iconReaderStyle: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  border: 0,
  whiteSpace: "nowrap",
};

const Icons = ({
  kind,
  href,
  size = 24,
  fill = "none",
  onClick,
}: IconProps) => {
  const SvgComponent = components[kind];

  const svgStyle = {
    width: `${size}px`,
    height: `${size}px`,
    fill: fill,
  };
  const svgBoxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: `${size}px`,
    width: `${size}px`,
  } as const;

  if (!href)
    return (
      <div onClick={onClick} style={svgBoxStyle}>
        <p style={{ ...iconReaderStyle }}>{kind}</p>
        <SvgComponent style={svgStyle} />
      </div>
    );

  return (
    <Link href={href}>
      <span style={{ ...iconReaderStyle }}>{kind} ddd</span>
      <SvgComponent style={svgStyle} />
    </Link>
  );
};

export default Icons;
