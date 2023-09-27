"use client";

import React, { ReactNode } from "react";

interface ErrorProps {
  children: ReactNode;
}

export default function ErrorPageClient({ children }: ErrorProps) {
  return <div>{children}</div>;
}
