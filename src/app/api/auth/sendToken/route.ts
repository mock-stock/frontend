import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "토큰이 없습니다." },
        { status: 400 }
      );
    }

    // 서버에서 외부 API로 요청
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("서버 요청 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류 발생" },
      { status: 500 }
    );
  }
}
