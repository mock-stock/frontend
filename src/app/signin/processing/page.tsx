"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default async function ProgressPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const redirectUrl = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !redirectUrl) {
      setLoading(false);
      router.push(redirectUrl);
      return;
    }
    sendTokenAndRedirect(token, redirectUrl);
  }, [token]);

  const fetcher = (url: string, data: any) =>
    axios
      .post(url, data, { headers: { "Content-Type": "application/json" } })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || "API 요청 오류");
      });

  const sendTokenAndRedirect = (accessToken: string, redirectUrl: string) => {
    setLoading(true);

    fetcher("api/auth/sendToken", { accessToken }).then((result) => {
      if (result.success) {
        // 인증 성공 시
        const encodedRedirectUrl = encodeURIComponent(redirectUrl);
        router.push(encodedRedirectUrl);
      } else {
        setErrorMessage(result.message || "인증 실패");
        setLoading(false);
      }
    });
  };

  return (
    <>
      {loading ? (
        <p>로그인 처리 중...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : null}
    </>
  );
}
