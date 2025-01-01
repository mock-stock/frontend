export async function getStock(keyword: string) {
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
