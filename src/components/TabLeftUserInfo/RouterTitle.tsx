'use client';

import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouterTitle() {
  const [title, setTitle] = useState("");
  const tabName = usePathname();
  useEffect(() => {
    if (tabName === "/thong-tin-tai-khoan/tong-quan-tai-khoan") {
        setTitle("Tổng quan tài khoản");
      }else if (tabName === "/thong-tin-tai-khoan/chinh-sua-ho-so") {
       setTitle("Chỉnh sửa hồ sơ");
    }else if (tabName === "/thong-tin-tai-khoan/thay-doi-mat-khau") {
       setTitle("Thay đổi mật khẩu");
    }
}, [tabName]);
    return (
        <Breadcrumb separator=">" className="font-semibold hidden md:block lg:block">
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
    );
}
