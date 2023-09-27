import "./index.css";

import dayjs from 'dayjs';
import Link from 'next/link';
import * as React from 'react';

import { PagingListResponse } from '@/types/global';
import { baseApi } from '@/utils/constants';

import { News } from './type';

type Props = {
  listNews: PagingListResponse<News>;
};

export default function HotNews({ listNews }: Props) {
  // render giao diện của tin tức nổi bật phía bên trái
  const renderContentLeft = () => {
    if (listNews && listNews.data && listNews.data.length > 0) {
      const newsContentLeft = listNews.data.slice(0, 1);
      return (
        <div className="relative rounded-xl overflow-hidden">
          <Link href={`/tin-tic/${newsContentLeft[0]?.slug}` || '/'}>
            <img
              src={`${baseApi}/file-service/api/v1/images/download/${newsContentLeft[0]?.imageId}`}
              alt="Ảnh spotlight tin tức"
              className="image-spotlight"
            />
          </Link>

          <div className="title-news-spotlight custom-news-spotlight">
            <p className="font-bold text-xs md:text-sm">
              <span className="mr-3">
                {dayjs(newsContentLeft[0]?.createdDate).format('DD/MM/YYYY')}
              </span>
              {newsContentLeft[0]?.categoryName}
            </p>
            <Link
              href={`/tin-tic/${newsContentLeft[0]?.slug}` || '/'}
              className="url-title-spotlight"
            >
              {newsContentLeft[0]?.title}
            </Link>
          </div>
        </div>
      );
    }
    return '';
  };
  const renderContentRight = () => {
    if (listNews && listNews.data && listNews.data.length > 0) {
      const newsContentRight = listNews.data.slice(1, 7);
      return (
        <div className="">
          {newsContentRight.map((item) => (
            <div key={item.id} className="flex flex-row pt-4 lg:pt-0 xl:pt-1">
              <div className="basis-2/5 lg:basis-1/4">
                <Link href={`/tin-tuc/${item.slug}`}>
                  <img
                    src={`${baseApi}/file-service/api/v1/images/download/${item?.imageId}`}
                    alt="Ảnh spotlight tin tức"
                    className="image-spotlight w-full object-cover object-center rounded-xl aspect-4/3"
                  />
                </Link>
              </div>
              <div className=" pl-3 lg:pl-5 pt-2 md:pt-5 lg:pt-0 xl:pt-3 basis-3/5 lg:basis-3/4">
                <p className="font-bold text-xs lg:text-sm text-zinc-400">
                  <span className="mr-3">
                    {dayjs(item?.createdDate).format('DD/MM/YYYY')}
                  </span>
                  {item?.categoryName}
                </p>
                <Link
                  href={`/tin-tuc/${item.slug}`}
                  className="url-news-spotlight"
                >
                  {item?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return '';
  };
  
  return (
    <div>
      <div className="pt-5 border-t-2 lg:flex flex-row">
        <div className="news-content-left lg:pr-6 lg:basis-3/5 lg:border-r-2">
          {renderContentLeft()}
        </div>
        <div className="news-content-right lg:basis-2/5 lg:pl-6">
          {renderContentRight()}
        </div>
      </div>
    </div>
  );
}
