import * as yup from "yup";

import { ItemField } from "./type";

export const funcDetail: ItemField[] = [
    {
        title: "Tên người dùng",
        field: "displayName",
        typeFormat: "INPUT",
        valueFormat: "",
        typeRender: "lable"
    },
    {
        title: "Ngày sinh",
        field: "birthday",
        typeFormat: "DATE",
        valueFormat: "YYYY-MM-DD",
        typeRender: "lable"
    },
    {
        title: "Số điện thoại",
        field: "phoneNumber",
        typeFormat: "INPUT",
        valueFormat: "",
        typeRender: "lable"
    },
    {
        title: "Email",
        field: "email",
        typeFormat: "INPUT",
        valueFormat: "",
        typeRender: "lable"
    },
]

export const changeProfileSchema = yup.object().shape({
    displayName: yup
      .string()
      .required("Vui lòng nhập thông tin của bạn."),
      phoneNumber: yup
      .string()
      .matches(/^\d+$/, "Chỉ nhập ký tự số.")
      .required("Vui lòng nhập số điện thoại.")
  });