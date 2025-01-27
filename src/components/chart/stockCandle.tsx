"use client";
import React, { useState } from "react";
import { scaleLinear } from "d3-scale";
import { WindowSize } from "../../app/stock/[stockCode]/hooks/useWindowSize";
import style from "./chart.module.scss";
import {
  calculateChartDimensions,
  calculateYAxisBounds,
} from "@/lib/utils/chartDataUtils";

interface Chart {
  date: string[];
  open: number[];
  close: number[];
  high: number[];
  low: number[];
}
type TooltipData = {
  visible: boolean;
  x: number;
  y: number;
  data?: string[];
};

type CandleChartProps = {
  size: WindowSize;
  chartData: Chart;
};

export default function StockCandle({
  size: { width, height },
  chartData: { date, open, close, high, low },
}: CandleChartProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const {
    SVG_CHART_WIDTH,
    SVG_CHART_HEIGHT,
    xAxisLength,
    yAxisLength,
    sidePadding,
    plotWidth,
  } = calculateChartDimensions(width, height, open.length);
  const { dataYMax, dataYMin } = calculateYAxisBounds(high, low);

  // X축 스케일 계산
  const xScale = (barPlotWidth: number, index: number) =>
    index * barPlotWidth + sidePadding;

  // Y축 스케일 계산
  const scaleY = scaleLinear()
    .domain([dataYMin, dataYMax])
    .range([0, yAxisLength]);

  const handleMouseOver = (
    event: React.MouseEvent<SVGRectElement> | React.TouchEvent<SVGRectElement>,
    index: number
  ) => {
    const x =
      event.type === "touchstart"
        ? (event as React.TouchEvent<SVGRectElement>).touches[0].clientX
        : (event as React.MouseEvent<SVGRectElement>).clientX;

    const tooltipY =
      yAxisLength - scaleY(Math.max(open[index], close[index])) - 10;

    // 툴팁 X 위치 조정
    const tooltipX = x + 10;
    const finalTooltipX =
      tooltipX + 150 > SVG_CHART_WIDTH ? SVG_CHART_WIDTH - 150 : tooltipX;

    setTooltip({
      visible: true,
      x: finalTooltipX,
      y: tooltipY,
      data: [
        `Date: ${date[index]}`,
        `Open: ${open[index]}`,
        `Close: ${close[index]}`,
        `High: ${high[index]}`,
        `Low: ${low[index]}`,
      ],
    });
  };

  return (
    <div className={style["chart-container"]}>
      <svg
        className={style.svg}
        width={SVG_CHART_WIDTH}
        height={SVG_CHART_HEIGHT}
      >
        {/* 캔들 구현 */}
        {open.map((op, index) => {
          const x = xScale(plotWidth, index);
          const space = xAxisLength * 0.005;
          const max = Math.max(op, close[index]);
          const min = Math.min(op, close[index]);
          const fillColor =
            close[index] < op ? style["candle-blue"] : style["candle-red"];
          return (
            <g key={index}>
              <line
                className={style["candle-line"]}
                x1={x + (plotWidth - space) / 2}
                x2={x + (plotWidth - space) / 2}
                y1={yAxisLength - scaleY(low[index])}
                y2={yAxisLength - scaleY(high[index])}
              />
              <rect
                className={`${style.candle} ${fillColor}`}
                x={x}
                width={plotWidth - space}
                y={yAxisLength - scaleY(max)}
                height={scaleY(max) - scaleY(min)}
                onMouseOver={(event) => handleMouseOver(event, index)}
                onMouseOut={() => setTooltip(null)}
                onTouchStart={(event) => handleMouseOver(event, index)}
              />
            </g>
          );
        })}

        {/* 툴팁 */}
        {tooltip && tooltip.visible && (
          <foreignObject
            x={tooltip.x + 10}
            y={tooltip.y - 40}
            width="150"
            height="100" // 툴팁의 높이를 조정
          >
            <div className={style.tooltip}>
              {tooltip.data?.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  );
}
