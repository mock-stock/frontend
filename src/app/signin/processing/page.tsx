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
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sendToken`,
        {
          accessToken: token,
        }
      );

      if (response.data.success) {
        router.push(redirectUrl);
      } else {
        setErrorMessage(response.data.message || "인증 실패");
      }

      setLoading(false);
    };

    fetchData();
  }, [token, redirectUrl]);

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
