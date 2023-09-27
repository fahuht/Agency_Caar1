import Link from 'next/link';
import React from 'react';

import { PagingListResponse } from '@/types/global';
import { baseApi, linkViewDocuments } from '@/utils/constants';

import { DocumentCar } from './type';

type Props = {
  listDocuments: PagingListResponse<DocumentCar>;
};

export default function ListDocument({ listDocuments }: Props) {
  // hiển thị icon file
  const getFileIcon = (name: string) => {
    if (name.includes('.doc')) {
      return <i className="fa-solid fa-file-word text-sky-500"></i>;
    }
    return <i className="fa-solid fa-file-excel text-teal-500"></i>;
  };

  // cắt đuôi .docx, .xslx ở tên các file
  const getFileName = (name: string) => {
    const parts = name.split('.');
    const cutName = parts[0];
    return cutName;
  };

  const renderListFile = (listFile: DocumentCar) => {
    if (listFile && listFile.listDocument && listFile.listDocument.length > 0) {
      return listFile.listDocument.map((item) => (
        <div className="file-document" key={item.id}>
          <div className="basis-10/12 self-center pr-2 ">
            {getFileIcon(item.fileName)}
            <span className="ml-3">
              <Link href={`${linkViewDocuments}=${item.id}`} target="_blank">
                {getFileName(item.fileName)}
              </Link>
            </span>
          </div>
          <div className="icon-action-document">
            <p>
              <Link href={`${linkViewDocuments}=${item.id}`} target="_blank">
                <i className="fa-solid fa-eye md:pr-3"></i>
              </Link>
            </p>
            <p>
              <Link
                href={`${baseApi}/file-service/api/v1/documents/file/download?fileId=${item.id}`}
                target="_blank"
              >
                <i className="fa-solid fa-download"></i>
              </Link>
            </p>
          </div>
        </div>
      ));
    }
    return <h1 className="text-2xl text-center">Không có thông tin</h1>
  };

  const renderListFolder = () => {
    if (listDocuments && listDocuments.data && listDocuments.data.length > 0) {
      return listDocuments.data.map((item) => (
        <details key={item.id} className="mb-3">
          <summary>{item.name}</summary>
          <div className="py-3">
           {renderListFile(item)}
          </div>
        </details>
      ));
    }
    return <h1 className="text-2xl text-center">Không có thông tin</h1>;
  };

  return <>{renderListFolder()}</>;
}
