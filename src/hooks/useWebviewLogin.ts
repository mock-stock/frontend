"use client";
import { useCallback, useEffect } from "react";

interface UseWebviewLoginProps {
  onLoginSuccess?: (socialToken: string) => void;
}

export function useWebviewLogin({ onLoginSuccess }: UseWebviewLoginProps) {
  // 웹뷰: 메세지 전송 (로그인 요청)
  const sendLoginRequest = useCallback(() => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ action: "LOGIN" })
      );
    }
  }, []);

  useEffect(() => {
    // 웹뷰: 웹뷰 메세지 수신
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.action === "KAKAO_LOGIN_SUCCESS") {
          onLoginSuccess?.(data.kakaoAccessToken);
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    window.addEventListener("message", handleMessage);
    document.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("message", handleMessage);
    };
  }, []);

  return sendLoginRequest;
}
