"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const sendTokenAndRedirect = async (
  accessToken: string,
  redirectUrl: string
) => {
  const response = await axios.post(
    "/api/auth/sendToken",
    { accessToken },
    { headers: { "Content-Type": "application/json" } }
  );

  if (response.data.success) {
    return redirectUrl;
  } else {
    throw new Error(response.data.message || "인증 실패");
  }
};

export default function ProgressPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const redirectUrl = searchParams.get("redirect") || "/";

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !redirectUrl) {
        router.push(redirectUrl);
        return;
      }

      try {
        const result = await sendTokenAndRedirect(token, redirectUrl);
        router.push(result);
      } catch (error) {
        console.error("인증 실패:", error);
      }
    };

    fetchData();
  }, [token, redirectUrl]);

  return <Suspense fallback={<p>로그인 처리 중...</p>}></Suspense>;
}
