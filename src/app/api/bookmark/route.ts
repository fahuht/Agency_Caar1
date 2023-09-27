import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { SaveBookmarkRequest } from '@/app/(main)/(products)/mua-ban-oto/type';
import { ACCESS_TOKEN } from '@/utils/constants';
// import { ErrorResponse } from '@/types/global';

export async function GET() {
    try {
        const cookie = cookies().get(ACCESS_TOKEN);
        if (cookie?.value) {
            // Cấu hình header cho cuộc gọi API
            const headers = {
                Authorization: `Bearer ${cookie.value}`,
                'Content-Type': 'application/json',
            };
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/share-service/api/v1/bookmark/current-user?sort=createdDate&order=DESC&size=20`;
            const config = {
                method: 'GET',
                headers,
            }
            // call api ở đây
            const response = await fetch(url, config);
            const bookmarks = await response.json();
            return NextResponse.json(bookmarks);
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


export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const cookie = cookies().get(ACCESS_TOKEN);
        const dataRequest = await request.json() as SaveBookmarkRequest;
        if (cookie?.value) {
            // Cấu hình header cho cuộc gọi API
            const headers = {
                Authorization: `Bearer ${cookie.value}`,
                'Content-Type': 'application/json',
            };
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/share-service/api/v1/bookmark`;
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
