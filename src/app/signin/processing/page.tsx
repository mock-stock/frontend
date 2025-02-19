"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const FetchDataComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const redirectUrl = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !redirectUrl) {
        router.push(redirectUrl);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/kakao`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        console.log("로그인 성공!");

        // 새로운 accessToken 로컬 스토리지에 저장
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        router.push(redirectUrl);
      } else {
        setErrorMessage(response.data.message || "인증 실패");
      }

      setLoading(false);
    };

    fetchData();
  }, [token, redirectUrl, router]);

  if (loading) {
    return <p>로그인 처리 중...</p>;
  }

  return errorMessage ? <p>{errorMessage}</p> : null;
};

export default function ProgressPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <FetchDataComponent />
    </Suspense>
  );
}
