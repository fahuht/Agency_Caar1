"use client";

import '@/styles/font-awesome-6.4.2-pro-main/css/all.css'
import "react-toastify/dist/ReactToastify.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller,useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

import useGlobalStore from "@/app/store/globalStore";
import LoadingClient from "@/components/LoadingClient/LoadingClient";
import facebookLogo from "@/public/assets/images/fb-logo.png";
import googleLogo from "@/public/assets/images/google-logo.png";
import { notify } from "@/utils/common";
import { FACEBOOK_ID } from "@/utils/constants";

import { apiGetInfoUser, apiLogin } from "./api";
import { changePasswordSchema, inputLogin } from "./constants";
import { DataForm, ItemInput, RequestForm } from "./type";

export default function Login() {
  const router = useRouter();
  const userInfo = useGlobalStore((state) => state.userInfo);
  const updateUserInfoData = useGlobalStore((state) => state.setUserInfo);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });
  const [errorResponse, setErrorResponse] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);

  // Kiểm tra nếu đã có thông tin của userInfo thì sẽ chặn không cho vào màn login
  useEffect(() => {
    if(userInfo) {
      router.back()
    }
  },[])

  // call api get infor user
  const mutationGetInfo = useMutation(
    () => {
      return apiGetInfoUser(`/api/me`);
    },
    {
      onSuccess: async (data) => {
        if (data && data.statusUser) {
          if (data.stepActive !== "2") {
            await updateUserInfoData(data);
            router.push("/dang-ki");
          } else {
            await updateUserInfoData(data);
            router.push("/");
          }
        } else {
          setErrorResponse(data);
        }
      },
      onError: (error) => {
        setErrorResponse(error);
      },
    }
  );

  // call api get token
  const mutationLogin = useMutation(
    (data: RequestForm) => {
      return apiLogin(`/api/login?loginType=${data.type}`, data.formLogin);
    },
    {
      onSuccess: (data) => {
      if (data && data.status === 'success') {
          mutationGetInfo.mutate();
        } else {
          setErrorResponse(data);
        }
      },
      onError: (error) => {
        setErrorResponse(error);
      },
    }
  );

  // bắt dữ liệu từ facebook && google
  const handleLogin = (
    loginType: string,
    accessToken: string,
    userID?: string
  ) => {
    const formData = new FormData();
    formData.append("username", loginType);
    formData.append("password", accessToken);
    formData.append("scope", "read");
    formData.append("grant_type", "password");
    if (userID) {
      formData.append("id", userID);
    }
    const requestData: RequestForm = { formLogin: formData, type: loginType };

    mutationLogin.mutate(requestData);
  };

  // Hàm login google
  const handleLoginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse: { access_token: string }) =>
      handleLogin("google", tokenResponse.access_token),
  });

  // hàm login facebook
  const handleFbLogin = () => {
    window.FB.init({
      appId: FACEBOOK_ID,
      status: false,
      localStorage: false,
      cookie: false, // Enable cookies to allow the server to access the session.
      xfbml: true, // Parse social plugins on this webpage.
      version: "v2.7", // Use this Graph API version for this call.
    });

    window.FB.login(
      (responseFb: {
        status: string;
        authResponse: { accessToken: string; userID: string };
      }) => {
        // Đăng nhập thành công, bạn có thể lấy thông tin người dùng
        if (responseFb.status === "connected") {
          // Tiếp tục thực hiện các hành động khác sau khi người dùng đã đăng nhập thành công
          handleLogin(
            "facebook",
            responseFb.authResponse.accessToken,
            responseFb.authResponse.userID
          );
        }
      },
      { scope: "email" }
    ); // Để yêu cầu quyền truy cập email của người dùng
  };

  const onSubmit = (value: DataForm) => {
    const formData = new FormData();
    formData.append("username", value.username);
    formData.append("password", value.password);
    formData.append("grant_type", "password");
    formData.append("scope", "read");
    // handleCallApiLogin(formData, "basic")
    const requestData: RequestForm = { formLogin: formData, type: "basic" };
    mutationLogin.mutate(requestData);
  };

  // ẩn hiện mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const renderInput = (item: ItemInput) => {
    if (item.field === "password") {
      return (
        <Controller
            name={item.field}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <div className="relative">
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    disabled={mutationLogin.isLoading}
                    placeholder={item.placeHolder}
                  />
                  <span
                    className="absolute top-1/4 right-4 translate-y-1/2 text-orange-600 flex"
                    onClick={() => togglePasswordVisibility()}
                  >
                    {showPassword ?<i className="fa-regular fa-eye-slash"></i>:<i className="fa-regular fa-eye"></i>}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          />
      );
    }
    return (
      <Controller<DataForm>
          name={item.field as keyof DataForm}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div>
              <div className="relative">
                <input
                  {...field}
                  type="text"
                  disabled={mutationLogin.isLoading}
                  placeholder={item.placeHolder}
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-xs">
                  {errors.username.message}
                </p>
              )}
            </div>
          )}
        />
    );
  };

  // thông báo khi có lỗi
  useEffect(() => {
    if (errorResponse) {
      if (errorResponse.errorMsg) {
        notify(errorResponse.errorMsg, "error");
      } else {
        notify("Lỗi hệ thống, vui lòng thử lại", "error");
      }
    }
  }, [errorResponse]);

  return (
    <>
      <ToastContainer />
      <div className="form-login mt-4">
        <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl">
          <h1>
            Mừng bạn quay lại
          </h1>
          <hr className="my-4 text-grey-200"/>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 flex flex-col gap-2"
          >
            {inputLogin.map((item) => (
              <div key={item.field} className="mb-3">
                <p className="mb-3 text-sm font-semibold text-grey-300">{item.placeHolder}:</p>
                {renderInput(item)}
              </div>
            ))}
           <div>
           <Link href="/quen-mat-khau" className="link-forgot-password">
                Quên mật khẩu
              </Link>
           </div>
            <div className="text-center ">
              <button
                type="submit"
                disabled={mutationLogin.isLoading}
                className="button-login"
              >
                Đăng nhập
              </button>
              <p className="my-3">Hoặc</p>
              <button
                type="button"
                // disabled={mutationUpdatePassword.isLoading}
                onClick={() => handleFbLogin()}
                className="button-login-social flex justify-center "
              >
                <span className="self-center mr-2">
                  <Image
                    src={facebookLogo}
                    width={20}
                    height={20}
                    alt="Login google"
                  />
                </span>
                <span className="self-center font-medium">Đăng nhập với Facebook</span>
              </button>
              <button
                type="button"
                // disabled={mutationUpdatePassword.isLoading}
                onClick={() => handleLoginGoogle()}
                className="button-login-social"
              >
                <span className="self-center mr-2">
                  <Image
                    src={googleLogo}
                    width={20}
                    height={20}
                    alt="Login google"
                  />
                </span>
                <span className="self-center font-medium">Đăng nhập với Google</span>
              </button>
            </div>
          </form>
        </div>
        <LoadingClient isLoading={mutationLogin.isLoading} />
      </div>
    </>
  );
}
