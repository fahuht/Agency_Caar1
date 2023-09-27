import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { RequestGetNotification } from '@/components/Home/type';
import { ACCESS_TOKEN } from '@/utils/constants';

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const cookie = cookies().get(ACCESS_TOKEN);
        const dataRequest = await request.json() as RequestGetNotification;
        if (cookie?.value) {
            // Cấu hình header cho cuộc gọi API
            const headers = {
                Authorization: `Bearer ${cookie.value}`,
                'Content-Type': 'application/json',
            };
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/notification-service/api/v1/notification/search/me?page=${dataRequest.page}&&size=10&&sort=createdDate&&order=DESC`;
            const config = {
                method: 'POST',
                headers,
                body: JSON.stringify(dataRequest),
            }
            // call api ở đây
            const response = await fetch(url, config);
            const data = await response.json();
            return NextResponse.json(data);
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