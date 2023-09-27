import './index.css'

import Link from 'next/link';

import NewsItem from '@/app/(main)/(news)/tin-tuc/NewsItem';
import { News } from '@/app/(main)/(news)/tin-tuc/type';
import { ApiListResponse } from '@/types/global';
import { baseApi } from '@/utils/constants';

type Props = {
    searchParams: { [key: string]: string | undefined }
}

async function getNews(typeNews: string | undefined) {
    const dataRequest = {
        "categoryCode": (typeNews === 'tin-thi-truong' || typeNews === undefined) && 'CANE0102' || typeNews === 'tin-phan-tich' && 'CANE0103',
    }
    try {
        const res = await fetch(
            `${baseApi}/news-service/api/v1/news/search?sort=createdDate&order=DESC`,
            {
                method: 'POST',
                body: JSON.stringify(dataRequest),
                headers: {
                    'Content-Type': 'application/json'
                },
            },
        );
        if (!res.ok) return undefined;
        return await res.json();
    } catch (error) {
        return error;
    }
}

export default async function NewsCar({ searchParams }: Props) {
    const typeNews = searchParams.type
    const getListNews: Promise<ApiListResponse<News>> = getNews(typeNews);
    const listNews = await getListNews;
    return (
        <div className='bg-white py-8 news-car-board-page'>
            <div className=' news-car-container'>
                <span className="text-2xl font-bold">Tin tức - Thị trường</span>
                <div className='tabs-news reveal'>
                    <Link
                        className={`${(typeNews === 'tin-thi-truong' || typeNews === undefined) && 'text-orange-600' || ""} item-tabs`}
                        href="?type=tin-thi-truong"
                        scroll={false}
                    >
                        Tin thị trường</Link>
                    <Link
                        className={`${typeNews === 'tin-phan-tich' && 'text-orange-600' || ""} item-tabs`}
                        href="?type=tin-phan-tich"
                        scroll={false}
                    >
                        Phân tích - Dự báo</Link>
                    <Link
                        className='view-all '
                        href={(typeNews === 'tin-thi-truong' || typeNews === undefined) ? '/tin-tuc/tim-kiem?type=tin-thi-truong&page=0' : '/tin-tuc/tim-kiem?type=phan-tich&page=0'}
                    >
                        Xem tất cả <i className="fa-light fa-chevron-right"></i>
                    </Link>
                </div>
                <div className='list-news-board-container reveal'>
                    {listNews &&
                        listNews.data &&
                        listNews.data.length > 0 &&
                        listNews.data.map(item =>
                            <NewsItem itemNews={item} key={item.id} />
                        )}
                </div>
            </div>
        </div>
    );
}
