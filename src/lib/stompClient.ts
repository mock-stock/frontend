import { Client, IFrame, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SOCKET_URL } from "@/lib/utils/paths";
import { StockDetailData, StockInfoDto } from "@/generate/data-contracts";
// export interface PublishMessage {
//   action: string;
//   ids?: string[];
//   my_stocks_ids?: string[];
//   stock_ids?: string[];
// }
let stompClient: Client;
export const connectSocket = (
  ids: string[],
  PUB_ENDPOINT: string,
  onMessageReceived: (data: StockDetailData) => void
) => {
  const subscriptionInfos: StompSubscription[] = [];

  // 구독 취소
  const unsubscribe = () => {
    if (subscriptionInfos.length > 0) {
      subscriptionInfos.forEach((subscriptionInfo) => {
        stompClient.unsubscribe(subscriptionInfo.id);
        console.log(`${subscriptionInfo.id} [-] 구독이 취소되었습니다`);
      });
    }
  };

  const subscribe = (stockCode: string) => {
    if (!stompClient) return;
    const subscriptionInfo: StompSubscription = stompClient.subscribe(
      stockCode,
      (message) => {
        let messageData: StockInfoDto;
        try {
          messageData = JSON.parse(message.body);
          onMessageReceived(messageData); // 메시지 수신콜백
        } catch (error) {
          console.error("메시지 파싱 오류:", error);
          return;
        }
      }
    );
    subscriptionInfos.push(subscriptionInfo);
  };

  const publish = (ids: string[]) => {
    stompClient.publish({
      destination: PUB_ENDPOINT,
      body: JSON.stringify({ action: "SUBSCRIBE", ids: ids }),
    });
  };

  if (stompClient && stompClient.connected) {
    console.log("기존 WebSocket 연결이 유지됨. 구독만 추가");
    ids.forEach((stockCode) => subscribe(stockCode));
    publish(ids);
    return { unsubscribe };
  }
  stompClient = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000, // 연결이 끊어졌을 때 5초 후에 재연결 시도
    heartbeatIncoming: 10000, // 서버로부터 10초마다 하트비트 수신
    heartbeatOutgoing: 10000, // 클라이언트가 서버에 10초마다 하트비트 전송

    onConnect: (connected: IFrame) => {
      console.log("[+] WebSocket 연결이 되었습니다.", connected);
      // 첫 연결시 구독 설정
      ids.forEach((stockCode) => subscribe(stockCode));

      // 발행 - 웹 소켓 메시지 전송
      publish(ids);
    },
    onWebSocketClose: (close) => {
      console.log("[-] WebSocket 연결이 종료되었습니다.", close);
    },
    onWebSocketError: (error) => {
      console.error("[-] 웹 소켓 연결 오류가 발생하였습니다.", error);
    },
    onStompError: (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    },
  });

  stompClient.activate();

  return { unsubscribe };
};
