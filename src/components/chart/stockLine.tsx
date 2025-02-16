import style from "./chart.module.scss";
import { scaleLinear } from "d3-scale";
import { WindowSize } from "../../app/stock/[stockCode]/hooks/useWindowSize";
import {
  calculateChartDimensions,
  calculateYAxisBounds,
} from "@/lib/utils/chartDataUtils";
import { StockHistoryData } from "@/generate/data-contracts";

type LineChartProps = {
  size: WindowSize;
  data: StockHistoryData;
};

type CircleWithLabelProps = {
  cx: number;
  cy: number;
  label: number;
  color: string;
  x: number;
  y: number;
};

export default function StockLine({
  size: { width, height },
  data,
}: LineChartProps) {
  const close = data.map((d) => d.stck_clpr);
  const high = data.map((d) => d.stck_hgpr);
  const low = data.map((d) => d.stck_lwpr);

  const {
    SVG_CHART_WIDTH,
    SVG_CHART_HEIGHT,
    xAxisLength,
    yAxisLength,
    sidePadding,
    plotWidth,
  } = calculateChartDimensions(width, height, close.length); // 차트 치수
  const { dataYMax, dataYMin } = calculateYAxisBounds(high, low); //차트 데이터 Y축

  const highMax = Math.max(...high);
  const lowMin = Math.min(...low);

  // X축 스케일 계산
  const xScale = (barPlotWidth: number, index: number) =>
    index * barPlotWidth + sidePadding;

  // Y축 스케일 계산
  const marginRatio = 0.3; // 여백 비율 (10%)
  const domainPadding = (dataYMax - dataYMin) * marginRatio;

  const scaleY = scaleLinear()
    .domain([dataYMin - domainPadding, dataYMax + domainPadding])
    .range([yAxisLength, 0]);

  // 텍스트 밀림 방지
  const calculateX = (index: number) => {
    const xValue = xScale(plotWidth, index);
    return Math.min(Math.max(xValue, 25), xAxisLength);
  };

  // 종가 데이터 색상 결정
  const firstClose = close[0]; // 첫 번째 종가
  const lastClose = close[close.length - 1]; // 마지막 종가
  const lineColor =
    lastClose > firstClose ? style["line-red"] : style["line-blue"];
  const transparentLineColor =
    lastClose > firstClose
      ? style["transparent-red"]
      : style["transparent-blue"];

  return (
    <div className={style["chart-container"]}>
      <svg
        className={style.svg}
        width={SVG_CHART_WIDTH}
        height={SVG_CHART_HEIGHT}
      >
        {/* 종가 데이터 라인 */}
        {close.map((cl, index) => {
          const nextValue = close[index + 1];
          if (nextValue !== undefined) {
            return (
              <line
                className={`${lineColor} ${style.line}`}
                key={index}
                x1={xScale(plotWidth, index)}
                x2={xScale(plotWidth, index + 1)}
                y1={scaleY(cl)}
                y2={scaleY(nextValue)}
              />
            );
          }
          return null;
        })}
        {/* 최고가 텍스트 */}
        <CircleWithLabel
          cx={xScale(plotWidth, high.indexOf(highMax))}
          cy={scaleY(highMax)}
          label={highMax}
          x={calculateX(high.indexOf(highMax))}
          y={scaleY(highMax) - 10}
          color={transparentLineColor}
        />

        {/* 최저가 텍스트 */}
        <CircleWithLabel
          cx={xScale(plotWidth, low.indexOf(lowMin))}
          cy={scaleY(lowMin)}
          label={lowMin}
          x={calculateX(low.indexOf(lowMin))}
          y={scaleY(lowMin) + 20}
          color={transparentLineColor}
        />
      </svg>
    </div>
  );
}

const CircleWithLabel = (props: CircleWithLabelProps) => {
  const { cx, cy, label, color, x, y } = props;
  return (
    <>
      <circle cx={cx} cy={cy} r={3} className={color} />
      <text x={x} y={y} textAnchor="middle" fill="#000" fontSize="12">
        {label.toLocaleString("ko-KR")}
      </text>
    </>
  );
};
