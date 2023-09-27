import "@/styles/global.css";
import "./index.css";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import imageLogoWeb from "@/public/assets/images/Caar.png";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {/* <div className="header-auth p-5 flex justify-between align-center gap-6">
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
                        <span className="font-semibold text-sm lg:text-lg">
                            Quên mật khẩu
                        </span>
                    </div>
                </div>
                <div className="header-right flex align-center">
                    <Link href="/dang-nhap" className="textsm lg:text-lg">
                        Đăng nhập bằng email khác{" "}
                    </Link>
                </div>
            </div>
            {children} */}
            <div className="px-1 md:px-3 lg:px-10">
                <div className="py-5 flex justify-between align-center">
                    <div className="header-left flex">
                        <div className=" py-3 md:py-6 pr-3 md:pr-6 custom-border-right">
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
                        <div className="title-header text-white pt-2 md:py-6 pb-3 pl-3 md:pl-6 align-center">
                            <span className="font-semibold text-sm md:text-base lg:text-lg">
                                Quên mật khẩu
                            </span>
                        </div>
                    </div>
                    <div className="header-right text-white text-sm md:text-base lg:text-lg flex-none md:flex align-center  md:py-6 pb-3">
                        <p>Bạn đã là thành viên?</p>
                        <Link
                            href="/dang-nhap"
                            className="font-semibold float-right text-white hover:text-orange-450 pl-2"
                        >
                            Đăng nhập ngay{" "}
                        </Link>
                    </div>
                </div>
                <hr className="opacity-20"></hr>
            </div>
            {children}
        </>
    );
}
