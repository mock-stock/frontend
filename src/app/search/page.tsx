"use client";
import Icons from "@/components/icons";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface StockData {
  sid: number;
  stck_name: string;
  stck_code: string;
  is_watched: boolean;
}
interface HistoryData {
  fid: number;
  search_keyword: string;
}

const checkLoginStatus = true;

export default function Page() {
  const { isSearch, search } = useSearch("keyword");
  const [recentHistory, setRecentHistory] = useState<HistoryData[]>([]);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);

  // 최근 검색기록
  useEffect(() => {
    const fetchData = async () => {
      const session = await checkLoginStatus;
      if (session) {
        const data = await getHistory();
        setRecentHistory(data || []);
      }
    };
    setLoading(false);

    fetchData();
  }, []);

  //  검색주식
  useEffect(() => {
    const fetchStockData = async () => {
      if (isSearch) {
        const data = await getStock();
        setStockData(data || []);
      }
    };
    fetchStockData();
  }, [search, isSearch]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {isSearch ? (
        <>
          <h2>주식</h2>
          {stockData.length > 0 ? (
            <ul>
              {stockData.map((stock) => (
                <StockItem key={stock.sid} stock={stock} />
              ))}
            </ul>
          ) : (
            <p>주식 데이터를 찾을 수 없습니다.</p>
          )}
        </>
      ) : (
        <>
          <h2>최근 내역</h2>
          {recentHistory.length > 0 ? (
            <ul>
              {recentHistory.map((item) => (
                <HistoryItem history={item} key={item.fid} />
              ))}
            </ul>
          ) : (
            <p>최근 검색 기록이 없습니다.</p>
          )}
        </>
      )}
    </>
  );
}

const useSearch = (param: string) => {
  const searchParams = useSearchParams();
  const isSearch = searchParams.has(param);
  const search = searchParams.get(param);

  return { isSearch, search };
};

const HistoryItem = ({ history }: { history: HistoryData }) => {
  const { fid, search_keyword } = history;
  return (
    <li key={fid}>
      {search_keyword}
      <Icons kind="close" onClick={() => deleteHistory(fid)} />
    </li>
  );
};

const StockItem = ({ stock }: { stock: StockData }) => {
  const { sid, stck_name, stck_code, is_watched } = stock;

  const handleClick = () => {
    if (is_watched) {
      deleteStock(sid);
    } else {
      postStock(sid);
    }
  };

  return (
    <li>
      {sid},{stck_name},{stck_code},{is_watched}
      <Icons
        kind="watchStar"
        fill={stock.is_watched ? "#2D3748" : ""}
        onClick={handleClick}
      />
    </li>
  );
};

async function getHistory() {
  const response = await fetch("http://localhost:5001/history");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
async function deleteHistory(fid: number) {
  const response = await fetch(`http://localhost:5001/search/history/${fid}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

async function getStock() {
  const response = await fetch("http://localhost:5001/keyword");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
async function postStock(sid: number) {
  const response = await fetch(`http://localhost:5001/watchlist/${sid}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
async function deleteStock(sid: number) {
  const response = await fetch(`http://localhost:5001/watchlist/${sid}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
