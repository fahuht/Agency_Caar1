/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import "./index.css";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import LoadingClient from "@/components/LoadingClient/LoadingClient";
import { notify } from "@/utils/common";

import { activeAccount, resendEmail } from "./api";
import countDownTime from "./countdown_time";
import { Countdown } from "./type";

type Props = {
  userId: string | undefined;
};
export default function ActiveAcount({ userId }: Props) {
  const router = useRouter();
  const baseRequest = {
    activeCode: "",
  };

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
        `/security-service/api/v1/users/active-code/resend/${userId}`
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
    if (dataApiActiveAccount?.data?.status === 1 && !isErrorApiActiveAccount) {
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
    <div>
      <Link href="/">Cập nhật thông tin</Link>
      <h1 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
        Kích hoạt tài khoản
      </h1>
      <span>Mã kích hoạt đã được gửi về email của bạn!</span>
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2">
        <div>
          <label className="font-normal">
            Mã kích hoạt<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="activeCode"
            className="input-custom"
            placeholder="Mã kích hoạt"
            disabled={isLoadingApiActiveAccount && isFetchingApiActiveAccount}
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
          className="btn-register"
          disabled={isLoadingApiActiveAccount && isFetchingApiActiveAccount}
        >
          Kích hoạt
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
      <LoadingClient isLoading={isLoadingApiActiveAccount && isFetchingApiActiveAccount} />
    </div>
  );
}
