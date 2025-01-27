import useSWR from "swr";
import StockLine from "../../../components/chart/stockLine";
import { WindowSize } from "./hooks/useWindowSize";
import { fetcher } from "@/app/api/api";
import StockCandle from "../../../components/chart/stockCandle";
import { dataToArray } from "@/lib/utils/chartDataUtils";

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
  const fromDate = "2025-01-01"; // 시작 날짜
  const toDate = "2025-01-23"; // 종료 날짜
  const interval = "D";

  const { data: chartData } = useSWR(
    `/api/stock/chart?stck_code=${stockCode}&from_date=${fromDate}&to_date=${toDate}&interval=${interval}`,
    fetcher
  );

  if (!chartData) return;

  const date = dataToArray(chartData, "stck_bsop_date");
  const close = dataToArray(chartData, "stck_clpr");
  const open = dataToArray(chartData, "stck_oprc");
  const high = dataToArray(chartData, "stck_hgpr");
  const low = dataToArray(chartData, "stck_lwpr");
  const candle = { date, open, close, high, low };
  const line = { close, high, low };

  return (
    <>
      <StockCandle size={size} chartData={candle} />
      <StockLine size={size} chartData={line} />
    </>
  );
}
