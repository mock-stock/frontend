import { Stock } from "@/generate/Stock";
import axios from "axios";
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

  try {
    const stockApi = new Stock();
    const response = await stockApi.stockDetail(stockCode);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
