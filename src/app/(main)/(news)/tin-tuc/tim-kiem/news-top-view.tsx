import Link from 'next/link';
import * as React from 'react';

import { ApiListResponse } from '@/types/global';

import { TopNews } from './type';


type Props = {
  listNews: ApiListResponse<TopNews>;
};
export default function NewsTopView({ listNews }: Props) {
  return (
    <div className="bg-primary-100 p-6 rounded-2xl">
      <div className=" border-b-2 pb-3">
        <h1 className="text-base md:text-lg font-bold">Tin nhiều người đọc</h1>
      </div>
      <div>
        <p className='text-neutral-400 mt-2 font-semibold'>Tin thị trường</p>
        {listNews && listNews.data && listNews.data.length > 0 ? listNews.data.filter(i=>i.categoryName==="Tin thị trường").map(item=>(<div key={item.id}>
            <Link href={item.slug} className='text-slate-700 hover:border-b-0 font-semibold'>{item.title}</Link>
            </div>)):""}
      </div>
      <div>
        <p className='text-neutral-400 mt-2 font-semibold'>Phân tích dự báo</p>
        {listNews && listNews.data && listNews.data.length > 0 ? listNews.data.filter(i=>i.categoryName==="Phân tích dự báo").map(item=>(<div key={item.id}>
            <Link href={item.slug} className='text-slate-700 hover:border-b-0 font-semibold'>{item.title}</Link>
            </div>)):""}
      </div>
    </div>
  );
}
