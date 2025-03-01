"use client";
import React, { useEffect, useRef, useState } from "react";
import { scaleLinear } from "d3-scale";
import { WindowSize } from "../../app/stock/[stockCode]/hooks/useWindowSize";
import style from "./chart.module.scss";
import {
  calculateChartDimensions,
  calculateYAxisBounds,
} from "@/lib/utils/chartDataUtils";
import {
  StockHistoryData,
  StockKisHistoryDto,
} from "@/generate/data-contracts";
import { getPriceColor } from "@/lib/utils/priceUtils";

type TooltipData = {
  visible: boolean;
  x: number;
  y: number;
  data: StockKisHistoryDto;
};

type CandleChartProps = {
  size: WindowSize;
  data: StockHistoryData;
};

export default function StockCandle({
  size: { width, height },
  data,
}: CandleChartProps) {
  const close = data.map((d) => d.stck_clpr);
  const open = data.map((d) => d.stck_oprc);
  const high = data.map((d) => d.stck_hgpr);
  const low = data.map((d) => d.stck_lwpr);

  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [guideLine, setGuideLine] = useState<{
    visible: boolean;
    x: number;
  } | null>(null);

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
  const marginRatio = 0.3; // 여백 비율 (10%)
  const domainPadding = (dataYMax - dataYMin) * marginRatio;

  const scaleY = scaleLinear()
    .domain([dataYMin - domainPadding, dataYMax + domainPadding])
    .range([0, yAxisLength]);

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;

    const touchStartHandler = (event: TouchEvent) => {
      event.preventDefault();
    };

    const touchMoveHandler = (event: TouchEvent) => {
      event.preventDefault();
    };

    svg?.addEventListener("touchstart", touchStartHandler, { passive: false });
    svg?.addEventListener("touchmove", touchMoveHandler, { passive: false });

    return () => {
      svg?.removeEventListener("touchstart", touchStartHandler);
      svg?.removeEventListener("touchmove", touchMoveHandler);
    };
  }, []);

  const handleTooltip = (event: React.TouchEvent<SVGRectElement>) => {
    const touchX = event.touches[0].clientX;

    const index = Math.floor((touchX - sidePadding) / plotWidth);
    if (index < 0 || index >= data.length) return;
    const space = xAxisLength * 0.005;
    const x위치 = xScale(plotWidth, index) + (plotWidth - space) / 2;

    let tooltipX = touchX + 10;

    if (tooltipX + 150 > SVG_CHART_WIDTH) {
      tooltipX = touchX - 160;
    }

    setTooltip({
      visible: true,
      x: tooltipX,
      y: 0,
      data: data[index],
    });

    setGuideLine({
      visible: true,
      x: x위치,
    });
  };

  const handleTouchEnd = () => {
    setTooltip(null);
    setGuideLine(null);
  };

  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tooltip && tooltip.data && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();

      setTooltipSize({ width: rect.width, height: rect.height });
    }
  }, [tooltip]);
  return (
    <div className={style["chart-container"]}>
      <svg
        ref={svgRef}
        className={style.svg}
        width={SVG_CHART_WIDTH}
        height={SVG_CHART_HEIGHT}
      >
        {/* 캔들 구현 */}
        {data.map((d, index) => {
          const x = xScale(plotWidth, index);
          const space = xAxisLength * 0.005;
          const max = Math.max(d.stck_oprc, close[index]);
          const min = Math.min(d.stck_oprc, close[index]);

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
                className={`${style.candle} ${getFillColor(close[index], d.stck_oprc)}`}
                x={x}
                width={plotWidth - space}
                y={yAxisLength - scaleY(max)}
                height={Math.max(scaleY(max) - scaleY(min), 1)}
                onTouchStart={(event) => handleTooltip(event)}
                onTouchMove={(event) => handleTooltip(event)}
                onTouchEnd={handleTouchEnd}
                rx={2}
                ry={2}
              />
            </g>
          );
        })}
        {/* 툴팁 */}
        {tooltip && (
          <foreignObject
            x={tooltip.x}
            y={tooltip.y}
            width={150}
            height={tooltipSize.height}
          >
            <div className={style.tooltip} ref={tooltipRef}>
              {tooltip.data && (
                <ul className={style.tooltipList}>
                  <li className={style["tooltip-title"]}>
                    {formatDate(tooltip.data.stck_bsop_date)}
                    &nbsp;
                    {tooltip.data.stck_cntg_hour
                      ? formatTime(tooltip.data.stck_cntg_hour)
                      : ""}
                  </li>
                  <li>
                    <span className={style.label}>시작</span>
                    <span>
                      {tooltip.data.stck_oprc.toLocaleString("ko-KR")}원
                    </span>
                  </li>
                  <li>
                    <span className={style.label}>마지막</span>
                    <span>
                      {tooltip.data.stck_clpr.toLocaleString("ko-KR")}원
                    </span>
                  </li>
                  <li>
                    <span className={style.label}>최고</span>
                    <span>
                      {tooltip.data.stck_hgpr.toLocaleString("ko-KR")}원
                    </span>
                  </li>
                  <li>
                    <span className={style.label}>최저</span>
                    <span>
                      {tooltip.data.stck_lwpr.toLocaleString("ko-KR")}원
                    </span>
                  </li>
                  <li>
                    <span className={style.label}>등락률</span>
                    <span
                      className={
                        style[`${getPriceColor(tooltip.data.stck_change_rate)}`]
                      }
                    >
                      {tooltip.data.stck_change_rate}%
                    </span>
                  </li>
                  <li>
                    <span className={style.label}>거래량</span>
                    <span>{tooltip.data.acml_vol.toLocaleString("ko-KR")}</span>
                  </li>
                </ul>
              )}
            </div>
          </foreignObject>
        )}
        {/* 가이드 라인  */}
        {guideLine && (
          <line
            x1={guideLine.x}
            x2={guideLine.x}
            y1={0}
            y2={yAxisLength}
            stroke="gray"
            strokeDasharray="4"
            strokeWidth={1}
          />
        )}
      </svg>
    </div>
  );
}

const getFillColor = (closeValue: number, openValue: number): string => {
  if (closeValue === openValue) {
    return style["neutral"];
  }

  return closeValue < openValue ? style["positive"] : style["negative"];
};

function formatTime(time: string) {
  // 시간, 분, 초 추출
  const hour = time.substring(0, 2);
  const minute = time.substring(2, 4);
  const second = time.substring(4, 6);

  // 결과 문자열 생성
  let result = `${hour}:${minute} `;

  if (second !== "00") {
    result += `: ${second}`;
  }

  return result;
}

function formatDate(date: string) {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  const dateObj = new Date(`${year}-${month}-${day}`);
  const dayOfWeek = dateObj.getDay();

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return `${year}.${month}.${day}(${weekdays[dayOfWeek]})`;
}
