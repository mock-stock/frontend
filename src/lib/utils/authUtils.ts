import axios from "axios";

/**
 * 주어진 액세스 토큰을 사용하여 서버에서 새로운 액세스 토큰 갱신
 * @param accessToken - 기존 액세스 토큰
 *  */

export async function refreshAccessToken(accessToken: string) {
  if (!accessToken) return false;

  try {
    const refreshResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (refreshResponse.data && refreshResponse.status === 200) {
      console.log("토큰 갱신 완료!");

      // 새로운 accessToken 로컬 스토리지에 저장
      const newAccessToken = refreshResponse.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);

      return true;
    } else {
      console.log("토큰 갱신 실패!");
      return false;
    }
  } catch (error) {
    console.error("Refresh 요청 중 오류 발생:", error);
    return false;
  }
}
