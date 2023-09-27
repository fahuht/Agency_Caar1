import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ACCESS_TOKEN } from '@/utils/constants';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url); // lấy dữ liệu trên đường dẫn
    const idNotification = searchParams.get('id'); // lấy id thông báo
    // get token from cookie
    const tokenCookie = cookies().get(ACCESS_TOKEN);
    // console.log(tokenCookie);
    if (tokenCookie) {
      // Cấu hình header cho cuộc gọi API
      const headersGetInfo = {
        Authorization: `Bearer ${tokenCookie.value}`,
      };
      // console.log(headersGetInfo);

      // call api ở đây
      const responseInfoUser = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/notification-service/api/v1/notification/${idNotification}/seen`,
        {
          cache: 'no-cache',
          method: 'GET',
          headers: headersGetInfo,
        },
      );
      const dataInfo = await responseInfoUser.json();
      return NextResponse.json(dataInfo);
    }
    return NextResponse.json({
      errorCode: 'AUTH',
      errorMsg: 'Vui lòng đăng nhập và thử lại',
      status: 0,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
