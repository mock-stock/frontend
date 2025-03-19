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
            withCredentials: true,
          }
        );
        alert(response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        toast.success("로그인 완료.", {
          icon: <Icons kind={"successIcon"} />,
        });
        router.replace(redirectUrl);
      } catch (error) {
        alert(error);
        console.error(error);
        router.replace(redirectUrl);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>로그인 처리 중..</p>;
  }
};

export default function ProgressPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <FetchDataComponent />
    </Suspense>
  );
}
