import "./index.css";

import { Metadata } from "next";
import { Suspense } from "react";

import Loading from "@/app/(main)/loading";
import { baseApiFe } from "@/utils/constants";

import ListNotification from "./notification";


export const metadata: Metadata = {
  metadataBase: new URL(baseApiFe || ""),
  title: 'Danh sách thông báo',
  description: 'Danh sách thông báo',
  openGraph: {
    locale: "vi_VN",
    type: 'website',
    siteName: 'Caar'
  }
}

type Props = {
  searchParams: { page: string | '0' };
};

export default async function Page({ searchParams }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <ListNotification searchParams={searchParams} />
    </Suspense>
  );
}
