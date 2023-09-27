'use client'

import './index.css';

import { Pagination } from 'antd';
import { usePathname, useRouter,useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import React from 'react';

import { Paginations } from '@/types/global';

export default function PaginationPage({ paginations }: Paginations) {
    const searchParams = useSearchParams()!;
    const pathname = usePathname()
    const router = useRouter();
    // console.log('paginations', paginations);
    const handleChange = (page:number): void => {
        const paramsData = queryString.parse(`${searchParams}`);  
        paramsData.trang = `${page}`;
        const newParamsData = queryString.stringify(paramsData, { skipEmptyString: true, skipNull: true });
        const url = `${pathname}${newParamsData ? `?${newParamsData}` : ''}`;
        // console.log('url', url);
        router.push(url);
    }
    // console.log('paginations', paginations);
    return (
        <div className='load-more-container'>
            <Pagination current={paginations.number + 1} pageSize={paginations.size} onChange={(page) => handleChange(page)} total={paginations.totalElements} showSizeChanger={false} />
        </div>
    )
}

