"use client";
import Icons from "@/components/icons";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { toast } from "react-hot-toast";

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
          localStorage.setItem("accessToken", response.data.accessToken);
          toast.success("로그인 완료.", {
            icon: <Icons kind={"successIcon"} />,
          });
          router.replace(redirectUrl);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            alert("예기치 못한 문제가 발생했습니다. 다시 시도해주세요.");
            setErrorMessage("오류 발생");
            router.replace(redirectUrl);
          }
        }
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
