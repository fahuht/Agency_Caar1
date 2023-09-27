/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import "./index.css";

import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  return (
    <div className="page-content">
      <section className="bg-primary relative z-10 py-32">
        <div className="container mx-auto">
          <div className="-mx-4 flex">
            <div className="error-content w-full px-4">
              <div className="mx-auto max-w-md text-center">
                <h2 className="error-title">Lỗi</h2>
                <h4 className="error-sub-title">Đã có lỗi xảy ra!</h4>
                <p className="mb-8 text-lg text-black">
                  Trang bạn đang truy cập đã gặp lỗi
                </p>
                <Link
                  href="/"
                  className="error-link-btn hover:text-primary  hover:bg-white"
                >
                  Quay về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}