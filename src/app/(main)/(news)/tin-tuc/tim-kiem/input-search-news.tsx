'use client';

import "./index.css";

import { useRouter } from "next/navigation";
import { useState } from 'react';

import { ParamsUrl } from './type';

type Props = {
  paramsQuery: ParamsUrl;
};

export default function InputSearchNews({paramsQuery}: Props) {
  const [searchQuery, setSearchQuery] = useState<string>(paramsQuery.keyword);
  const router = useRouter();
  const onSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    const querySearchParam = `keyword=${encodedSearchQuery}&type=tu-khoa&page=0`;
    router.push(`/tin-tuc/tim-kiem?${querySearchParam}`);
  };
  return (
    <div>
      <form onSubmit={onSearch}>
        <div className="relative">
          <input
            value={searchQuery}
            placeholder="Tìm kiếm"
            type="text"
            className="custom-search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            {' '}
            <i className="fa-solid fa-magnifying-glass button-search"></i>
          </button>
        </div>
        <span></span>
      </form>
    </div>
  );
}
