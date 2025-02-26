"use client";
import axios from "axios";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Icons from "@/components/icons";

// 로그인 요청 함수
async function loginRequest(email: string, password: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/test`,
      { email, password }
    );
    if (response.status === 200 && response.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return true;
    }
  } catch (error) {
    console.error("오류 발생", error);
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
        toast.success("로그인 완료.", {
          icon: <Icons kind={"successIcon"} />,
        });
        router.replace(redirectUrl);
      } else {
        alert("로그인 실패. 다시 시도해주세요.");
        router.replace(redirectUrl);
      }
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
