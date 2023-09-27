"use client";

import "./index.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import {
  DataRequest,
  inpurtRegisterHomePage,
  ItemInput,
  registerHomePageSchema,
} from "./constant";

function RegisterHomePage() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DataRequest>({
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      phoneNumber: "",
    },
    resolver: yupResolver(registerHomePageSchema),
  });

  const renderDefaultInput = (item: ItemInput): React.JSX.Element | null => {
    if (item.field === "email" || item.field === "phoneNumber") {
      const message = errors[item.field] && errors[item.field]?.message;
      return (
          <Controller
            name={item.field}
            control={control}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  className="input-register-home-page"
                  placeholder={item.placeHolder}
                />
                <p className="text-red-600 text-sm">{message}</p>
              </div>
            )}
          />
      );
    }
    return null;
  };

  const onSubmit = (data: DataRequest) => {
    router.push(`/dang-ki/?email=${data.email}&&numberPhone=${data.phoneNumber}`)
  }

  return (
    <section className="register-home-page-container">
      <div className="register-home-page-content ">
        <div className="col-span-1 flex justify-center reveal">
          <div className="text-title-register">
            Đăng ký trải nghiệm sớm bộ giải pháp toàn diện từ EGI ngay hôm nay
          </div>
        </div>
        <div className="col-span-1 flex justify-center">
          <div className="form-register-container reveal">
            <form>
              {inpurtRegisterHomePage.map((item) => (
                <div key={item.field}>
                  <div className="form-group mb-3">
                    <p className="mb-3 text-sm font-semibold text-grey-300">
                      {item.title}
                      <span className="text-red-600">*</span>
                    </p>
                    {renderDefaultInput(item)}
                  </div>
                </div>
              ))}

              <Button
                className="btn-register-home-page "
                onClick={handleSubmit(onSubmit)}
              >
                <div className="text-white  ">Đăng ký</div>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterHomePage;
