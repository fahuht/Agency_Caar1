import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ACCESS_TOKEN } from '@/utils/constants';

export async function GET() {
  try {
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
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/security-service/api/v1/users/me`,
        {
          cache: 'no-cache',
          method: 'GET',
          headers: headersGetInfo,
        },
      );
      const dataInfo = await responseInfoUser.json();
      return NextResponse.json(dataInfo);
    }
    return NextResponse.json({ message: 'Lỗi hệ thống, vui lòng thử lại' });
  } catch (error) {
    return NextResponse.json(error);
  }
}
