import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const reqBody = await request.json()
    try {
            // Cấu hình header cho cuộc gọi API
            const headers = {
                // Authorization: `Bearer ${cookie.value}`,
                'Content-Type': 'application/json'
            };
            // call api ở đây
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/product-service/api/v1/product-car/search?page=${reqBody.page}&size=${reqBody.size}`,
                {
                    cache: 'no-cache',
                    method: 'POST',
                    headers,
                    body: JSON.stringify(reqBody),
                },
            );
            const res = await response.json();
            return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json(error);
    }
}
