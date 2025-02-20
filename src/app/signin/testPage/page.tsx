"use client";
// import { refreshAccessToken } from "@/lib/utils/authUtils";
import axios from "axios";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 로그인 요청 함수
async function loginRequest(email: string, password: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/test`,
      { email, password }
    );

    if (response.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return true;
    } else {
      console.error("엑세스 토큰을 받지 못했습니다.");
      return false;
    }
  } catch (error) {
    console.error("로그인 요청 중 오류 발생:", error);
    return false;
  }
}

function LoginProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirectUrl = redirectParam ? decodeURIComponent(redirectParam) : "/";

  useEffect(() => {
    const email = "testuser@example.com";
    const password = "test";

    const loginProcess = async () => {
      const isLoginSuccess = await loginRequest(email, password);
      if (isLoginSuccess) {
        alert("로그인 성공");
        router.replace(redirectUrl);
      }
      // if (accessToken) {
      //   const isLoginSuccess = await refreshAccessToken(accessToken);
      //   if (isLoginSuccess) {
      //     router.replace(redirectUrl);
      //   }
      // }
    };

    loginProcess();
  }, [redirectUrl, router]);

  return null;
}

export default function TestPage() {
  return (
    <Suspense fallback={<p>로그인 중...</p>}>
      <LoginProcess />
    </Suspense>
  );
}
