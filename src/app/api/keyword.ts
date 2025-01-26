//키워드 검색
export async function getKeywordStock(keyword: string) {
  // const url = `http://localhost:5001/keyword`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stocks/search/${keyword}`;

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
