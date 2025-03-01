export {};

declare global {
  /**
   * DocumentEventMap 확장
   * - `document.addEventListener("message", handler)` 사용 시 TypeScript가 `message` 이벤트를 정확히 인식하도록 설정
   * - 웹뷰 환경(iOS 등)에서 `document.addEventListener("message", handler)`사용.
   */
  interface DocumentEventMap {
    message: MessageEvent;
  }
  /**
   * Window 객체 확장
   * - `window.ReactNativeWebView`는 React Native WebView 환경에서 제공되는 객체
   * - 웹뷰 내에서 `postMessage`를 사용하여 웹과 네이티브 간의 데이터 송수신 가능.
   * -  웹뷰에서 네이티브로 메시지를 보내는 함수 : @param message - 인자 값으로 JSON 문자열.
   */
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
