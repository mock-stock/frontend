"use client";
// import { useWebviewLogin } from "@/hooks/useWebviewLogin";
import { usePathname, useRouter } from "next/navigation";
import style from "./loginButton.module.scss";

interface LoginButtonProps {
  size?: "small" | "medium" | "large";
}

export function LoginButton({ size = "medium" }: LoginButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const loginTest = () => {
    const redirectUrl = encodeURIComponent(pathname);
    router.push(`signin/testPage?&redirect=${redirectUrl}`);
  };
  // const handleLoginSuccess = (accessToken: string) => {
  //   const redirectUrl = encodeURIComponent(pathname);
  //   router.push(
  //     `signin/processing?token=${accessToken}&redirect=${redirectUrl}`
  //   );
  // };

  // const login = useWebviewLogin({ onLoginSuccess: handleLoginSuccess });

  return (
    <button onClick={loginTest} className={`${style.btn} ${style[size]}`}>
      로그인
    </button>
  );
}
