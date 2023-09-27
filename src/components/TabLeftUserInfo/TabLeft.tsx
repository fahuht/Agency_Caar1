/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import "./index.css";

import { useMutation, useQuery } from "@tanstack/react-query";
import type { MenuProps } from "antd";
import { Dropdown, Input, Modal } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
    deleteAccount,
    logout,
} from "@/app/(main)/(userinfo)/thong-tin-tai-khoan/api";
import { funcInfo } from "@/app/(main)/(userinfo)/thong-tin-tai-khoan/constant";
import { DataDelete } from "@/app/(main)/(userinfo)/thong-tin-tai-khoan/type";
import useGlobalStore from "@/app/store/globalStore";
import avatar from "@/public/assets/images/avtz.jpg";
import { notify } from "@/utils/common";

export default function TabLeft() {
    const updateUserInfoData = useGlobalStore((state) => state.setUserInfo);
    const tabName = usePathname();

    const router = useRouter();
    // dang xuat tai khoan
    const { data: dataApiLogout, refetch: refetchApiForgotPass } = useQuery({
        queryKey: ["logout"],
        queryFn: () => logout(),
        enabled: false,
    });

    // xoa tai khoan
    const mutationDelete = useMutation((data: DataDelete) =>
        deleteAccount(data)
    );
    const UserInfo = useGlobalStore((state) => state.userInfo);

    const [tabActive, setTabActive] = useState(1);
    const [nameActive, setNameActive] = useState<React.JSX.Element>(
        <>
            <i className="fa-regular fa-house" /> Tổng quan tài khoản
        </>
    );

    // state modal dang xuat
    const [isShowModalLogout, setIsShowModalLogout] = useState(false);
    // state modal xoa tai khoan
    const [isShowModalDeleteAccount, setIsShowModalDeleteAccount] =
        useState(false);
    const [dataDeleteAccount, setDataDeleteAccount] = useState<DataDelete>({
        name: UserInfo?.username || "",
        password: "",
    });
    const activeTab = (item: number) => {
        setTabActive(item);
    };

    useEffect(() => {
        if (tabName === "/thong-tin-tai-khoan/tong-quan-tai-khoan") {
            setTabActive(1);
        }
        if (tabName === "/thong-tin-tai-khoan/chinh-sua-ho-so") {
            setTabActive(2);
        }
        if (tabName === "/thong-tin-tai-khoan/thay-doi-mat-khau") {
            setTabActive(3);
        }
        return () => { }
    }, [tabName]);

    useEffect(() => {
        if (dataApiLogout?.status === 1) {
            const data = null;
            updateUserInfoData(data);
            router.push("/dang-nhap");
        }
        if (dataApiLogout?.status === 0) {
            notify(dataApiLogout.errorMsg, "error");
        }
    }, [dataApiLogout]);

    const copyUserName = () => {
        if (UserInfo?.username) {
            notify("Sao chép tên tài khoản thành công", "success");
            return navigator.clipboard.writeText(UserInfo?.username);
        }
        return "";
    };

    const showModal = (type: string) => {
        if (type === "logout") {
            setIsShowModalLogout(true);
        } else {
            setIsShowModalDeleteAccount(true);
        }
    };

    const handleCancelModal = (type: string) => {
        if (type === "logout") {
            setIsShowModalLogout(false);
        } else {
            setIsShowModalDeleteAccount(false);
        }
    };

    const onChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDataDeleteAccount((item) => ({
            ...item,
            password: value,
        }));
    };

    const valueModalDelete = (value: string | undefined): React.JSX.Element => {
        if (value === "WEBAPP") {
            return (
                <>
                    <div className="flex flex-col mt-4">
                        <span className="mb-2">Tên tài khoản</span>
                        <input
                            type="text"
                            className="cursor-not-allowed h-10 text-base mb-2"
                            value={UserInfo?.username}
                            maxLength={70}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col mt-4 mb-12">
                        <span className="mb-2">Mật khẩu hiện tại</span>
                        <Input.Password
                            autoComplete="off"
                            type="password"
                            name="currentPassword"
                            className="h-10 text-base form-control"
                            placeholder="Mật khẩu hiện tại"
                            value={dataDeleteAccount.password}
                            onChange={(e) => onChangeInputPassword(e)}
                            maxLength={32}
                        />
                    </div>
                </>
            );
        }
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <></>;
    };

    // dang xuat tai khoan
    const handleLogout = () => {
        setIsShowModalLogout(false);
        refetchApiForgotPass();
    };

    // xoa tai khoan
    const handleDeleteAccount = () => {
        if (UserInfo && UserInfo?.userType === "WEBAPP") {
            mutationDelete.mutate(dataDeleteAccount, {
                onSuccess: (res) => {
                    if (res?.status === 1) {
                        notify("Xóa tài khoản thành công", "success");
                        const data = null;
                        updateUserInfoData(data);
                        router.push("/dang-nhap");
                    }
                },
            });
        }
    };

    const renderClass = (value: number) => {
        if (tabActive === value) {
            return "border-l-2 border-l-orange-600 bg-primary-100 cursor-pointer";
        }
        return "cursor-pointer";
    };
    const renderClassSpan = (value: number) => {
        if (tabActive === value) {
            return "font-semibold text-orange-600";
        }
        return "font-semibold text-gray-700";
    };

    const handleOnClick = (item: any) => {
        activeTab(item.status);
        router.push(item.url);
    };
    const items: MenuProps["items"] = [
        {
            label: (
                <div className="text-orange-600 font-semibold">
                    <i className="fa-regular fa-house" /> Tổng quan tài khoản
                </div>
            ),
            key: "1",
        },
        {
            label: (
                <div className="text-orange-600 font-semibold">
                    <i className="fa-regular fa-user" /> Chỉnh sửa hồ sơ
                </div>
            ),
            key: "2",
        },
        {
            label: (
                <div className="text-orange-600 font-semibold">
                    <i className="fa-regular fa-lock" /> Thay đổi mật khẩu
                </div>
            ),
            key: "3",
        },
        {
            label: (
                <div className="text-orange-600 font-semibold">
                    <i className="fa-regular fa-x" /> Xóa tài khoản
                </div>
            ),
            key: "4",
        },
        {
            label: (
                <div className="text-orange-600 font-semibold">
                    <i className="fa-regular fa-arrow-right-from-bracket" />{" "}
                    Thoát
                </div>
            ),
            key: "5",
        },
    ];

    const handleMenuClick: MenuProps["onClick"] = (e) => {
        if (e.key === "1") {
            setNameActive(
                <>
                    <i className="fa-regular fa-house" /> Tổng quan tài khoản
                </>
            );
            router.push("/thong-tin-tai-khoan/tong-quan-tai-khoan");
        }
        if (e.key === "2") {
            setNameActive(
                <>
                    <i className="fa-regular fa-user" /> Chỉnh sửa hồ sơ
                </>
            );
            router.push("/thong-tin-tai-khoan/chinh-sua-ho-so");
        }
        if (e.key === "3") {
            setNameActive(
                <>
                    <i className="fa-regular fa-lock" /> Thay đổi mật khẩu
                </>
            );
            router.push("/thong-tin-tai-khoan/thay-doi-mat-khau");
        }
        if (e.key === "4") {
            setIsShowModalDeleteAccount(true);
        }
        if (e.key === "5") {
            setIsShowModalLogout(true);
        }
    };

    const menuDropdown = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <div className="label-sidebar block  col-span-4 lg:col-span-1 bg-white box-border rounded-md">
                <div className="sidebar-header flex items-center relative m-6 lg:mt-12 border-b-2 pb-4 lg:pb-14">
                    <img
                        src={avatar.src}
                        className="w-16 h-16 img-avatar"
                        alt=""
                    />
                    <div className="sb-header-content ml-3">
                        <p className="m-0 text-stone-600 font-semibold">
                            {UserInfo?.displayName}
                        </p>
                        <div className="sb-header-spi flex mt-1  text-stone-400 cursor-pointer">
                            <span className="mr-2">{UserInfo?.username}</span>
                            <i
                                className="fa-light fa-clone"
                                onClick={() => copyUserName()}
                            />
                        </div>
                    </div>
                </div>
                <div className="sidebar-body my-10 hidden lg:block">
                    {funcInfo.map((item) => (
                        <div
                            className={renderClass(item.status)}
                            onClick={() => handleOnClick(item)}
                            aria-hidden
                            key={item.url}
                        >
                            <div className="text-base pt-6 pb-3 pl-6 border-b-2 ml-3 border-b-gray-300 w-11/12">
                                <i
                                    className={`${item.icon} mx-4 text-orange-600`}
                                />
                                <span className={renderClassSpan(item.status)}>
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div
                        className="cursor-pointer"
                        onClick={() => showModal("delete")}
                    >
                        <div className="text-base pt-6 pb-3 pl-6 border-b-2 ml-3 border-b-gray-300 w-11/12">
                            <i className="fa-regular fa-x mx-4 text-orange-600" />
                            <span className="font-semibold text-gray-700">
                                Xóa tài khoản
                            </span>
                        </div>
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={() => showModal("logout")}
                    >
                        <div className="text-base pt-6 pb-3 pl-6 ml-3 border-b-gray-300 w-11/12">
                            <i className="fa-regular fa-arrow-right-from-bracket mx-4 text-orange-600" />
                            <span className="font-semibold text-gray-700">
                                Đăng xuất
                            </span>
                        </div>
                    </div>
                </div>
                {/* responsive tab mobile */}
                <div className="sidebar-body my-5 lg:my-10 ml-6 block lg:hidden">
                    <Dropdown
                        menu={menuDropdown}
                        className="font-semibold flex justify-between text-orange-600 text-base lg:pt-6 lg:pb-3 lg:pl-6 lg:border-b-2 lg:ml-3 border-b-gray-300 w-11/12"
                    >
                        <div className="">
                            <span className="font-semibold text-orange-600">
                                {nameActive}
                            </span>
                            <i className="fa-regular fa-chevron-down"></i>
                        </div>
                    </Dropdown>
                </div>
            </div>
            <Modal
                title="Cảnh báo đăng xuất ?"
                okText="Đăng xuất"
                cancelText="Hủy bỏ"
                open={isShowModalLogout}
                onOk={handleLogout}
                onCancel={() => handleCancelModal("logout")}
                wrapClassName="modal-logout-user"
            >
                <p>Bạn có chắc chắn muốn đăng xuất</p>
            </Modal>

            <Modal
                title="Xóa tài khoản"
                okText="Đồng ý"
                cancelText="Hủy bỏ"
                open={isShowModalDeleteAccount}
                onOk={handleDeleteAccount}
                onCancel={() => handleCancelModal("delete")}
                wrapClassName="modal-delete-user"
            >
                <p>
                    Khi thực hiện xóa tài khoản, tài khoản của bạn sẽ không được
                    sử dụng các dịch vụ của chúng tôi !
                </p>
                {valueModalDelete(UserInfo?.userType)}
            </Modal>
        </>
    );
}
