"use client";
import axios from "axios";
import { useEffect } from "react";

// 로그인 요청 함수
async function loginRequest(email: string, password: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/test`,
      { email, password },
      {
        withCredentials: true,
      }
    );

    if (response.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } else {
      console.error("엑세스 토큰을 받지 못했습니다.");
      return null;
    }
  } catch (error) {
    console.error("로그인 요청 중 오류 발생:", error);
    return null;
  }
}

export default function TestPage() {
  useEffect(() => {
    const email = "testuser@example.com";
    const password = "test";

    const loginProcess = async () => {
      await loginRequest(email, password);
    };

    loginProcess();
  }, []);

  return <></>;
}
