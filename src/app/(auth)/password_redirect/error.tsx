"use client";

import React from "react";

import ErrorPage from "@/components/Error/ErrorPage";
import ErrorPageClient from "@/components/Error/ErrorPageClient";

export default function Error() {
  return (
      <ErrorPageClient>
        <ErrorPage />
      </ErrorPageClient>
  );
}
