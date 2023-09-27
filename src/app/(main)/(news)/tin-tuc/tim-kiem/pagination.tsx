"use client"

import { Pagination } from 'antd';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { paginations, ParamsUrl } from './type';

type Props = {
  paginationNews: paginations;
  paramsQuery: ParamsUrl;
};

export default function PaginationSearchNews({
  paginationNews,
  paramsQuery,
}: Props) {
  const router = useRouter();
  const paginationRender = (
    _: number,
    type: string,
    originalElemnent: React.ReactNode,
  ) => {
    if (type === 'prev') {
      return (
        <button type='button' title="Trang trước">
          &lt;{" "}<span className='hidden md:inline-block'>Trang trước </span>
        </button>
      );
    }
    if (type === 'next') {
      return (
        <button type='button' title="Trang sau">
        <span className='hidden md:inline-block'>Trang sau</span>{" "}&gt;
      </button>
      );
    }
    return originalElemnent;
  };

  const onChange = (page: number): void => {
    let urlSearchNew = '';
    if (paramsQuery  && paramsQuery.type==="tu-khoa") {
      const encodedSearchQuery = encodeURI(paramsQuery.keyword);
      urlSearchNew += `keyword=${encodedSearchQuery}&type=${paramsQuery.type}&page=${page-1}`;
    }
    if (paramsQuery && paramsQuery.type!=="tu-khoa") {
      urlSearchNew += `type=${paramsQuery.type}&page=${page-1}`;
    }
    router.push(`/tin-tuc/tim-kiem?${urlSearchNew}`);
  };
  return (
    <div className='pagination-news mt-5'>
      <Pagination
        total={(paginationNews && paginationNews.totalElements) || 0}
        current={parseInt(paramsQuery.page, 10)+1}
        onChange={onChange}
        size="small"
        responsive
        defaultPageSize={16}
        pageSize={16}
        showSizeChanger={false}
        style={{
          width: '100%',
          height: '100%',
        }}
        itemRender={paginationRender}
      />
    </div>
  );
}
