import "./index.css";

import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import AppStore from "@/public/assets/images/get-it-appstore.png";
import GooglePlay from "@/public/assets/images/get-it-google.png";

import { DataFormRedirectRegister } from "../../type";

export interface Props {
  openModalRegister: boolean;
  setOpenModalRegister: (value: boolean) => void;
}

export default function ModalRedirectRegister({
  openModalRegister,
  setOpenModalRegister,
}: Props) {
  const router = useRouter();
  const baseDataForm = {
    email: "",
    phoneNumber: "",
  };

  const [dataForm, setDataForm] =
    useState<DataFormRedirectRegister>(baseDataForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      title=""
      open={openModalRegister}
      onCancel={() => setOpenModalRegister(false)}
      footer={<div className="flex gap-3 justify-end"></div>}
      width={window.innerWidth > 768 ? "50%" : "95%"}
    >
      <div className="p-2 mt-2">
        <div className="flex justify-center">
          <span className="text-title-register ">
            Đăng ký trải nghiệm sớm bộ giải pháp toàn diện từ EGI ngay hôm nay
          </span>
        </div>
        <div className="mt-2 flex flex-col md:flex-row gap-2">
          <input
            className="input-custom"
            name="email"
            type="text"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="input-custom"
            name="phoneNumber"
            type="text"
            placeholder="Số điện thoại"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mt-4">
          <button
            className="h-12 rounded w-full bg-orange-600 text-white"
            type="button"
            onClick={() =>
              router.push(
                `/dang-ki?email=${dataForm.email || ""}&&numberPhone=${
                  dataForm.phoneNumber || ""
                }`
              )
            }
          >
            Đăng ký
          </button>
        </div>
        <div className="flex justify-center items-center flex-col mt-3">
          <hr className="mt-3 border border-gray-400 w-1/2" />
          <span className="text-base text-orange-600 font-bold mt-3">
            Tải ứng dụng
          </span>
          <div className="mt-3 grid grid-cols-2">
            <Link href="/" className="col-span-2 md:col-span-1 flex p-2 h-16">
              <img src={AppStore.src} className="w-100" />
            </Link>
            <Link href="/" className="col-span-2 md:col-span-1 flex p-2 h-16">
              <img src={GooglePlay.src} className="w-100" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
