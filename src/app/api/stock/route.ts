// app/api/stock/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stockCode = searchParams.get("code");

  if (!stockCode) {
    return NextResponse.json(
      { error: "Stock code is required" },
      { status: 400 }
    );
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/stock/${stockCode}`; // HTTP API URL

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch stock data:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
