"use client";
import style from "./page.module.scss";
import Header from "./(section)/header";
import MypaySection from "./(section)/mypaySection";
// import OrderHistorySection from "./(section)/orderHistorySection";
import InvestmentSection from "./(section)/investmentSection";
import axios from "axios";
import { GetAccountData } from "@/generate/data-contracts";
import { useEffect, useState } from "react";

export default function Home() {
  const [accountData, setAccountData] = useState<GetAccountData>();

  async function getAccountData() {
    const { data }: { data: GetAccountData } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/account`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    setAccountData(data);
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("accessToken") !== null
    ) {
      alert("here window is available");
      getAccountData();
    }
  }, []);
  return (
    <div className={style["home-container"]}>
      <Header />
      <main>
        <MypaySection accountData={accountData} />
        {/* <OrderHistorySection /> */}
        <InvestmentSection />
      </main>
    </div>
  );
}
