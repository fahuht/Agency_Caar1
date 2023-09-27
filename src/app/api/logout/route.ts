import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ACCESS_TOKEN } from "@/utils/constants";
// import { ErrorResponse } from '@/types/global';

export async function GET() {
    try {
        const cookie = cookies().get(ACCESS_TOKEN);
        // console.log('====================================');
        // console.log('cookie', cookie);
        // console.log('====================================');
        if (cookie?.value) {
            // Cấu hình header cho cuộc gọi API
            const headers = {
                Authorization: `Bearer ${cookie.value}`,
                "Content-Type": "application/json",
            };
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/security-service/api/v1/users/oauth/logout`;
            const config = {
                method: "GET",
                headers,
            };
            // call api ở đây
            const response = await fetch(url, config);
            const res = await response.json();
            if (res.status === 1) {
                cookies().delete("REFRESH_TOKEN");
                cookies().delete("ACCESS_TOKEN");
            }
            return NextResponse.json(res);
        }
        return NextResponse.json({
            errorCode: "AUTH",
            errorMsg: "Vui lòng đăng nhập và thử lại",
            status: 0,
        });
    } catch (error) {
        return NextResponse.json(error);
    }
}
