import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import '@/styles/font-awesome-6.4.2-pro-main/css/all.css'

import Script from "next/script";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import { FacebookSDK } from "@/utils/constants";
import Providers from "@/utils/provider";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          <main className="body-content-auth">{children}</main>
          <ToastContainer />
        </Providers>
      </body>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src={FacebookSDK}
        nonce="JVfaYE5X"
      />
    </html>
  );
}
