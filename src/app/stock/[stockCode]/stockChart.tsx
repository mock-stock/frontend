"use client";
import useSWR from "swr";
import StockLine from "../../../components/chart/stockLine";
import { WindowSize } from "./hooks/useWindowSize";
import { fetcher } from "@/app/api/api";
import StockCandle from "../../../components/chart/stockCandle";
import { dataToArray } from "@/lib/utils/chartDataUtils";
import style from "./stockChart.module.scss";
import { useState } from "react";
import Icons from "@/components/icons";

type SelectionType = "1일" | "1주" | "한달" | "3개월" | "1년" | "5년";

export interface ChartData {
  stck_name: string; //종목이름
  stck_bsop_date: string; // 시간
  stck_oprc: number; // 시가
  stck_clpr: number; // 종가
  stck_hgpr: number; // 고가
  stck_lwpr: number; // 저가
  acml_vol: number; // 누적 거래량
  stck_change_rate: number; // 변화율
}

type Props = {
  size: WindowSize;
  stockCode: string;
};

export default function StockChart({ size, stockCode }: Props) {
  const options: SelectionType[] = [
    "1일",
    "1주",
    "한달",
    "3개월",
    "1년",
    "5년",
  ];
  const [selectedPeriod, setSelectedPeriod] = useState<SelectionType>("1일");
  const [chartType, setChartType] = useState("candle");
  const { fromDate, toDate, interval } =
    getDateRangeAndInterval(selectedPeriod);

  const { data: chartData, mutate } = useSWR(
    `/api/stock/chart?stck_code=${stockCode}&from_date=${fromDate}&to_date=${toDate}&interval=${interval}`,
    fetcher
  );

  if (!chartData) return;
  const handlePeriodChange = (period: SelectionType) => {
    setSelectedPeriod(period);
    const { fromDate, toDate, interval } = getDateRangeAndInterval(period);
    mutate(
      `/api/stock/chart?stck_code=${stockCode}&from_date=${fromDate}&to_date=${toDate}&interval=${interval}`
    );
  };
  console.log(chartData);
  const date = dataToArray(chartData, "stck_bsop_date");
  const close = dataToArray(chartData, "stck_clpr");
  const open = dataToArray(chartData, "stck_oprc");
  const high = dataToArray(chartData, "stck_hgpr");
  const low = dataToArray(chartData, "stck_lwpr");
  const candle = { date, open, close, high, low };
  const line = { close, high, low };

  return (
    <>
      <div className={style["chart"]}>
        {chartType === "candle" && (
          <StockCandle size={size} chartData={candle} />
        )}
        {chartType === "line" && <StockLine size={size} chartData={line} />}
        <p>{selectedPeriod} 차트가 표시됩니다.</p>
      </div>
      <div className={style["chart-container"]}>
        <div className={style["period-options"]}>
          {options.map((period) => (
            <button
              key={period}
              className={`${style["option-button"]} ${
                selectedPeriod === period ? style["active"] : ""
              }`}
              onClick={() => handlePeriodChange(period)}
            >
              {period}
            </button>
          ))}
        </div>
        <div className={style["chart-type-options"]}>
          {chartType === "candle" ? (
            <Icons kind="chartLine" onClick={() => setChartType("line")} />
          ) : (
            <Icons kind="chartCandle" onClick={() => setChartType("candle")} />
          )}
        </div>
      </div>
    </>
  );
}

const getDateRangeAndInterval = (selection: SelectionType) => {
  const today = new Date();
  let fromDate = today;
  let interval;

  switch (selection) {
    case "1일":
      fromDate = new Date(today);
      interval = "MINUTE";
      break;
    case "1주":
      fromDate = new Date(today);
      fromDate.setDate(today.getDate() - 7);
      interval = "D";
      break;
    case "한달":
      fromDate = new Date(today);
      fromDate.setMonth(today.getMonth() - 1);
      interval = "D";
      break;
    case "3개월":
      fromDate = new Date(today);
      fromDate.setMonth(today.getMonth() - 3);
      interval = "D";
      break;
    case "1년":
      fromDate = new Date(today);
      fromDate.setFullYear(today.getFullYear() - 1);
      interval = "W";
      break;
    case "5년":
      fromDate = new Date(today);
      fromDate.setFullYear(today.getFullYear() - 5);
      interval = "M";
      break;
    default:
      throw new Error("Invalid selection");
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return {
    fromDate: formatDate(fromDate),
    toDate: formatDate(today),
    interval,
  };
};
