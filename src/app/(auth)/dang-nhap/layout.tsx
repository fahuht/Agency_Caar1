"use client";

import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import imageLogoWeb from "@/public/assets/images/Caar.png";
import { GOOGLE_ID } from "@/utils/constants";

export default function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="px-1 md:px-3 lg:px-10">
                <div className="py-5 flex justify-between align-center">
                    <div className="header-left flex">
                        <div className="custom-border">
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
                                Đăng nhập
                            </span>
                        </div>
                    </div>
                    <div className="header-right text-white text-sm md:text-base lg:text-lg flex-none md:flex align-center  md:py-6 pb-3">
                        <p className="md:mr-1">Bạn chưa là thành viên?</p>
                        <Link
                            href="/dang-ki"
                            className="font-semibold float-right text-white hover:text-orange-450 pl-2"
                        >
                            Đăng kí
                        </Link>
                    </div>
                </div>
                <hr className="opacity-20"></hr>
            </div>
            <GoogleOAuthProvider clientId={GOOGLE_ID}>
                <section>{children}</section>
            </GoogleOAuthProvider>
        </>
    );
}
