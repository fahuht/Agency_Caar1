/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import "./index.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import useGlobalStore from "@/app/store/globalStore";
import LoadingClient from "@/components/LoadingClient/LoadingClient";
import { notify } from "@/utils/common";

import { registerData } from "./api";
import { registerAccountFields, registerSchema } from "./constants";
import { DataForm, DataRequest, ItemInput, ResponseData } from "./type";

export default function RegisterAccount() {
    const [response, setResponse] = useState<ResponseData>();
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const userInfo = useGlobalStore((state) => state.userInfo);
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (userInfo?.id) {
            if (userInfo.stepActive === "0") {
                router.push(`${pathName}/cap-nhat-thong-tin`);
            } else if (userInfo.stepActive === "1") {
                router.push(`${pathName}/ma-kich-hoat`);
            }
        }
    }, [userInfo]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<DataRequest>({
        mode: "all",
        criteriaMode: "all",
        defaultValues: {
            name: "",
            password: "",
            confirmPassword: "",
        },
        resolver: yupResolver(registerSchema),
    });

    const mutationRegister = useMutation(
        (data: DataRequest) => {
            return registerData(
                `/security-service/api/v1/users/register`,
                data
            );
        },
        {
            onSuccess: (res) => {
                setResponse(res);
                if (res?.data.status === 1) {
                    router.push(
                        `${pathName}/cap-nhat-thong-tin?id=${
                            res?.data.id || ""
                        }`
                    );
                    // setStep((prev) => prev + 1);
                }
            },
            onError: () => {
                notify("Có lỗi trong quá trình truy vấn", "error");
            },
        }
    );

    // ẩn hiện password
    const togglePasswordVisibility = (field: keyof DataForm) => {
        const newShowPassword = {
            ...showPassword,
            [field]: !showPassword[field],
        };
        setShowPassword(newShowPassword);
    };

    const onSubmit = (value: DataRequest) => {
        const dataRequest = {
            name: value.name,
            password: value.password,
            confirmPassword: value.confirmPassword,
        };
        mutationRegister.mutate(dataRequest);
    };

    const renderInput = (item: ItemInput): React.JSX.Element | null => {
        if (item.field === "password" || item.field === "confirmPassword") {
            return (
                <div className="">
                    <Controller
                        name={item.field}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <div>
                                <div className="relative">
                                    <input
                                        {...field}
                                        type={
                                            showPassword[
                                                item.field as keyof DataForm
                                            ]
                                                ? "text"
                                                : "password"
                                        }
                                        disabled={mutationRegister.isLoading}
                                        className="custom-input-focus  h-14 w-full p-3"
                                        placeholder={item.placeHolder}
                                    />
                                    <span
                                        className="absolute top-1/4 right-4 translate-y-1/2 text-orange-600 flex"
                                        onClick={() =>
                                            togglePasswordVisibility(
                                                item.field as keyof DataForm
                                            )
                                        }
                                    >
                                        {showPassword[
                                            item.field as keyof DataForm
                                        ] ? (
                                            <i className="fa-sharp fa-regular fa-eye"></i>
                                        ) : (
                                            <i className="fa-sharp fa-regular fa-eye-slash"></i>
                                        )}
                                    </span>
                                </div>
                                {errors &&
                                    errors[item.field as keyof DataRequest] &&
                                    errors[item.field as keyof DataRequest]
                                        ?.message && (
                                        <p className="text-red-600 text-sm">
                                            {
                                                errors[
                                                    item.field as keyof DataRequest
                                                ]?.message
                                            }
                                        </p>
                                    )}
                            </div>
                        )}
                    />
                </div>
            );
        }

        if (item.field === "name") {
            return (
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className="custom-input-focus  h-14 w-full p-3"
                                placeholder={item.placeHolder}
                                disabled={mutationRegister.isLoading}
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                            {response?.data.status === 0 &&
                                response.data.errorMsg && (
                                    <p className="text-red-600 text-sm">
                                        {response.data.errorMsg}
                                    </p>
                                )}
                        </div>
                    )}
                />
            );
        }

        return (
            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <div>
                        <input
                            {...field}
                            type="text"
                            className="custom-input-focus  h-14 w-full p-3"
                            placeholder={item.placeHolder}
                            disabled={mutationRegister.isLoading}
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                )}
            />
        );
    };

    return (
        <div className="register-account">
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl">
                <h1 className="register-title">Tạo tài khoản ngay</h1>
                <hr className="my-4 text-grey-200" />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-1 flex flex-col gap-2"
                >
                    {registerAccountFields.map((item) => (
                        <div key={item.id}>
                            <div className="form-group mb-3">
                                <p className="mb-3 text-sm font-semibold text-grey-300">
                                    {item.placeHolder}
                                    <span className="text-red-600">*</span>
                                </p>
                                {renderInput(item)}
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="btn-register bg-orange-600"
                        disabled={mutationRegister.isLoading}
                    >
                        Đăng kí
                    </button>

                    <div className="flex flex-col items-center">
                        <span className="flex justify-center text-center p-0 opacity-60 font-semibold">
                            Bằng việc đăng kí, bạn đồng ý với chúng tôi về
                        </span>
                        <span className="text-center p-0">
                            <Link
                                className="mr-1 text-orange-600 font-semibold"
                                href="/dieu-khoan-thoa-thuan"
                            >
                                Điều khoản thoả thuận
                            </Link>
                            &
                            <Link
                                className="mx-1 text-orange-600 font-semibold"
                                href="/quy-che-hoat-dong"
                            >
                                Quy chế hoạt động
                            </Link>
                            &
                            <Link
                                href="/chinh-sach-bao-mat"
                                className="ml-1 text-orange-600 font-semibold"
                            >
                                Chính sách bảo mật
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
            <LoadingClient isLoading={mutationRegister.isLoading} />
        </div>
    );
}
