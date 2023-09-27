/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import "./style.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { notify } from "@/utils/common";

import { updatePassword } from "../api";
import { changePasswordSchema } from "./contant";
import { DataForm, RequestBody } from "./type";

export default function ChangePassword() {
    const router = useRouter();
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
            currentPassword: "",
        },
        resolver: yupResolver(changePasswordSchema),
    });

    const mutationUpdatePassword = useMutation((data: RequestBody) =>
        updatePassword(data)
    );

    // Trigger validate khi trang được render
    useEffect(() => {
        trigger("newPassword");
    }, []);

    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmNewPassword: false,
        currentPassword: false,
    });

    const onSubmit = (value: DataForm) => {
        const data: RequestBody = {
            ...value,
        };
        mutationUpdatePassword.mutate(data, {
            onSuccess: (res) => {
                if (res?.status === 0) {
                    notify(`${res.errorMsg}`, "error");
                } else if (res?.status === 1) {
                    notify("Cập nhật mật khẩu thành công", "success");
                    router.push("/thong-tin-ca-nhan/tong-quan-tai-khoan");
                }
            },
            onError: () => {
                notify("Có lỗi trong quá trình thực hiện", "error");
            },
        });
    };

    // ẩn hiện mật khẩu
    const togglePasswordVisibility = (field: keyof DataForm) => {
        const newShowPassword = {
            ...showPassword,
            [field]: !showPassword[field],
        };
        setShowPassword(newShowPassword);
    };

    // hiện icon check validate
    const getIconValidate = (errorText: string): React.ReactNode => {
        if (
            errors.newPassword &&
            errors.newPassword.types &&
            Array.isArray(errors.newPassword.types.matches) &&
            errors.newPassword.types.matches.includes(errorText)
        ) {
            return (
                <i className="fa-sharp fa-regular fa-circle-check text-orange-550"></i>
            );
        } 
        if (
            errors.newPassword &&
            errors.newPassword.types &&
            errors.newPassword.types.matches === errorText
        ) {
            return (
                <i className="fa-sharp fa-regular fa-circle-check text-orange-550"></i>
            );
        }
        return (
            <i className="fa-sharp fa-solid fa-circle-check text-orange-550"></i>
        );
    };

    return (
        <div className="">
            <div className="p-5 h-full">
                <div className="box-border p-1 lg:p-10">
                    <span className="text-3xl font-semibold leading-10 text-stone-700">
                        Thay đổi mật khẩu
                    </span>
                    <form
                        className="form-update-password mt-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="grid gap-4 grid-cols-4 mt-3">
                            <p className="text-lg col-span-4 lg:col-span-1 font-semibold text-stone-700">
                                Xác thực
                            </p>
                            <div className="col-span-4 lg:col-span-3">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-stone-600 mb-2">
                                        Mật khẩu hiện tại
                                    </span>
                                    <Controller
                                        name="currentPassword"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="input-container">
                                                <input
                                                    {...field}
                                                    type={
                                                        showPassword.currentPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    disabled={
                                                        mutationUpdatePassword.isLoading
                                                    }
                                                    className="input-custom"
                                                    placeholder="Mật khẩu hiện tại"
                                                />
                                                <span
                                                    className="icon-show-pass text-orange-600 flex"
                                                    onClick={() =>
                                                        togglePasswordVisibility(
                                                            "currentPassword"
                                                        )
                                                    }
                                                >
                                                    {showPassword.currentPassword ? (
                                                        <i className="fa-sharp fa-regular fa-eye"></i>
                                                    ) : (
                                                        <i className="fa-sharp fa-regular fa-eye-slash"></i>
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    />
                                    {errors.currentPassword && (
                                        <p className="text-orange-600 text-xs">
                                            {errors.currentPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4 grid-cols-4 mt-9">
                            <p className="text-lg col-span-4 lg:col-span-1 font-semibold text-stone-700">
                                Cập nhật mật khẩu mới
                            </p>
                            <div className="col-span-4 lg:col-span-3">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-stone-600">
                                        Mật khẩu mới
                                    </span>
                                    <Controller
                                        name="newPassword"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div>
                                                <div className="input-container">
                                                    <input
                                                        {...field}
                                                        type={
                                                            showPassword.newPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        disabled={
                                                            mutationUpdatePassword.isLoading
                                                        }
                                                        className="input-custom"
                                                        placeholder="Mật khẩu mới"
                                                    />
                                                    <span
                                                        className="icon-show-pass text-orange-600 flex"
                                                        onClick={() =>
                                                            togglePasswordVisibility(
                                                                "newPassword"
                                                            )
                                                        }
                                                    >
                                                        {showPassword.newPassword ? (
                                                            <i className="fa-sharp fa-regular fa-eye"></i>
                                                        ) : (
                                                            <i className="fa-sharp fa-regular fa-eye-slash"></i>
                                                        )}
                                                    </span>
                                                </div>
                                                <div>
                                                    <ul className="mt-1">
                                                        <li className="flex items-center">
                                                            {!errors.newPassword
                                                                ?.types?.min ? (
                                                                // <CheckCircleOutlined className="text-orange-600" />
                                                                <i className="fa-sharp fa-solid fa-circle-check text-orange-550"></i>
                                                            ) : (
                                                                <i className="fa-sharp fa-regular fa-circle-check text-orange-550"></i>
                                                            )}
                                                            <span className="ml-2 font-semibold leading-5 text-gray-600">
                                                                Mật khẩu có ít
                                                                nhất 8 ký tự
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center">
                                                            {getIconValidate(
                                                                "Mật khẩu phải chứa ít nhất một ký tự in hoa"
                                                            )}
                                                            <span className="ml-2 font-semibold leading-5 text-gray-600">
                                                                Chứa ít nhất 1
                                                                ký tự viết hoa
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center">
                                                            {getIconValidate(
                                                                "Mật khẩu phải chứa ít nhất một ký tự viết thường"
                                                            )}

                                                            <span className="ml-2 font-semibold leading-5 text-gray-600">
                                                                Chứa ít nhất 1
                                                                ký tự viết
                                                                thường
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center">
                                                            {getIconValidate(
                                                                "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"
                                                            )}

                                                            <span className="ml-2 font-semibold leading-5 text-gray-600">
                                                                Chứa ít nhất 1
                                                                ký tự đặc biệt
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center">
                                                            {getIconValidate(
                                                                "Mật khẩu phải chứa ít nhất một số"
                                                            )}

                                                            <span className="ml-2 font-semibold leading-5 text-gray-600">
                                                                Chứa ít nhất 1
                                                                ký tự số
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <span className="mt-9 mb-2 font-semibold text-stone-600">
                                        Nhập lại mật khẩu mới
                                    </span>
                                    <Controller
                                        name="confirmNewPassword"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="input-container">
                                                <input
                                                    {...field}
                                                    type={
                                                        showPassword.confirmNewPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    disabled={
                                                        mutationUpdatePassword.isLoading
                                                    }
                                                    className="input-custom"
                                                    placeholder="Mật khẩu hiện tại"
                                                />
                                                <span
                                                    className="icon-show-pass text-orange-600 flex"
                                                    onClick={() =>
                                                        togglePasswordVisibility(
                                                            "confirmNewPassword"
                                                        )
                                                    }
                                                >
                                                    {showPassword.confirmNewPassword ? (
                                                        <i className="fa-sharp fa-regular fa-eye"></i>
                                                    ) : (
                                                        <i className="fa-sharp fa-regular fa-eye-slash"></i>
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    />
                                    {errors.confirmNewPassword && (
                                        <p className="text-orange-600 text-xs">
                                            {errors.confirmNewPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between lg:justify-end mt-10">
                            <button
                                type="submit"
                                className="text-base bg-primary-100 mr-3 leading-5 h-10 w-16 rounded-md text-orange-600 font-semibold"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="text-base bg-orange-600 leading-5 w-40 h-10 rounded-md text-white font-semibold"
                            >
                                Đặt lại mật khẩu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
