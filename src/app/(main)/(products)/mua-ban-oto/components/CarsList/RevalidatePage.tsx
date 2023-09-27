"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function RevalidatePage() {
  const router = useRouter();
  const handleRefreshPage = (): void => {
    router.refresh();
  };
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleRefreshPage();
      }}
      className="text-white bg-primary-200 inline-block rounded-lg border  px-8 py-3 text-center text-base font-semibol transition "
    >
      Tải lại
    </a>
  );
}
