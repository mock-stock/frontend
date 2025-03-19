export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!;

export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

// export const SW_PATHS = {
//   STOCKS: "/api/stocks",
//   USERS: "/api/users",
// };

export const WS_PATHS = {
  SUB_ENDPOINT: (StockCode: string) => `/stocks/${StockCode}`, // 메시지를 수신하기 위한 엔드포인트
  PUB_ENDPOINT: "/api/stocks", // 메시지를 전송하기 위한 엔드포인트
};
