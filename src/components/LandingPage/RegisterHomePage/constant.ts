import * as yup from "yup";

import { regexType } from "@/utils/constants";

export const inpurtRegisterHomePage = [
  {
    field: "email",
    placeHolder: "Nhập địa chỉ email",
    title: "Địa chỉ email",
    regex: regexType.email,
  },
  {
    field: "phoneNumber",
    placeHolder: "Nhập số điện thoại",
    title: "Số điện thoại",
    regex: regexType.numberPhone1,
  },
];

export const registerHomePageSchema = yup.object().shape({
  email: yup
    .string()
    .required("Vui lòng nhập Email")
    .matches(regexType.email, "Vui lòng nhập đúng định dạng Email"),
  phoneNumber: yup
    .string()
    .required("Vui lòng nhập Số điện thoại")
    .matches(regexType.numberPhone1, "Dữ liệu không hợp lệ"),
});

export type ItemInput = {
  field: string,
  placeHolder: string,
  title: string,
};

export type DataRequest = {
  email: string;
  phoneNumber: string;
};