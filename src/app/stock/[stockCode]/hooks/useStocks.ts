import { useEffect } from "react";
import { connectSocket } from "@/lib/stompClient";
import { WS_PATHS } from "@/lib/utils/paths";
import { StockData } from "../page";
import useSWR from "swr";
import { fetcher } from "@/app/api/api";

export const useStocksInfoSocket = (stockCode: string) => {
  const { data, error, mutate } = useSWR(
    `/api/stock/info?code=${stockCode}`,
    fetcher
  );

  useEffect(() => {
    // 소켓 연결
    const { unsubscribe } = connectSocket(
      WS_PATHS.SUB_ENDPOINT(stockCode),
      WS_PATHS.PUB_ENDPOINT,
      { action: "SUBSCRIBE", ids: [stockCode] },
      (socketData: StockData) => {
        mutate(socketData, false);
      }
    );

    return () => {
      // 구독 취소
      unsubscribe();
    };
  }, [stockCode, mutate]);

  return { data, error };
};
