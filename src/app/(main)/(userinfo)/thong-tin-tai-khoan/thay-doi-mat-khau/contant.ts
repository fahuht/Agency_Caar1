/* eslint-disable func-names */
import * as yup from "yup";

import { regexType } from "@/utils/constants";

export const inputUpdatePass = [
  {
    field: "newPassword",
    placeHolder: "Nhập mật khẩu mới",
    regex: regexType.passwordRegex,
    type: "INPUT",
  },
  {
    field: "confirmNewPassword",
    placeHolder: "Xác nhận mật khẩu",
    regex: regexType.passwordRegex,
    type: "INPUT",
  },
];

export const changePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
    .matches(/[A-Z]+/, "Mật khẩu phải chứa ít nhất một ký tự in hoa")
    .matches(/[a-z]+/, "Mật khẩu phải chứa ít nhất một ký tự viết thường")
    .matches(/\d+/, "Mật khẩu phải chứa ít nhất một số")
    .matches(/[\W_]+/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"),
  confirmNewPassword: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .test("password-match", "Mật khẩu không đúng", function (value) {
      return value === this.resolve(yup.ref("newPassword")) || value === null;
    }),
    currentPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu hiện tại.")
});
