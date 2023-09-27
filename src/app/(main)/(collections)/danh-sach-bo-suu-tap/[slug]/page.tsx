// import "./index.css";

import { Metadata } from "next";
import { Suspense } from "react";

import Loading from "@/app/(main)/loading";
import { baseApiFe } from "@/utils/constants";

import ListProduct from "./Components/ListProduct";

export const metadata: Metadata = {
  title: 'Chi tiết bộ sưu tập',
  description: 'Chi tiết bộ sưu tập',
  metadataBase: new URL(baseApiFe || ""),
  keywords: 'Hot, nhất, tháng, xe, xe hơi, tin tức xe hơi, Chi tiết bộ sưu tập,',
  openGraph: {
    locale: "vi_VN",
    type: 'website',
    siteName: 'Caar'
  }
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug } = params;
  const collectionId = slug && slug?.split('id%3D')[1]
  return (
    <div className='flex flex-col'>
      <Suspense fallback={<Loading />}>
        <ListProduct collectionId={collectionId} />
      </Suspense>
    </div>
  );
}
