/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import "../index.css";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { notify } from "@/utils/common";

import Loading from "../../loading";
import { activeAccount, resendEmail } from "../api";
import countDownTime from "../countdown_time";
import { Countdown } from "../type";

export default function ActiveAcount() {
    const router = useRouter();
    const baseRequest = {
        activeCode: "",
    };
    const searchParams = useSearchParams();
    const getId = searchParams.get("id");

    const [dataRequest, setDataRequest] = useState(baseRequest);
    const [inputError, setInputError] = useState<string | null>(null);

    //Kích hoạt tài khoản
    const {
        data: dataApiActiveAccount,
        isLoading: isLoadingApiActiveAccount,
        isFetching: isFetchingApiActiveAccount,
        isError: isErrorApiActiveAccount,
        refetch: refetApiActiveAccount,
    } = useQuery({
        queryKey: ["active-account"],
        queryFn: () =>
            activeAccount(
                "/security-service/api/v1/users/check-active-code",
                dataRequest
            ),
        enabled: false,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!dataRequest.activeCode) {
            setInputError("Mã kích hoạt không được để trống");
        } else {
            setInputError(null);
            refetApiActiveAccount();
        }
    };
    //Resend Email
    const { refetch: refetApiResendEmail } = useQuery({
        queryKey: ["resend-email"],
        queryFn: () =>
            resendEmail(
                `/security-service/api/v1/users/active-code/resend/${getId}`
            ),
        enabled: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataRequest({ ...dataRequest, [e.target.name]: e.target.value });
    };

    const {
        countDown,
        startCountDown,
        stopCountDown,
        resetCountDown,
    }: Countdown = countDownTime(60);

    useEffect(() => {
        resetCountDown(60);
        startCountDown();
    }, []);

    useEffect(() => {
        if (
            dataApiActiveAccount?.data?.status === 1 &&
            !isErrorApiActiveAccount
        ) {
            notify(
                "Đăng kí tài khoản thành công, vui lòng đăng nhập để sử dụng dịch vụ",
                "success"
            );
            router.push("/dang-nhap");
        }
    }, [dataApiActiveAccount]);

    useEffect(() => {
        if (countDown === 0) {
            stopCountDown();
        }
    }, [countDown]);

    const handleResendLink = () => {
        refetApiResendEmail();
        resetCountDown(60);
        startCountDown();
    };

    return (
        <div className="form-activation-key mt-4">
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl">
                <Link href="/">Cập nhật thông tin</Link>
                <h1 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
                    Kích hoạt tài khoản
                </h1>
                <span>Mã kích hoạt đã được gửi về email của bạn!</span>
                <form
                    onSubmit={handleSubmit}
                    className="mt-5 flex flex-col gap-2"
                >
                    <div>
                        <label className="font-normal">
                            Mã kích hoạt<span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="activeCode"
                            className="custom-input-focus border-0"
                            placeholder="Mã kích hoạt"
                            disabled={
                                isLoadingApiActiveAccount &&
                                isFetchingApiActiveAccount
                            }
                            onChange={(e) => handleChange(e)}
                        />
                        {inputError && (
                            <div className="error-message text-red-600 text-sm">
                                {inputError}
                            </div>
                        )}
                        {dataApiActiveAccount?.data?.status === 0 && (
                            <span className="text-red-600 text-sm">
                                {dataApiActiveAccount?.data?.errorMsg}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn-register bg-orange-550"
                        disabled={
                            isLoadingApiActiveAccount &&
                            isFetchingApiActiveAccount
                        }
                    >
                        {isLoadingApiActiveAccount &&
                        isFetchingApiActiveAccount ? (
                            <Loading />
                        ) : (
                            "Kích hoạt"
                        )}
                    </button>
                </form>
                <div>
                    {countDown <= 0 ? (
                        <span>
                            Chưa nhận được mã xác thực?
                            <a
                                className="cursor-pointer text-orange-600 font-semibold"
                                onClick={() => handleResendLink()}
                            >
                                Nhận lại mã kích hoạt ngay!
                            </a>
                        </span>
                    ) : (
                        <div>
                            Gửi lại mã kích hoạt sau:{" "}
                            <span className="text-orange-600 font-semibold">
                                {countDown} giây
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
