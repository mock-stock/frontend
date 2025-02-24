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

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login/kakao`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data?.accessToken && response.status === 200) {
          console.log("로그인 성공!");
          localStorage.setItem("accessToken", response.data.accessToken);
          router.push(redirectUrl);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("오류 발생");
      } finally {
        setLoading(false);
      }
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
