"use client";

import api from "@/app/api/api";
import useSWR from "swr";

interface PageProps {
  stockCode?: string;
}

interface InvestmentData {
  msid: number; //고유 식별자(보유번호)
  stck_code: string; //종목 코드
  stck_name: string; //종목이름
  stck_qty: number; //총 매수 N주
  stck_evaluated_amount: number; //해당 종목 총 평가금액(원)
  avg_purchase_price: number; //평단가
  evaluated_diff_amount: number; //차익원
  evaluated_diff_percent: number; //차익퍼센트
  total_initial_amount: number; //총 투자원금
}
interface OrdersData {
  oid: number; // 고유 식별자
  trade_action: "BUY" | "SELL"; //체결유형
  transaction_status: "COMPLETE" | "CANCEL" | "PENDING"; //체결상태
  stck_name: string; //종목이름
  stck_ord_qty: number; //주문 수
  stck_ord_type: string; //주문유형
  stck_ord_unit_price: number; //1주 주문 금액
  stck_ord_ts: Date; //주문날짜
}

const fetcher = (url: string, token: string) => {
  return api
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 토큰 추가
      },
    })
    .then((res) => res.data);
};

export default function MyInvestmentInfo({ stockCode }: PageProps) {
  const token = "your_token_here";

  // 주식 투자 요약 데이터 요청
  const { data: investmentData, error: investmentError } =
    useSWR<InvestmentData>([`/stock/investment/${stockCode}`, token], fetcher);

  // 주식 주문 요약 데이터 요청
  const { data: ordersData, error: ordersError } = useSWR<OrdersData[]>(
    `/stock/${stockCode}/orders`,
    fetcher
  );

  if (investmentError || ordersError) return <div>Error loading data</div>;
  if (!investmentData || !ordersData) return <div>Loading...</div>;

  return (
    <>
      <InvestmentSummary data={investmentData} />
      <OrderSummary data={ordersData} />
    </>
  );
}

function InvestmentSummary({ data }: { data: InvestmentData }) {
  return (
    <>
      <div>총금액</div>
      <div>{data.stck_evaluated_amount}</div>
      <div> {data.evaluated_diff_percent}% </div>
      <div> ({data.evaluated_diff_amount})</div>
      <div>투자원금</div>
      <div>{data.total_initial_amount}</div>
    </>
  );
}

function OrderSummary({ data }: { data: OrdersData[] }) {
  return (
    <>
      {data.map((item) => {
        if (item.transaction_status == "PENDING") return;
        const orderDate = item.stck_ord_ts.toLocaleDateString();
        return (
          <div key={item.oid} style={{ marginBottom: "10px" }}>
            <div>{orderDate}</div>
            <div
              style={{
                textDecoration:
                  item.transaction_status === "CANCEL"
                    ? "line-through"
                    : "none",
              }}
            >
              {item.trade_action === "BUY" && "구매"}
              {item.trade_action === "SELL" && "판매"}
              {item.stck_ord_qty}주
            </div>
            {item.transaction_status !== "CANCEL" && (
              <div>주당 {item.stck_ord_unit_price}원</div>
            )}
          </div>
        );
      })}
    </>
  );
}
