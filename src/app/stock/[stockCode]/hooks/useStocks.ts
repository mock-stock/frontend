import { useEffect, useState } from "react";
import { connectSocket } from "@/lib/stompClient";
import { WS_PATHS } from "@/lib/utils/paths";
import { fetcher } from "@/app/api/api";
import { StockDetailData } from "@/generate/data-contracts";

export const useStocksInfoSocket = (apiPath: string, POINT: string) => {
  const [data, setData] = useState<StockDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiPath) return;
    const fetchData = async () => {
      try {
        const response = await fetcher(apiPath);
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

    // 소켓 연결
    const { unsubscribe } = connectSocket(
      WS_PATHS.SUB_ENDPOINT(POINT),
      WS_PATHS.PUB_ENDPOINT,
      { action: "SUBSCRIBE", ids: [POINT] },
      (data: StockDetailData) => {
        setData(data);
      }
    );

    return () => {
      // 구독 취소
      unsubscribe();
    };
  }, [apiPath, POINT]);

  return { data, error };
};
