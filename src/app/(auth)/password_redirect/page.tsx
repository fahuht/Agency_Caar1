"use client";

/* eslint-disable react-hooks/rules-of-hooks */

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
// import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller,useForm } from "react-hook-form";
import { toast,ToastContainer } from "react-toastify";

import LoadingClient from "@/components/LoadingClient/LoadingClient";

import { updatePassword } from "./api";
import { changePasswordSchema, inputUpdatePass } from "./constants";
import {
  DataForm,
  ErrorResponse,
  ItemInput,
  RequestBody,
  ResponseData,
} from "./types";

// export const metadata: Metadata = {
//   title: "Cập nhật mật khẩu",
//   description: "",
// };

export default function page() {
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });

  // lấy email và token trên url
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // state
  const [response, setResponse] = useState<ResponseData | undefined>();
  const [error, setError] = useState<ErrorResponse | undefined>();
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });

  // thông báo khi có lỗi
  useEffect(() => {
    if (error?.status !== 500 && error?.response?.data) {
      toast.error(error?.response?.data?.errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (error?.status === 500) {
      toast.error("Lỗi hệ thống", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [error]);

  // Trigger validate khi trang được render
  useEffect(() => {
    trigger("newPassword");
  }, []);

  // call api cập nhật mật khẩu
  const mutationUpdatePassword = useMutation(
    (data: RequestBody) => {
      return updatePassword(
        `/security-service/api/v1/users/reset-password/${token}`,
        data
      );
    },
    {
      onSuccess: (data) => {
        setResponse(data);
      },
      onError: (res) => {
        setError(res);
      },
    }
  );

  const onSubmit = (value: DataForm) => {
    if (email && token) {
      const data: RequestBody = {
        ...value,
        email,
        token,
      };
      mutationUpdatePassword.mutate(data);
    }
  };

  // hiện icon check validate
  const getIconValidate = (errorText: string): React.ReactNode => {
    if (
      errors.newPassword &&
      errors.newPassword.types &&
      Array.isArray(errors.newPassword.types.matches) &&
      errors.newPassword.types.matches.includes(errorText)
    ) {
      return <div></div>;
    } if (
      errors.newPassword &&
      errors.newPassword.types &&
      errors.newPassword.types.matches === errorText
    ) {
      return <div></div>;
    }
    return <i className="fa-regular fa-circle-check text-red-600"></i>;
  };

  // ẩn hiện mật khẩu
  const togglePasswordVisibility = (field: keyof DataForm) => {
    const newShowPassword = {
      ...showPassword,
      [field]: !showPassword[field],
    };
    setShowPassword(newShowPassword);
  };

  const renderInput = (item: ItemInput) => {
    if (item.field === "newPassword") {
      return (
          <Controller
            name={item.field}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <div className="input-container">
                  <input
                    {...field}
                    type={
                      showPassword[item.field as keyof DataForm]
                        ? "text"
                        : "password"
                    }
                    disabled={mutationUpdatePassword.isLoading}
                    className="input-custom"
                    placeholder={item.placeHolder}
                  />
                  <span
                    className="icon-show-pass text-orange-600 flex"
                    onClick={() =>
                      togglePasswordVisibility(item.field as keyof DataForm)
                    }
                  >
                    {showPassword[item.field as keyof DataForm] ? (
                      <i className="fa-sharp fa-regular fa-eye-slash"></i>
                      ) : (
                      <i className="fa-regular fa-eye"></i>
                    )}
                  </span>
                </div>
                {/* {errors.newPassword && <p>{errors.newPassword.message}</p>} */}
                <div>
                  <ul className="mt-1">
                    <li className="flex items-center">
                      {!errors.newPassword?.types?.min && (
                        <i className="fa-regular fa-circle-check text-red-600"></i>
                      )}
                      <span className="ml-2 text-red-600 text-xs">
                        Mật khẩu có ít nhất 8 ký tự
                      </span>
                    </li>
                    <li className="flex items-center">
                      {getIconValidate(
                        "Mật khẩu phải chứa ít nhất một ký tự in hoa"
                      )}
                      <span className="ml-2 text-red-600 text-xs">
                        Chứa ít nhất 1 ký tự viết hoa
                      </span>
                    </li>
                    <li className="flex items-center">
                      {getIconValidate(
                        "Mật khẩu phải chứa ít nhất một ký tự viết thường"
                      )}

                      <span className="ml-2 text-red-600 text-xs">
                        Chứa ít nhất 1 ký tự viết thường
                      </span>
                    </li>
                    <li className="flex items-center">
                      {getIconValidate(
                        "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"
                      )}

                      <span className="ml-2 text-red-600 text-xs">
                        Chứa ít nhất 1 ký tự đặc biệt
                      </span>
                    </li>
                    <li className="flex items-center">
                      {getIconValidate("Mật khẩu phải chứa ít nhất một số")}

                      <span className="ml-2 text-red-600 text-xs">
                        Chứa ít nhất 1 ký tự số
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          />
      );
    }
    return (
        <Controller<DataForm>
          name={item.field as keyof DataForm}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div>
              <div className="input-container">
                <input
                  {...field}
                  type={
                    showPassword[item.field as keyof DataForm]
                      ? "text"
                      : "password"
                  }
                  disabled={mutationUpdatePassword.isLoading}
                  className="input-custom"
                  placeholder={item.placeHolder}
                />
                <span
                  className="icon-show-pass text-orange-600 flex"
                  onClick={() =>
                    togglePasswordVisibility(item.field as keyof DataForm)
                  }
                >
                  {" "}
                  {showPassword[item.field as keyof DataForm] ? (
                    <i className="fa-sharp fa-regular fa-eye-slash"></i>
                    ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </span>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-600 text-xs">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
          )}
        />
    );
  };
  return (
    <div>
      <ToastContainer />
      <div className="update-password-container">
        <div className="update-password">
          {response?.data?.status === 1 ? (
              <div className="flex flex-col gap-3">
                <i className="fa-regular fa-circle-check text-5xl text-left text-green-600"></i>
                <span className="text-3xl font-bold">
                  Cập nhật mật khẩu thành công
                </span>
                <Link className="btn-link" href="/dang-nhap">
                  Đăng nhập ngay
                </Link>
              </div>
          ) : (
            <>
              <h3 className="text-3xl font-bold">Cập nhật mật khẩu</h3>
              {token && email && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-5 flex flex-col gap-2"
                >
                  {inputUpdatePass.map((item) => (
                    <div key={item.field}>
                      <div>{item.placeHolder}:</div>
                      {renderInput(item)}
                    </div>
                  ))}
                  <div className="flex w-full">
                    <button
                      type="submit"
                      disabled={mutationUpdatePassword.isLoading}
                      className="btn-submit"
                    >
                      Xác nhận
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
      <LoadingClient isLoading={mutationUpdatePassword.isLoading} />
    </div>
  );
}
