import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { ACCESS_TOKEN } from '@/utils/constants';

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const cookie = cookies().get(ACCESS_TOKEN);
        if (cookie) {
            // Cấu hình header cho cuộc gọi API
            const headers = {
                Authorization: `Bearer ${cookie.value}`,
            };
            // call api ở đây
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/share-service/api/v1/bookmark/${id}/patch`,
                {
                    cache: 'no-cache',
                    method: 'POST',
                    headers,
                    body: request.body,
                },
            );
            const bookmarks = await response.json();
            return NextResponse.json(bookmarks);
        }
        return NextResponse.json({ message: 'Lỗi hệ thống, vui lòng thử lại' });
    } catch (error) {
        return NextResponse.json(error);
    }
}
