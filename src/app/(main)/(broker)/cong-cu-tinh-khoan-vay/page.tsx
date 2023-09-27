import "./index.css";

import { Metadata } from "next";
import { Suspense } from "react";

import { baseApiFe } from "@/utils/constants";

import Loading from "../../loading";
import CostCalculation from "./cost-calculation";
// import Loading from "./loading";


export const metadata: Metadata = {
  title: 'Công cụ tính khoản vay',
  description: 'Công cụ tính khoản vay',
  metadataBase: new URL(baseApiFe || ""),
  keywords: 'Hot, nhất, tháng, xe, xe hơi, tin tức xe hơi, công cụ tính khoản vay, công cụ tính toán, lãi suất, khoản vay, công cụ',
  openGraph: {
    locale: "vi_VN",
    type: 'website',
    siteName: 'Caar'
  }
}

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CostCalculation />
    </Suspense>
  );
}
