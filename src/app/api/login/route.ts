import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url); // lấy dữ liệu trên đường dẫn
    const loginType = searchParams.get('loginType'); // lấy kiểu đăng nhập
    const formDataLogin = await request.formData(); // lấy form data từ màn login

    // Cấu hình header cho cuộc gọi API
    const headers: Record<string, string> = {
      Authorization:
        process.env.AUTHORIZATION_HEADER || 'Basic d2ViYXBwOmVuYW9AMTIz',
    };
    // Thêm điều kiện thêm vào header tùy loại đăng nhập
    if (loginType === 'facebook') {
      headers['Login-Type'] = 'Facebook';
    }
    if (loginType === 'google') {
      headers['Login-Type'] = 'Google';
    }

    // Cấu trúc config với headers
    const config = {
      headers,
    };

    // call api ở đây
    const responseToken = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/security-service/oauth/token`,
      {
        method: 'POST',
        headers: config.headers,
        body: formDataLogin,
      },
    );

    const dataToken = await responseToken.json();
    if (dataToken && dataToken.access_token && dataToken.refresh_token) {
      cookies().set({
        name: ACCESS_TOKEN,
        value: dataToken.access_token,
        httpOnly: true,
        path: '/',
      });
      cookies().set({
        name: REFRESH_TOKEN,
        value: dataToken.refresh_token,
        httpOnly: true,
        path: '/',
      });
      return NextResponse.json({ status: 'success' });
      // const headersGetInfo = {
      //   Authorization: `Bearer ${dataToken.access_token}`,
      // };
      // const responseInfoUser = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/security-service/api/v1/users/me`,
      //   {
      //     method: 'GET',
      //     headers: headersGetInfo,
      //   },
      // );
      // const dataInfo = await responseInfoUser.json();
      // if (dataInfo && dataInfo.stepActive) {

      // }
      // return NextResponse.json(dataInfo);
    }
    return NextResponse.json(dataToken);
  } catch (error) {
    return NextResponse.json(error);
  }
}
