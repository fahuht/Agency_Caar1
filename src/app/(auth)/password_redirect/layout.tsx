import "@/styles/global.css";
import "./index.css";

import Image from 'next/image';
import Link from "next/link";
import { ReactNode } from "react";

import imageLogoWeb from '@/public/assets/images/Caar.png';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="header-auth p-5 flex justify-between align-center gap-6">
        <div className="header-left flex gap-3">
          <div className="icon-header">
            <Link className="" href="/">
            <Image
                    src={imageLogoWeb}
                    alt="Picture of the author"
                    className="image-logo"
                  />
            </Link>
          </div>
          <div className="title-header flex align-center">
            <span className="font-semibold text-xs text-white sm:text-sm md:text-base lg:text-lg">Quên mật khẩu</span>
          </div>
        </div>
        <div className="header-right flex align-center">
          <Link href="/dang-nhap" className="text-white text-xs sm:text-sm md:text-base lg:text-lg">Đăng nhập bằng email khác </Link>
        </div>
      </div>
      {children}
    </>
  );
}
