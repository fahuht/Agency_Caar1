import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ACCESS_TOKEN } from '@/utils/constants';

export async function POST(request: Request) {
    const reqBody = await request.json()
    try {
        const cookie = cookies().get(ACCESS_TOKEN);
        if (cookie) {
            // Cấu hình header cho cuộc gọi API
            const headers = {
                Authorization: `Bearer ${cookie.value}`,
                'Content-Type': 'application/json'
            };
            // call api ở đây
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/security-service/api/v1/users/${reqBody.id}/patch`,
                {
                    cache: 'no-cache',
                    method: 'POST',
                    headers,
                    body: JSON.stringify(reqBody),
                },
            );
            const res = await response.json();
            return NextResponse.json(res);
        }
        return NextResponse.json({ message: 'Lỗi hệ thống, vui lòng thử lại' });
    } catch (error) {
        return NextResponse.json(error);
    }
}