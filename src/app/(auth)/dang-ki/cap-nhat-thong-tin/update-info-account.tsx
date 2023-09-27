/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import "../index.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import useGlobalStore from "@/app/store/globalStore";
import { notify } from "@/utils/common";

import Loading from "../../loading";
import { updateInfo } from "../api";
import { fieldsUpdateInfo, validateUpdateInfo } from "../constants";
import { DataUpdate, ItemInput, ResponseData } from "../type";

export default function UpdateInfoAccount() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const numberPhone = searchParams.get("numberPhone");
    const getId = searchParams.get("id");
    const [response, setResponse] = useState<ResponseData>();
    const [dataUpdateAccount, setDataUpdateAccount] = useState<DataUpdate>({
        id: "",
        displayName: "",
        phoneNumber: "",
        birthday: null,
        email: "",
    });

    const {
        control,
        handleSubmit,
        setValue,
        register,
        formState: { errors },
    } = useForm<DataUpdate>({
        mode: "all",
        criteriaMode: "all",
        defaultValues: {
            displayName: "",
            phoneNumber: numberPhone || "",
            birthday: null,
            email: email || "",
        },
        resolver: yupResolver(validateUpdateInfo),
    });

    const userInfo = useGlobalStore((state) => state.userInfo);
    const router = useRouter();
    const mutationRegister = useMutation(
        (data: DataUpdate) => {
            return updateInfo(
                `/security-service/api/v1/users/register-update-infor/${
                    data.id || userInfo?.id
                }`,
                data
            );
        },
        {
            onSuccess: (res) => {
                if (res?.data.status === 1) {
                    notify("Cập nhật thông tin thành công !", "success");
                    router.push(`/dang-ki/ma-kich-hoat?id=${getId}`);
                }
                setResponse(res);
            },
            onError: () => {
                notify("Có lỗi trong quá trình truy vấn", "error");
            },
        }
    );

    const onSubmit = (value: DataUpdate) => {
        const dataUpdate = {
            id: getId || "",
            displayName: value.displayName,
            phoneNumber: value.phoneNumber,
            birthday:
                value.birthday && dayjs(value.birthday).format("YYYY-MM-DD"),
            email: value.email,
        };
        mutationRegister.mutate(dataUpdate);
    };

    const handleChangeDate = (
        date: DatePickerProps["value"],
        item: ItemInput
    ): void => {
        // trigger('birthday')
        setValue("birthday", date);
        setDataUpdateAccount({
            ...dataUpdateAccount,
            [item.field]: date,
        });
    };

    const validatePostDate = (current: any) =>
        current && current >= dayjs().endOf("day");

    const renderInput = (item: ItemInput, type: string) => {
        if (type === "updateInfoAccount") {
            if (item.field === "birthday") {
                return (
                    <>
                        <DatePicker
                            {...register("birthday")}
                            value={dataUpdateAccount.birthday}
                            disabledDate={(current) =>
                                validatePostDate(current)
                            }
                            format="DD-MM-YYYY"
                            placeholder={item.placeHolder}
                            name={item.field}
                            className="custom-input-focus border-0 date-picker-custom"
                            onChange={(date) => handleChangeDate(date, item)}
                            inputReadOnly
                        />
                        {errors &&
                            errors[item.field] &&
                            errors[item.field]?.message && (
                                <span className="text-red-600 text-sm">
                                    {String(errors?.birthday?.message || "")}
                                </span>
                            )}
                    </>
                );
            }
            if (item.field === "phoneNumber") {
                return (
                    <Controller
                        name={item.field}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <div>
                                <input
                                    {...field}
                                    type="text"
                                    className="custom-input-focus"
                                    placeholder={item.placeHolder}
                                    disabled={mutationRegister.isLoading}
                                />
                                {errors.phoneNumber && (
                                    <p className="text-red-600 text-sm">
                                        {errors.phoneNumber.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                );
            }

            if (item.field === "displayName") {
                return (
                    <Controller
                        name={item.field}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <div>
                                <input
                                    {...field}
                                    type="text"
                                    name="displayName"
                                    className="custom-input-focus"
                                    placeholder={item.placeHolder}
                                    disabled={mutationRegister.isLoading}
                                />
                                {errors.displayName && (
                                    <p className="text-red-600 text-sm">
                                        {errors.displayName.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                );
            }

            if (item.field === "email") {
                return (
                    <Controller
                        name={item.field}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <div>
                                <input
                                    {...field}
                                    type="email"
                                    name="email"
                                    className="custom-input-focus"
                                    placeholder={item.placeHolder}
                                    disabled={mutationRegister.isLoading}
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-sm">
                                        {errors.email.message}
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
        }

        return (
            <input
                type="text"
                placeholder={item.placeHolder}
                className="custom-input-focus"
                name={item.field}
            />
        );
    };
    return (
        <div className=" form-update-info mt-4">
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl">
                <Link href="/dang-nhap">Thông tin đăng kí</Link>
                <h1 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
                    Cập nhật thông tin
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-5 flex flex-col gap-2"
                >
                    {fieldsUpdateInfo.map((item) => (
                        <div key={item.field}>
                            <div className="mb-4">
                                <div className="mb-2">
                                    {item.placeHolder}
                                    <span className="text-red-600">*</span>
                                </div>
                                {renderInput(item, "updateInfoAccount")}
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="btn-register bg-orange-600"
                        disabled={mutationRegister.isLoading}
                    >
                        {mutationRegister.isLoading ? <Loading /> : "Cập nhật"}
                    </button>
                </form>
            </div>
        </div>
    );
}
