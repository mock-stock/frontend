import { useEffect, useState } from "react";
// import { connectSocket } from "@/lib/stompClient";
// import { WS_PATHS } from "@/lib/utils/paths";
import { StockData } from "../page";
import { getStock } from "@/api/stock";

export const useStocksInfoSocket = (stockCode: string) => {
  const [data, setData] = useState<StockData>();

  const fetchData = async () => {
    const stockData = await getStock(stockCode);
    setData(stockData);
  };

  useEffect(() => {
    if (!stockCode) return;

    // 데이터 패치
    fetchData();

    // // 소켓 연결
    // const { unsubscribe } = connectSocket(
    //   WS_PATHS.SUB_ENDPOINT(stockCode),
    //   WS_PATHS.PUB_ENDPOINT,
    //   { action: "SUBSCRIBE", ids: [stockCode] },
    //   (socketData) => {
    //     setData(socketData); // 소켓 데이터로 업데이트
    //   }
    // );

    // return () => {
    //   // 구독 취소
    //   unsubscribe();
    // };
  }, [stockCode]);

  return { data };
};

// -- SWR
// import useSWR, { mutate } from "swr";
// import { connectSocket } from "@/lib/stompClient";
// import api from "@/api/api";
// import { useEffect } from "react";
// import { WS_PATHS } from "@/lib/utils/paths";

// const fetcher = async (url: string) => {
//   const response = await api.get(url);
//   return response.data;
// };

// export const useStocksInfoSocket = (stockCode: string) => {
//   const { data, error } = useSWR(`/stock/${stockCode}`, fetcher);

//   useEffect(() => {
//     if (!stockCode) return;

//     // 소켓 연결
//     const { unsubscribe } = connectSocket(
//       WS_PATHS.SUB_ENDPOINT(stockCode),
//       WS_PATHS.PUB_ENDPOINT,
//       { action: "SUBSCRIBE", ids: [stockCode] },
//       (data) => {
//         mutate(`/stock/${stockCode}`, data, false);
//       }
//     );

//     return () => {
//       // 구독 취소
//       unsubscribe();
//     };
//   }, [stockCode]);

//   return { data, error };
// };
