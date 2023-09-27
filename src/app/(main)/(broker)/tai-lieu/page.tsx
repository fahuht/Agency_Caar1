import './index.css';

import { Metadata } from 'next';
import * as React from 'react';

import { PagingListResponse } from '@/types/global';

import InputSearchDocument from './InputSearchDocument';
import ListDocument from './ListDocument';
import { DocumentCar, RequestGetDocument } from './type';

type Props = {
  searchParams: { keyword: string | '' };
};

export const metadata: Metadata = {
  title: 'Danh sách tài liệu',
  description: 'Tài liệu về xe hơi',
};

// call api danh sách tin tức
const getListDocuments = async (
  dataRequest: RequestGetDocument,
): Promise<PagingListResponse<DocumentCar> | Error> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/share-service/api/v1/categories/search/document-by-type`;

  const listNew = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(dataRequest),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => error);
  return listNew as PagingListResponse<DocumentCar>;
};

export default async function Document({ searchParams }: Props) {
  const baseRequestGetDocument = {
    fileName: searchParams.keyword,
    type: 'HAND_BOOK',
  };
  const listDocuments = (await getListDocuments(
    baseRequestGetDocument,
  )) as PagingListResponse<DocumentCar>; // danh sách toàn bộ tin

  return (
    <div className='document-records-realty'>
      <div className="relative">
        <div className="image-header bg-center bg-no-repeat bg-cover" />
        <div className="box-search-document">
          <div className=" w-full basis-10/12 md:basis-11/12">
            <h1 className="">
              Tài liệu Ô tô
            </h1>
            <InputSearchDocument searchParams={searchParams} />
          </div>
        </div>
      </div>
      <div className="list-folder-document">
        <div className=' basis-10/12 md:basis-11/12'>
            <ListDocument listDocuments={listDocuments} />
        </div>
      </div>
    </div>
  );
}
