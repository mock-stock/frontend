"use client";
import StockLine from "../../../../components/chart/stockLine";
import { WindowSize } from "../hooks/useWindowSize";
import { fetcher } from "@/app/api/api";
import StockCandle from "../../../../components/chart/stockCandle";
import { dataToArray } from "@/lib/utils/chartDataUtils";
import style from "./stockChart.module.scss";
import { useEffect, useState } from "react";
import Icons from "@/components/icons";
import { StockHistoryData } from "@/generate/data-contracts";

type SelectionType = "1일" | "1주" | "한달" | "3개월" | "1년" | "5년";

type IntervalType = "MINUTE" | "D" | "W" | "M";

type Props = {
  size: WindowSize;
  stockCode: string;
};
const options: SelectionType[] = ["1일", "1주", "한달", "3개월", "1년", "5년"];

export default function StockChart({ size, stockCode }: Props) {
  const [data, setData] = useState<StockHistoryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<SelectionType>("1일");
  const [chartType, setChartType] = useState("candle");
  const { fromDate, toDate, interval } =
    getDateRangeAndInterval(selectedPeriod);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(
          `/api/stock/chart?stck_code=${stockCode}&from_date=${fromDate}&to_date=${toDate}&interval=${interval}`
        );
        setData(response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`오류가 발생했습니다: ${err.message}`);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      }
    };

    fetchData();
  }, [stockCode, fromDate, toDate, interval]);

  if (error) return;
  if (!data) return;

  const handlePeriodChange = (period: SelectionType) => {
    setSelectedPeriod(period);
    getDateRangeAndInterval(period);
  };

  const date = dataToArray(data, "stck_bsop_date");
  const close = dataToArray(data, "stck_clpr");
  const open = dataToArray(data, "stck_oprc");
  const high = dataToArray(data, "stck_hgpr");
  const low = dataToArray(data, "stck_lwpr");
  const candle = { date, open, close, high, low };
  const line = { close, high, low };

  return (
    <>
      <div className={style["chart"]}>
        {chartType === "candle" && (
          <StockCandle size={size} chartData={candle} />
        )}
        {chartType === "line" && <StockLine size={size} chartData={line} />}
        {/* <p>{selectedPeriod} 차트가 표시됩니다.</p> */}
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

const getDateRangeAndInterval = (
  selection: SelectionType
): { fromDate: string; toDate: string; interval: IntervalType } => {
  const today = new Date();
  let fromDate = today;
  let interval: IntervalType;

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
