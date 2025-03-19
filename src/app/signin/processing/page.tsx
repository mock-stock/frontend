"use client";
import Icons from "@/components/icons";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { toast } from "react-hot-toast";

const FetchDataComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const socialToken = searchParams.get("socialToken");
  const redirectUrl = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!socialToken || !redirectUrl) {
        router.push(redirectUrl);
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login/kakao`,
          {},
          {
            headers: {
              Authorization: `Bearer ${socialToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert(response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        toast.success("로그인 완료.", {
          icon: <Icons kind={"successIcon"} />,
        });
        router.replace(redirectUrl);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            alert("토큰에러");
            router.replace(redirectUrl);
          }
        } else {
          alert("예기치 못한 문제가 발생했습니다. 다시 시도해주세요.");
          router.replace(redirectUrl);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>로그인 처리 중...</p>;
  }
};

export default function ProgressPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <FetchDataComponent />
    </Suspense>
  );
}
