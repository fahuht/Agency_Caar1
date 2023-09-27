/* eslint-disable tailwindcss/no-custom-classname */
import "@/styles/global.css";
import "./index.css";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import imageLogoWeb from "@/public/assets/images/Caar.png";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="px-1 md:px-3 lg:px-10">
                <div className="py-5 flex justify-between align-center">
                    <div className="header-left flex">
                        <div className=" py-3 md:py-6 pr-3 md:pr-6 custom-border">
                            <div className="">
                                <Link className="" href="/">
                                    <Image
                                        src={imageLogoWeb}
                                        alt="Picture of the author"
                                        className="image-logo"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="title-header ">
                            <span className="font-semibold text-sm md:text-base lg:text-lg">
                                Đăng ký
                            </span>
                        </div>
                    </div>
                    <div className="header-right">
                        <p>Bạn đã là thành viên? </p>
                        <Link
                            href="/dang-nhap"
                            className="font-semibold float-right text-white hover:text-orange-450 pl-2"
                        >
                            Đăng nhập ngay
                        </Link>
                    </div>
                </div>
                <hr className="opacity-20"></hr>
            </div>
            {children}
        </>
    );
}
