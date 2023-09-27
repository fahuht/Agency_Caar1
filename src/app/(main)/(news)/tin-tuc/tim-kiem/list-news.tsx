import "./index.css";

import dayjs from 'dayjs';
import Link from 'next/link';
import * as React from 'react';

import { PagingListResponse } from '@/types/global';
import { baseApi } from '@/utils/constants';

import { News } from '../type';

type Props = {
  listNews: PagingListResponse<News>;
};
export default function ListNews({ listNews }: Props) {
  return (
    <div className=" lg:basis-3/4  lg:border-r-2 lg:pr-6">
      {listNews && listNews.data && listNews.data.length > 0 ? (
        listNews.data.map((item) => (
          <div className="border-b-2  flex flex-row py-5" key={item.id}>
            <div className="basis-1/3 px-1 md:px-3 lg:pl-0">
              <Link href={`/tin-tuc/${item.slug}`}>
                <img
                  src={`${baseApi}/file-service/api/v1/images/download/${item?.imageId}`}
                  alt="Ảnh spotlight tin tức"
                  className="image-spotlight"
                />
              </Link>
            </div>
            <div className="basis-2/3 px-2 md:px-3 self-center">
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
              <p className="line-clamp-1 hidden md:mt-2 md:block">
                {item?.shortDescription}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className='justify-center text-center mt-3'>
          <h1 className="text-3xl">
            Không tìm thấy kết quả
          </h1>
          <p>Thử các cụm từ tìm kiếm khác hoặc ít cụ thể hơn</p>
        </div>
      )}
    </div>
  );
}
