
import * as yup from "yup";

import { regexType } from "@/utils/constants";


export const inputLogin = [
  {
    field: "username",
    placeHolder: "Tên đăng nhập",
    regex: regexType.nameUser,
    type: "INPUT",
  },
  {
    field: "password",
    placeHolder: "Mật khẩu",
    regex: regexType.passwordRegex,
    type: "INPUT",
  },
];

export const changePasswordSchema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập tên đăng nhập").matches( regexType.nameUser,"Tài khoản không hợp lệ"),

  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
    .matches(regexType.passwordRegex,"Mật khẩu không hợp lệ")
});
