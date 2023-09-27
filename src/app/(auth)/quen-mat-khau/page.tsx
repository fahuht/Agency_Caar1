"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import "./index.css";

// import { Metadata } from "next";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import LoadingClient from "@/components/LoadingClient/LoadingClient";
import { notify } from "@/utils/common";

import { forgotPassword } from "./api";
import countDownTime from "./countDownTime";
import { Countdown } from "./type";


// export const metadata: Metadata = {
//   title: "Quên mật khẩu",
//   description: "",
// };

export default function page() {
  // set bộ đếm ngược
  const {
    countDown,
    startCountDown,
    stopCountDown,
    resetCountDown,
  }: Countdown = countDownTime(60);

  const baseRequest = {
    email: "",
  };
  const [dataRequest, setDataRequest] = useState(baseRequest);

  const {
    data: dataApiForgotPass,
    isLoading: isLoadingApiForgotPass,
    isFetching: isFetchingApiForgotPass,
    isError: isErrorApiForgotPass,
    // error: errorApiForgotPass,
    refetch: refetchApiForgotPass,
  } = useQuery({
    queryKey: ["forgot-pasword"],
    queryFn: () =>
      forgotPassword(
        "/security-service/api/v1/users/forgot-password",
        dataRequest
      ),
    enabled: false,
  });

  useEffect(() => {
    if (dataApiForgotPass?.data?.status === 1 && !isErrorApiForgotPass) {
      resetCountDown(60);
      startCountDown();
    }
  }, [dataApiForgotPass && !isErrorApiForgotPass]);

  useEffect(() =>{
    if(dataApiForgotPass?.data?.status === 0){
      notify(dataApiForgotPass.data.errorMsg, 'error')
    }
  },[dataApiForgotPass])

  useEffect(() => {
    if (countDown === 0) {
      stopCountDown();
    }
  }, [countDown]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    refetchApiForgotPass();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataRequest({ ...dataRequest, [e.target.name]: e.target.value });
  };

  const handleResendLink = () => {
    refetchApiForgotPass();
    resetCountDown(60);
    startCountDown();
  };

  return (
    <div className="forgot-password-container ml-12">
      <div className="forgot-password">
        <h6 className="text-3xl font-bold border-b pb-5">Quên mật khẩu</h6>
        {(!dataApiForgotPass || dataApiForgotPass?.data?.status !== 1) && (
          <form
            onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}
            className="my-[20px]"
          >
            <div className="flex flex-col justify-center">
              <label className="font-normal mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input-custom"
                disabled={isLoadingApiForgotPass && isFetchingApiForgotPass}
                onChange={(e) => handleChange(e)}
                required
              />
              {dataApiForgotPass?.data?.status === 0 && (
                <span className="text-red-600 text-xs">
                  {dataApiForgotPass?.data?.errorMsg}
                </span>
              )}
            </div>
            <div className="flex w-full mt-5 font-semibold">
              <button
                type="submit"
                disabled={isLoadingApiForgotPass && isFetchingApiForgotPass}
                className="btn-submit"
              >
                Xác nhận
                </button>
            </div>
          </form>
        )}
        {dataApiForgotPass?.data?.status === 1 && !isErrorApiForgotPass && (
          <>
            <span>
              Link xác nhận đã được gửi qua email{" "}
              <strong>{dataRequest.email}</strong>. Vui lòng kiểm tra hòm thư và
              xác nhận
            </span>
            <div className="mt-3">
              <span>
                Nhận lại link xác nhận sau:{" "}
                {countDown <= 0 ? (
                    <span
                      className="cursor-pointer second-countdown"
                      onClick={() => handleResendLink()}
                    >
                      Gửi lại link
                    </span>
                ) : (
                    <span className="second-countdown">{countDown} giây</span>
                )}
              </span>
            </div>
          </>
        )}
      </div>
     <LoadingClient isLoading={isLoadingApiForgotPass && isFetchingApiForgotPass} />
    </div>
  );
}
