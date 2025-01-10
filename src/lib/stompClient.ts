import { Client, IFrame, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SOCKET_URL } from "@/lib/utils/paths"; // 소켓 URL을 가져옵니다.
import { StockData } from "@/app/stock/[stockCode]/page";

export interface PublishMessage {
  action: string;
  ids?: string[];
  my_stocks_ids?: string[];
  stock_ids?: string[];
}

export const connectSocket = (
  SUB_ENDPOINT: string,
  PUB_ENDPOINT: string,
  PUB_BODY: PublishMessage,
  onMessageReceived: (data: StockData) => void
) => {
  let subscriptionId: StompSubscription | null = null;

  const stompClient = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000, // 연결이 끊어졌을 때 5초 후에 재연결 시도
    heartbeatIncoming: 10000, // 서버로부터 10초마다 하트비트 수신
    heartbeatOutgoing: 10000, // 클라이언트가 서버에 10초마다 하트비트 전송

    // debug: (str) => {
    //   console.log(str);
    // },

    onConnect: (connected: IFrame) => {
      console.log("[+] WebSocket 연결이 되었습니다.", connected);
      // 구독 설정
      subscriptionId = stompClient.subscribe(
        SUB_ENDPOINT,
        (message: IMessage) => {
          const messageData = JSON.parse(message.body);
          onMessageReceived(messageData); // 메시지 수신콜백
        }
      );

      // 발행 - 웹 소켓 메시지 전송
      const publishMessage = { PUB_BODY };
      stompClient.publish({
        destination: PUB_ENDPOINT,
        body: JSON.stringify(publishMessage),
      });
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

  // 구독 취소
  const unsubscribe = () => {
    if (subscriptionId) {
      stompClient.unsubscribe(subscriptionId.id);
      console.log("[-] 구독이 취소되었습니다");
    }
  };

  return { unsubscribe };
};
