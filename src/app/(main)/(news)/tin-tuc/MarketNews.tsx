import Link from 'next/link';
import * as React from 'react';

import { PagingListResponse } from '@/types/global';

import NewsItem from './NewsItem';
import { News } from './type';

type Props = {
  listNews: PagingListResponse<News>;
};

export default function MarketNews({ listNews }: Props) {
  return (
    <>
      <div className="border-b-2 mb-2 mt-9">
        <div className="flex justify-between pb-2">
          <h1 className="font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl">
            Tin thị trường
          </h1>
          <Link
            href="/tin-tuc/tim-kiem?type=tin-thi-truong&page=0"
            className="text-base text-orange-600 hover:border-b-0 self-end"
          >
            Xem tất cả
          </Link>
        </div>
      </div>
      <div className="pt-2">
        <div className="flex items-stretch overflow-x-auto flex-nowrap mb-3">
          {listNews && listNews.data && listNews.data.length > 0
            ? listNews.data.map((item) => (
                <NewsItem itemNews={item} key={item.id}/>
              ))
            : ''}
        </div>
      </div>
    </>
  );
}
