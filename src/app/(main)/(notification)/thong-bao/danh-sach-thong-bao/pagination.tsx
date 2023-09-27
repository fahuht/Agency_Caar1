"use client"

import { Pagination } from 'antd';
import { useRouter } from 'next/navigation';
import * as React from 'react';

type Props = {
  totalElement: number;
  paramsQuery: { page: string };
};

export default function PaginationNotify({
  totalElement,
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
    router.push(`/thong-bao/danh-sach-thong-bao?page=${page - 1}`);
  };
  return (
    <div className='pagination-notification mt-5'>
      <Pagination
        total={totalElement || 0}
        current={parseInt(paramsQuery.page, 10) + 1}
        onChange={onChange}
        size="small"
        responsive
        defaultPageSize={10}
        pageSize={10}
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
