import { useEffect, useState } from "react";
import { connectSocket } from "@/lib/stompClient";
import { WS_PATHS } from "@/lib/utils/paths";
import { StockData } from "../page";

export const useStocksInfoSocket = (stockCode: string) => {
  const [data, setData] = useState<StockData>();
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const response = await fetch(`/api/stock?code=${stockCode}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      setError(`Error: ${errorMessage}`);
      return;
    }
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    // 종목 정보 데이터 패치
    fetchData();

    // 소켓 연결
    const { unsubscribe } = connectSocket(
      WS_PATHS.SUB_ENDPOINT(stockCode),
      WS_PATHS.PUB_ENDPOINT,
      { action: "SUBSCRIBE", ids: [stockCode] },
      (socketData) => {
        setData(socketData); // 소켓 데이터로 업데이트
      }
    );

    return () => {
      // 구독 취소
      unsubscribe();
    };
  }, [stockCode]);

  return { data, error };
};
