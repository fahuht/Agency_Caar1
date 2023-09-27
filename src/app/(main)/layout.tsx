import "@/styles/global.css"
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/font-awesome-6.4.2-pro-main/css/all.css'

import { ConfigProvider } from 'antd';
import Script from "next/script";
import { ReactNode } from "react"
import { ToastContainer } from 'react-toastify';

import Footer from '@/components/Home/Footer'
import Nav from '@/components/Home/Navigation';
import { FacebookSDK, ZaloShareSDK } from "@/utils/constants";
import Providers from "@/utils/provider";

import BackTop from "./BacktopButton";

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FF9182',
            },
          }}
        >
          <Providers>
            <Nav />
            <main className="body-content">{children}</main>
            <Footer />
            <ToastContainer />
            <BackTop />
          </Providers>
        </ConfigProvider>
        <Script src={ZaloShareSDK}/>
        <Script
        async
        defer
        crossOrigin="anonymous"
        src={FacebookSDK}
        nonce="JVfaYE5X"
      />
      </body>
    </html>
  )
}