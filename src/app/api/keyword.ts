//키워드 검색
import axios from "axios";

export async function getKeywordStock(keyword: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stocks/search/${keyword}`;

  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to fetch stock data:",
        error.response?.data || error.message
      );
      throw new Error(
        `HTTP error! ${error.response?.status}, message: ${error.message}`
      );
    } else {
      console.error("An unexpected error occurred:", error);
      throw error;
    }
  }
}
