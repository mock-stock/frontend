import { cookies } from "next/headers";

export function getServerToken(): string | null {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? null;
  return token;
}
