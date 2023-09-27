import './index.css';

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import * as React from 'react';

import { ApiListResponse, PagingListResponse } from '@/types/global';

import { News, RequestGetNews } from '../type';
import CategoryNews from './category-news';
import InputSearchNews from './input-search-news';
import ListNews from './list-news';
import Loading from './loading';
import NewsTopView from './news-top-view';
import PaginationSearchNews from './pagination';
import { ParamsUrl, TopNews } from './type';

interface Props {
  searchParams: ParamsUrl,
}

export const metadata: Metadata = {
  title: 'Danh sách Tin tức - Thị trường',
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

// call api danh sách tin tức nhiều lượt xem 
const getNewsTopView = async (): Promise<ApiListResponse<TopNews> | Error> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/news-service/api/v1/news/count-views/largest?size=10`;

  const listNew = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json()).catch(error => error);
  return listNew as ApiListResponse<TopNews>;
}

export default async function SearchNewsPage(
  {searchParams}:Props
) {
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

  const checkParamGetNews = () => {
    if (
      (searchParams.keyword && searchParams.page) ||
      (searchParams.page &&
        searchParams.type &&
        searchParams.type === 'tu-khoa')
    ) {
      const requestGetNews: RequestGetNews = {
        ...baseRequestGetNews,
        filter: searchParams.keyword || '',
        page: parseInt(searchParams.page, 10),
      };
      return requestGetNews;
    }
    if (
      searchParams.page &&
      searchParams.type &&
      searchParams.type === 'tin-thi-truong'
    ) {
      const requestGetNews: RequestGetNews = {
        ...baseRequestGetNews,
        categoryCode: 'CANE0102',
        page: parseInt(searchParams.page, 10),
      };
      return requestGetNews;
    }
    if (
      searchParams.page &&
      searchParams.type &&
      searchParams.type === 'phan-tich'
    ) {
      const requestGetNews: RequestGetNews = {
        ...baseRequestGetNews,
        categoryCode: 'CANE0103',
        page: parseInt(searchParams.page, 10),
      };
      return requestGetNews;
    }
    return notFound();
  };
  const listNews = await getListNews(checkParamGetNews()) as PagingListResponse<News>; // danh sách toàn bộ tin
  const listNewsTopViews = await getNewsTopView() as ApiListResponse<TopNews> // danh sách tin nhiều người đọc

  const renderTitleSearchNews = () => {
    switch (searchParams.type) {
      case 'tu-khoa': {
        return `Kết quả tìm kiếm cho "${searchParams.keyword}"`;
      }
      case 'tin-thi-truong': {
        return 'Tin thị trường';
      }
      case 'phan-tich': {
        return 'Phân tích dự báo';
      }
      default: {
        return '';
      }
    }
  };
  return (
    <Suspense fallback={<Loading />}>
        <div className="bg-search-news">
          <nav className="bg-grey-light w-full rounded-md hidden md:block pt-5">
            <ol className="list-reset flex">
              <li>
                <Link
                  href="/"
                  className=" hover:border-b-0 transition duration-150 ease-in-out"
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
                <Link href="/tin-tuc">Tin tức - Thị trường</Link>
              </li>
              <li>
                <span className="mx-2 text-neutral-500 dark:text-neutral-400">
                  {' '}
                  {`>`}{' '}
                </span>
              </li>

              <li className="text-neutral-500 dark:text-neutral-400 ">
                {renderTitleSearchNews()}
              </li>
            </ol>
          </nav>
          <div className="lg:flex justify-between  border-b-2 py-3 md:py-6">
            <div className="lg:hidden">
              <InputSearchNews paramsQuery={searchParams} />
            </div>
            <h1 className="font-bold text-2xl lg:w-3/4 md:text-3xl lg:text-4xl mt-3 lg:mt-0">
              {renderTitleSearchNews()}
            </h1>
            <div className="hidden w-1/4 lg:block">
              <InputSearchNews paramsQuery={searchParams} />
            </div>
          </div>
          <div className="lg:flex lg:flex-row lg:pt-4">
            <ListNews listNews={listNews} />
            <div className="lg:basis-1/4 lg:pl-3 hidden lg:block">
              <CategoryNews paramsQuery={searchParams} />
              <NewsTopView listNews={listNewsTopViews} />
            </div>
          </div>
          <div className="lg:flex lg:flex-row ">
            <div className="lg:basis-3/4">
              {
                listNewsTopViews && listNewsTopViews.data && listNewsTopViews.data.length>0?<PaginationSearchNews
                paginationNews={listNews.paginations}
                paramsQuery={searchParams}
              />:""
              }
            </div>
          </div>
          <div className="lg:basis-1/4 lg:pl-3 lg:hidden">
            <CategoryNews paramsQuery={searchParams} />
            <NewsTopView listNews={listNewsTopViews} />
          </div>
        </div>
      </Suspense>
  );
}
