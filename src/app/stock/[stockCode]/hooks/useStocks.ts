import useSWR, { mutate } from "swr";
import { connectSocket } from "@/lib/stompClient";
import api from "@/api/api";
import { useEffect } from "react";
import { WS_PATHS } from "@/lib/utils/paths";

const fetcher = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export const useStocksInfoSoket = (stockCode: string) => {
  const { data, error } = useSWR(`/stock/${stockCode}`, fetcher);

  useEffect(() => {
    if (!stockCode) return;

    // 소켓 연결
    const { unsubscribe } = connectSocket(
      WS_PATHS.SUB_ENDPOINT(stockCode),
      WS_PATHS.PUB_ENDPOINT,
      { action: "SUBSCRIBE", ids: [stockCode] },
      (data) => {
        mutate(`/stocks/${stockCode}`, data, false);
      }
    );

    return () => {
      // 구독 취소
      unsubscribe();
    };
  }, [stockCode]);

  return { data, error };
};
