"use client";
import { refreshAccessToken } from "@/lib/utils/authUtils";
import axios from "axios";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirectUrl = redirectParam ? decodeURIComponent(redirectParam) : "/";

  useEffect(() => {
    const email = "testuser@example.com";
    const password = "test";

    const loginProcess = async () => {
      const accessToken = await loginRequest(email, password);

      if (accessToken) {
        const isLoginSuccess = await refreshAccessToken(accessToken);
        if (isLoginSuccess) {
          router.replace(redirectUrl);
        }
      }
    };

    loginProcess();
  }, [redirectUrl, router]);

  return <></>;
}
