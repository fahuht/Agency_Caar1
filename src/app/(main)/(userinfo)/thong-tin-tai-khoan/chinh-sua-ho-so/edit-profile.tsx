"use client";

import "./style.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import useGlobalStore from "@/app/store/globalStore";
import { notify } from "@/utils/common";

import { apiGetInfoUser, updateInfo } from "../api";
import { RequestData } from "../type";
import { changeProfileSchema, funcDetail } from "./constant";
import { DataForm, DetailsUserInfo, ItemField } from "./type";

export default function EditProfile() {
    const router = useRouter();

    const UserInfo = useGlobalStore((state) => state.userInfo);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<DataForm>({
        mode: "all",
        criteriaMode: "all",
        defaultValues: {
            displayName: UserInfo?.displayName,
            phoneNumber: UserInfo?.phoneNumber,
        },
        resolver: yupResolver(changeProfileSchema),
    });

    const updateUserInfoData = useGlobalStore((state) => state.setUserInfo);
    const mutationUpdateInfo = useMutation((data: RequestData) =>
        updateInfo(data)
    );

    const [dataRequest, setDataRequest] = useState<DetailsUserInfo>({
        displayName: "",
        phoneNumber: "",
        email: "",
        birthday: null,
    });

    useEffect(() => {
        if (UserInfo && UserInfo?.id) {
            setDataRequest({
                ...dataRequest,
                displayName: UserInfo.displayName,
                phoneNumber: UserInfo.phoneNumber,
                email: UserInfo.email,
                birthday: UserInfo.birthday,
            });
        }
    }, [UserInfo]);

    // call api get infor user
    const mutationGetInfo = useMutation(
        () => {
            return apiGetInfoUser(`/api/me`);
        },
        {
            onSuccess: async (data) => {
                if (data && data.statusUser) {
                    await updateUserInfoData(data);
                    router.push("/tong-quan-tai-khoan");
                }
            },
            onError: () => notify("Có lỗi trong quá trình thực hiện", "error"),
        }
    );

    // cai ham nhu ten goi cua no (tra ra cac gia tri input theo field)
    const renderChangeInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        item: ItemField
    ) => {
        if (item.typeFormat === "INPUT") {
            if (item.field === "displayName" || item.field === "phoneNumber") {
                const newDataRequest = {
                    ...dataRequest,
                    [item.field]: e.target.value,
                };
                setDataRequest(newDataRequest);
            }
        }
    };

    const renderChangeInputDate = (e: Dayjs | null, item: ItemField) => {
        if (item.typeFormat === "DATE") {
            if (item.field === "birthday") {
                const newDataRequest = {
                    ...dataRequest,
                    [item.field]: e,
                };
                setDataRequest(newDataRequest);
            }
        }
    };

    // huy thay doi
    const handleBack = () => {
        router.push("/tong-quan-tai-khoan");
    };

    // lai cung ham nhu ten goi cua no (tra ra input theo field)
    const renderInput = (item: ItemField): React.JSX.Element | null => {
        if (item.typeFormat === "INPUT") {
            if (item.field === "email") {
                return (
                    <input
                        type="text"
                        onChange={(e) => renderChangeInput(e, item)}
                        className=" w-full p-4 rounded text-stone-500 custom-input cursor-not-allowed"
                        name={item.field}
                        value={(dataRequest && dataRequest[item.field]) || ""}
                        disabled
                    />
                );
            }
            if (item.field === "displayName") {
                return (
                    <>
                        <Controller
                            name={item.field}
                            control={control}
                            defaultValue={
                                (dataRequest &&
                                    dataRequest[
                                        item.field as keyof DataForm
                                    ]) ||
                                ""
                            }
                            render={({ field }) => (
                                <div className="">
                                    <input
                                        {...field}
                                        type="text"
                                        className=" w-full p-4 rounded text-stone-500 custom-input"
                                        placeholder="Tên người dùng"
                                    />
                                </div>
                            )}
                        />
                        {errors.displayName && (
                            <p className="text-orange-600 text-xs">
                                {errors.displayName.message}
                            </p>
                        )}
                    </>
                );
            }
            if (item.field === "phoneNumber") {
                return (
                    <>
                        <Controller
                            name={item.field}
                            control={control}
                            defaultValue={
                                (dataRequest &&
                                    dataRequest[
                                        item.field as keyof DataForm
                                    ]) ||
                                ""
                            }
                            render={({ field }) => (
                                <div className="">
                                    <input
                                        {...field}
                                        type="text"
                                        className=" w-full p-4 rounded text-stone-500 custom-input"
                                        placeholder="Số điện thoại"
                                    />
                                </div>
                            )}
                        />
                        {errors.phoneNumber && (
                            <p className="text-orange-600 text-xs">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </>
                );
            }
        }
        if (item.typeFormat === "DATE") {
            if (item.field === "birthday") {
                return (
                    <DatePicker
                        className=" w-full p-4 border-0 rounded custom-picker form-control flex font-medium"
                        name={item.field}
                        value={
                            (dataRequest &&
                                dataRequest[item.field] &&
                                dayjs(dataRequest[item.field])) ||
                            null
                        }
                        format="DD/MM/YYYY"
                        placeholder="Ngày sinh"
                        onChange={(e) => renderChangeInputDate(e, item)}
                    />
                );
            }
        }
        return <div></div>;
    };

    const renderDetailUserInfo = (
        item: ItemField
    ): React.JSX.Element | null => (
            <div className="flex flex-col mb-0 lg:mt-8 col-span-2 md:col-span-1 lg:col-span-1">
                <span className="leading-4 font-semibold text-slate-700 mt-5">
                    {item.title}
                </span>
                <span className="leading-4 font-semibold mt-3">
                    {renderInput(item)}
                </span>
            </div>
    );

    const onSubmit = (value: DataForm) => {
        const data: RequestData = {
            ...value,
            id: UserInfo?.id,
            email: dataRequest.email,
            birthday: dayjs(dataRequest.birthday).format("YYYY-MM-DD"),
        };
        mutationUpdateInfo.mutate(data, {
            onSuccess: (res) => {
                if (res?.status === 1) {
                    notify("Cập nhật tài khoản thành công", "success");
                    mutationGetInfo.mutate();
                }
                if (res?.status === 0) {
                    notify(`${res.errorMsg}`, "error");
                }
            },
            onError: () => {
                notify("Có lỗi trong quá trình thực hiện", "error");
            },
        });
    };

    return (
        <div className="">
            <div className="col-span-4 lg:col-span-3 bg-white box-border rounded-md block">
                <div className="p-5 h-full">
                    <div className="box-border p-1 lg:p-10">
                        <span className="text-3xl font-semibold leading-10 text-stone-700">
                            Chỉnh sửa hồ sơ
                        </span>
                        <div className=" mt-4">
                            <div className=" flex flex-col border-b-2 pb-4">
                                <span className="text-xl font-semibold text-stone-400">
                                    TÊN TÀI KHOẢN
                                </span>
                                <span className="font-semibold text-slate-700">
                                    {UserInfo?.displayName}
                                </span>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-2 gap-4">
                                    {funcDetail.map((item) =>
                                        renderDetailUserInfo(item)
                                    )}
                                </div>
                                <div className="flex justify-between lg:justify-end mt-10 w-full">
                                    <button
                                        type="submit"
                                        className="text-base bg-primary-100 mr-3 leading-5 h-10 w-16 rounded text-orange-600 font-semibold"
                                        onClick={handleBack}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="text-base bg-orange-600 leading-5 w-24 h-10 rounded-md text-white font-semibold"
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
