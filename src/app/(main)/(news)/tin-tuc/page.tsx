import './index.css';

import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import * as React from 'react';

import { PagingListResponse } from '@/types/global';

import AnalysticsNews from './AnalysticNews';
import HotNews from './HotNews';
import InputSearchNews from './InputSearchNews';
import Loading from './loading';
import MarketNews from './MarketNews';
import { News, RequestGetNews } from './type';

export const metadata: Metadata = {
  title: 'Tin tức - Thị trường',
  description: 'Tin tức thị trường xe hơi CAAR.VN',
};


// call api danh sách tin tức
const getListNews = async (dataRequest:RequestGetNews): Promise<PagingListResponse<News> | Error> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/news-service/api/v1/news/search?sort=createdDate&order=DESC`;

  const listNew = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(dataRequest),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json()).catch(error => error);
  return listNew as PagingListResponse<News>;
}

export default async function NewsPage() {
  const baseRequestGetNews = {
    tagName: '',
    filter: '',
    categoryId: '',
    categoryCode: '',
    categoryName: '',
    title: '',
    keyword: '',
    status: 'APPROVED',
    level: '',
    type: 'NEWS',
    postDate: null,
    createdDate: {
      fromValue: '',
      toValue: '',
    },
    page: 0,
    size: 15,
  };

  // request lấy tin thị trường
  const requestGetMarketNews: RequestGetNews = {
    ...baseRequestGetNews,
    categoryCode: 'CANE0102',
  };
  // request lấy tin phân tích dự báo
  const requestGetAnalyticsNews: RequestGetNews = {
    ...baseRequestGetNews,
    categoryCode: 'CANE0103',
  };

  const getAllNews = await getListNews(baseRequestGetNews) as PagingListResponse<News>; // danh sách toàn bộ tin
  const getMarketNews = await getListNews(requestGetMarketNews) as PagingListResponse<News>;; // tin thị trường
  const getAnalyticsNews =await  getListNews(requestGetAnalyticsNews) as PagingListResponse<News>;; // tin dự báo

  console.log(getAllNews)

  return (
    <Suspense fallback={<Loading />}>
        <div className="px-7 xl:px-32 pb-5 mx-auto bg-white">
          <nav className="bg-grey-light w-full rounded-md hidden md:block pt-5">
            <ol className="list-reset flex">
              <li>
                <Link
                  href="/"
                  className="title-home"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <span className="mx-2 text-neutral-500 dark:text-neutral-400">
                  {' '}
                  {`>`}{' '}
                </span>
              </li>

              <li className="text-neutral-500 dark:text-neutral-400 ">
                Tin tức - Thị trường
              </li>
            </ol>
          </nav>
          <div className="py-3 md:py-6">
            <div className="block lg:hidden">
              <InputSearchNews />
            </div>
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mt-3 lg:mt-0">
              Tin tức - Thị trường
            </h1>
            <div className="flex justify-between mt-3">
              <p className="xl:w-1/3">
                Cổng thông tin hàng đầu với hàng nghìn tin thị trường, dự báo xu
                hướng, số liệu báo cáo phân tích thị trường bất động sản.
              </p>
              <div className="w-1/4 hidden lg:block">
                <InputSearchNews />
              </div>
            </div>
          </div>
          <HotNews listNews={getAllNews} />
          <MarketNews listNews={getMarketNews} />
          <AnalysticsNews listNews={getAnalyticsNews} />
        </div>
      </Suspense>
  );
}
