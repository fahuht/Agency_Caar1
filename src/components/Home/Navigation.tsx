"use client";

import "./index.css";

import { useQuery } from "@tanstack/react-query";
import { Drawer, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import useGlobalStore from "@/app/store/globalStore";
import imageLogoWeb from "@/public/assets/images/Caar.png";
import routes from "@/utils/routes";

import { logout } from "./api";
import NotificationHeader from "./Notification";

const Nav = () => {
    const pathname = usePathname();
    const [openAccountFunction, setOpenAccountFunction] = useState(false);
    const userInfo = useGlobalStore((state) => state.userInfo);
    const updateUserInfoData = useGlobalStore((state) => state.setUserInfo);
    const [openMenuMobile, setOpenMenuMobile] = useState(false);

    const onCloseMenuMobile = () => {
        setOpenMenuMobile(false);
    };

    const hideAccountFunction = () => {
        onCloseMenuMobile();
        setOpenAccountFunction(false);
    };

    const handleOpenAccountFunction = (newOpen: boolean) => {
        setOpenAccountFunction(newOpen);
    };

    const showMenuMobile = () => {
        setOpenMenuMobile(true);
    };

    // dang xuat tai khoan
    const { refetch: refetchApiForgotPass } = useQuery({
        queryKey: ["logout"],
        queryFn: () => logout(),
        enabled: false,
    });

    // dang xuat tai khoan
    const handleLogout = () => {
        refetchApiForgotPass();
        updateUserInfoData(null);
    };
    // check thay đổi màu đường dẫn
    const checkActivePathname = (path: string) => {
        if (path === pathname) {
            return "text-red-600";
        }
        return "text-gray-700";
    };

    const accountFunction = () => {
        return (
            <div className="flex flex-col">
                {" "}
                <Link
                    onClick={hideAccountFunction}
                    href="/thong-tin-tai-khoan/tong-quan-tai-khoan"
                    className="link-account-function text-base font-medium text-gray-700 hover:text-red-600 mb-2"
                >
                    <i className="fa-solid fa-user text-red-600 mr-2"></i>
                    Thông tin tài khoản
                </Link>
                <Link
                    onClick={hideAccountFunction}
                    href="/danh-sach-bo-suu-tap"
                    className="text-base font-medium text-gray-700 hover:text-red-600 mb-2"
                >
                    <i className="fa-solid fa-car text-red-600 mr-2"></i>Ô tô đã
                    lưu
                </Link>
                <hr />
                <Link
                    onClick={() => handleLogout()}
                    href="/dang-nhap"
                    className="link-login"
                >
                    <i className="fa-solid fa-arrow-right-from-bracket text-red-600 mr-2"></i>
                    Đăng xuất
                </Link>
            </div>
        );
    };
    const renderDisplayName = () => {
        if (userInfo && userInfo.displayName) {
            return (
                <div className="cursor-pointer text-base font-medium text-orange-600">
                    <Popover
                        overlayClassName="info-user"
                        placement="bottom"
                        content={accountFunction()}
                        open={openAccountFunction}
                        onOpenChange={handleOpenAccountFunction}
                        trigger="click"
                    >
                        <span className="text-lg">
                            {userInfo.displayName}
                            <i className="fa-solid fa-chevron-down mx-2"></i>
                        </span>
                    </Popover>
                </div>
            );
        }
        return "Danh mục";
    };
    return (
        <div className="navbar-page bg-white">
            <header className="relative bg-white border-b border-gray-200">
                <nav aria-label="Top" className="px-2 sm:px-2 lg:px-10">
                    <div className="">
                        <div className="flex h-16 items-center">
                            {/* Logo */}
                            <div className="ml-4 flex lg:mr-8">
                                <div>
                                    <Link className="" href="/">
                                        <Image
                                            src={imageLogoWeb}
                                            alt="Picture of the author"
                                            className="image-logo"
                                            // width={500} automatically provided
                                            // height={500} automatically provided
                                            // blurDataURL="data:..." automatically provided
                                            // placeholder="blur" // Optional blur-up while loading
                                        />
                                    </Link>
                                </div>
                            </div>
                            {/* Flyout menus */}
                            <div className="hidden lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {userInfo && userInfo.displayName
                                        ? routes
                                              .filter((i) => i.hidden !== true)
                                              .map((item) => (
                                                  <Link
                                                      key={item.id}
                                                      href={item.path}
                                                      className={`link-route-desktop ${checkActivePathname(
                                                          item.path
                                                      )}`}
                                                  >
                                                      {item.name}
                                                  </Link>
                                              ))
                                        : routes
                                              .filter(
                                                  (i) =>
                                                      i.hidden !== true &&
                                                      i.login !== true
                                              )
                                              .map((item) => (
                                                  <Link
                                                      key={item.id}
                                                      href={item.path}
                                                      className={`link-route-desktop ${checkActivePathname(
                                                          item.path
                                                      )}`}
                                                  >
                                                      {item.name}
                                                  </Link>
                                              ))}
                                </div>
                            </div>
                            <div className="ml-auto flex items-center">
                                {userInfo && userInfo.displayName ? (
                                    <div className="flex">
                                        <div className="mr-3">
                                            <NotificationHeader />
                                        </div>
                                        <div className="display-name-header">
                                            <Popover
                                                overlayClassName="info-user"
                                                placement="bottom"
                                                content={accountFunction()}
                                                open={openAccountFunction}
                                                onOpenChange={
                                                    handleOpenAccountFunction
                                                }
                                                trigger="click"
                                            >
                                                <span>
                                                    Xin chào,{" "}
                                                    {userInfo.displayName}
                                                    <i className="fa-solid fa-chevron-down mx-2"></i>
                                                </span>
                                            </Popover>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="group-buttons-login">
                                        <Link
                                            href="/dang-nhap"
                                            className="link-route-desktop text-gray-700 "
                                        >
                                            Đăng nhập
                                        </Link>
                                        <span
                                            className="h-6 w-px bg-gray-200"
                                            aria-hidden="true"
                                        />
                                        <Link
                                            href="/dang-ki"
                                            className="link-register"
                                        >
                                            Đăng ký
                                        </Link>
                                    </div>
                                )}
                            </div>{" "}
                            {/* Mobile menu toggle, controls the 'mobileMenuOpen' state. */}
                            <button
                                type="button"
                                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={showMenuMobile}
                            >
                                <span className="sr-only">Open menu</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            </button>
                            <Drawer
                                className="navbar-mobile"
                                title={renderDisplayName()}
                                placement="right"
                                closable
                                onClose={onCloseMenuMobile}
                                open={openMenuMobile}
                                key="right"
                            >
                                <ul>
                                    {userInfo
                                        ? routes
                                              .filter((i) => i.hidden !== true)
                                              .map((item) => (
                                                  <li key={item.id}>
                                                      <i
                                                          className={`${item.icon} text-orange-600 text-2xl mr-3`}
                                                      ></i>
                                                      <Link
                                                          href={item.path}
                                                          className={`link-route-mobile ${checkActivePathname(
                                                              item.path
                                                          )}`}
                                                          onClick={
                                                              onCloseMenuMobile
                                                          }
                                                      >
                                                          {item.name}
                                                      </Link>
                                                  </li>
                                              ))
                                        : routes
                                              .filter(
                                                  (i) =>
                                                      i.hidden !== true &&
                                                      i.login !== true
                                              )
                                              .map((item) => (
                                                  <li key={item.id}>
                                                      <i
                                                          className={`${item.icon} text-orange-600 text-2xl mr-3`}
                                                      ></i>

                                                      <Link
                                                          href={item.path}
                                                          className={` link-route-mobile ${checkActivePathname(
                                                              item.path
                                                          )}`}
                                                          onClick={
                                                              onCloseMenuMobile
                                                          }
                                                      >
                                                          {item.name}
                                                      </Link>
                                                  </li>
                                              ))}
                                </ul>
                            </Drawer>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Nav;
