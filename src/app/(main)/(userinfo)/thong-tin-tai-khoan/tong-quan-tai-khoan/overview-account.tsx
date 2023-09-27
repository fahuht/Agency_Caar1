"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import useAuthStore from "@/app/store/globalStore";

export default function AccountOverview() {
    const router = useRouter();

    const linkEditUserInfo = () => {
        router.push("/thong-tin-tai-khoan/chinh-sua-ho-so");
    };
    const UserInfo = useAuthStore((state) => state.userInfo);
    return (
        <div className="">
            <div className="p-5 h-full">
                <div className="box-border p-1 lg:p-10">
                    <span className=" text-3xl font-semibold leading-10 text-stone-700">
                        Tổng quan tài khoản
                    </span>
                    <div className=" mt-4">
                        <div className=" flex justify-between border-b-2 pb-4">
                            <span className="text-xl font-semibold text-stone-700">
                                Hồ sơ
                            </span>
                            <button
                                type="button"
                                onClick={linkEditUserInfo}
                                className="self-center text-xl font-semibold text-orange-600"
                            >
                                Chỉnh sửa hồ sơ{" "}
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="col-span-2 md:col-span-1 lg:col-span-1">
                                <div className="flex flex-col my-12">
                                    <span className="leading-4 font-semibold text-stone-400">
                                        TÊN TÀI KHOẢN
                                    </span>
                                    <span className="leading-4 font-semibold mt-5 text-slate-700">
                                        {UserInfo?.displayName}
                                    </span>
                                </div>
                                <div className="flex flex-col my-12">
                                    <span className="leading-4 font-semibold text-stone-400">
                                        SỐ ĐIỆN THOẠI
                                    </span>
                                    <span className="leading-4 font-semibold mt-5 text-slate-700">
                                        {UserInfo?.phoneNumber}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1 lg:col-span-1">
                                <div className="flex flex-col mb-12 md:mt-12 lg:mt-12">
                                    <span className="leading-4 font-semibold text-stone-400">
                                        NGÀY SINH
                                    </span>
                                    <span className="leading-4 font-semibold mt-5 text-slate-700">
                                        {dayjs(UserInfo?.birthday).format(
                                            "DD-MM-YYYY"
                                        )}
                                    </span>
                                </div>
                                <div className="flex flex-col my-12">
                                    <span className="leading-4 font-semibold text-stone-400">
                                        EMAIL
                                    </span>
                                    <span className="leading-4 font-semibold mt-5 text-slate-700">
                                        {UserInfo?.email}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
