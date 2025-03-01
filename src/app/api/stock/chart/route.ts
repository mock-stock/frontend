import { Stock } from "@/generate/Stock";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stockCode = searchParams.get("stck_code");
  const fromDate = searchParams.get("from_date");
  const toDate = searchParams.get("to_date");
  const interval = searchParams.get("interval");

  if (!stockCode || !fromDate || !toDate || !interval) {
    return NextResponse.json(
      {
        error:
          "All parameters (stck_code, from_date, to_date, interval) are required",
      },
      { status: 400 }
    );
  }

  try {
    const stockApi = new Stock();
    const response = await stockApi.stockHistory(stockCode, {
      from_date: fromDate,
      to_date: toDate,
      interval: interval,
    });

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
