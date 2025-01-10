// 종목 정보
export async function getStock(stockCode: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stock/${stockCode}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch stock data:", error);
    throw error;
  }
}

// 종목 즐겨찾기 추가
export async function postStock(sid: number) {
  const url = `http://localhost:5001/watchlist/${sid}`;

  const response = await fetch(url, { method: "POST" });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorMessage}`
    );
  }
}
// 종목 즐겨찾기 삭제
export async function deleteStock(sid: number) {
  const url = `http://localhost:5001/watchlist/${sid}`;
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorMessage}`
    );
  }
}
