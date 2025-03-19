"use client";
import StockLine from "../../../../components/chart/stockLine";
import { WindowSize } from "../hooks/useWindowSize";
import StockCandle from "../../../../components/chart/stockCandle";
import style from "./stockChart.module.scss";
import { useEffect, useState } from "react";
import Icons from "@/components/icons";
import { StockHistoryData } from "@/generate/data-contracts";
import axios from "axios";

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
        const { data }: { data: StockHistoryData } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/stock/history/${stockCode}?from_date=${fromDate}&to_date=${toDate}&interval=${interval}`
        );
        let res: StockHistoryData = data;

        if (selectedPeriod === "1주" && data) {
          //1주 선택시 최신 데이터 7개
          res = data
            .sort(
              (a: { stck_bsop_date: string }, b: { stck_bsop_date: string }) =>
                a.stck_bsop_date.localeCompare(b.stck_bsop_date)
            )
            .slice(-7);
        }

        setData(sortStockData(res));
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

  return (
    <>
      <div className={style["chart"]}>
        {chartType === "candle" && <StockCandle size={size} data={data} />}
        {chartType === "line" && <StockLine size={size} data={data} />}
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
            <Icons kind='chartLine' onClick={() => setChartType("line")} />
          ) : (
            <Icons kind='chartCandle' onClick={() => setChartType("candle")} />
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
      fromDate.setDate(today.getDate() - 21);
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

const sortStockData = (data: StockHistoryData) => {
  return data.sort((a, b) => {
    //오름차순 정렬
    const dateComparison = a.stck_bsop_date.localeCompare(b.stck_bsop_date);
    if (dateComparison !== 0) return dateComparison;

    if (a.stck_cntg_hour === null && b.stck_cntg_hour !== null) return 1;
    if (a.stck_cntg_hour !== null && b.stck_cntg_hour === null) return -1;

    if (
      a.stck_cntg_hour &&
      a.stck_cntg_hour !== null &&
      b.stck_cntg_hour &&
      b.stck_cntg_hour !== null
    ) {
      return a.stck_cntg_hour.localeCompare(b.stck_cntg_hour);
    }

    return 0;
  });
};
