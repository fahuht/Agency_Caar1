/* eslint-disable func-names */
import * as yup from "yup";

import { regexType } from "@/utils/constants";

export const registerAccountFields = [
    {
        id: 1,
        field: "name",
        placeHolder: "Tên đăng nhập",
        type: "INPUT",
    },
    {
        id: 2,
        field: "password",
        placeHolder: "Mật khẩu",
        regex: regexType.passwordRegex,
        type: "INPUT",
    },
    {
        id: 3,
        field: "confirmPassword",
        placeHolder: "Nhập lại mật khẩu",
        regex: regexType.passwordRegex,
        type: "INPUT",
    },
];

export const fieldsUpdateInfo = [
    {
        placeHolder: "Tên người dùng",
        field: "displayName",
        type: "INPUT",
    },
    {
        placeHolder: "Địa chỉ Email",
        field: "email",
        type: "INPUT",
    },
    {
        placeHolder: "Số điện thoại",
        field: "phoneNumber",
        type: "PHONE_NUMBER",
    },
    {
        placeHolder: "Ngày sinh",
        field: "birthday",
        type: "DATE",
    },
];

export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required(
            "Vui lòng nhập đúng định dạng thông tin. (Ví dụ: admin123, admin, ...)"
        ),

    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải chứa ít nhất 8 kí tự")
        .matches(/[A-Z]+/, "Mật khẩu phải chứa ít nhất một kí tự in hoa")
        .matches(/[a-z]+/, "Mật khẩu phải chứa ít nhất 1 kí tự viết thường")
        .matches(/\d+/, "Mật khẩu phải chứa ít nhất 1 số")
        .matches(/[\W_]+/, "Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt"),

    confirmPassword: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu")
        .test("password-match", "Mật khẩu không đúng", function (value) {
            return (
                value === this.resolve(yup.ref("password")) || value === null
            );
        }),
});

export const validateUpdateInfo = yup.object().shape({
    displayName: yup
        .string()
        .required("Vui lòng nhập tên người dùng")
        .matches(
            regexType.fullName,
            "Vui lòng nhập đúng định dạng tên người dùng"
        ),
    email: yup
        .string()
        .required("Vui lòng nhập Email")
        .matches(regexType.email, "Vui lòng nhập đúng định dạng Email"),
    phoneNumber: yup
        .string()
        .required("Vui lòng nhập Số điện thoại")
        .matches(regexType.numberPhone1, "Dữ liệu không hợp lệ"),
    birthday: yup
    .string()
    .required("Vui lòng nhập ngày sinh"),
});
