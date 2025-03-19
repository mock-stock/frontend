import { useEffect, useState } from "react";
import { stompWebSocket } from "@/lib/stompClient";
import { WS_PATHS } from "@/lib/utils/paths";
import { StockDetailData } from "@/generate/data-contracts";
import axios from "axios";

export const useStocksInfoSocket = (stockCode: string) => {
  const [data, setData] = useState<StockDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/stock/${stockCode}`
        );

        setData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`오류가 발생했습니다: ${err.message}`);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      }
    };
    fetchData();

    // 소켓 연결
    const { unsubscribe } = stompWebSocket(
      [stockCode],
      WS_PATHS.PUB_ENDPOINT,
      (data: StockDetailData) => {
        setData(data);
      }
    );

    return () => {
      // 구독 취소
      unsubscribe();
    };
  }, [stockCode]);

  return { data, error };
};
