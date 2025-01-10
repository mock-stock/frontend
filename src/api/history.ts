// 검색기록 조회
export async function getHistory() {
  const url = `http://localhost:5001/history`;
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
// 검색기록 삭제
export async function deleteHistory(fid: number) {
  const url = `http://localhost:5001/search/history/${fid}`;

  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorMessage}`
    );
  }
}
