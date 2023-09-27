import dayjs from 'dayjs';
import Link from 'next/link';
import * as React from 'react';

import { baseApi } from '@/utils/constants';

import { News } from './type';

type Props = {
  itemNews: News;
};

export default function NewsItem({ itemNews }: Props) {
  return (
    <div
      className="item-new-flex w-3/4 md:w-1/2 lg:w-1/4 pr-4 "
      key={itemNews?.id}
    >
      <Link href={`/tin-tuc/${itemNews?.slug}`}>
        <img
          src={`${baseApi}/file-service/api/v1/images/download/${itemNews?.imageId}`}
          alt="Ảnh tin thị trường"
          className="rounded-xl aspect-4/3"
        />
        <p className="font-bold mt-2  text-xs lg:text-sm text-zinc-400">
          {dayjs(itemNews?.createdDate).format('DD/MM/YYYY')}
        </p>
        <p className="font-bold mt-2 text-sm lg:text-base text-slate-700">
          {itemNews?.title}
        </p>
      </Link>
    </div>
  );
}
