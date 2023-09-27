'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  searchParams: { keyword: string };
};

export default function InputSearchDocument({ searchParams }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.keyword || '',
  );
  const router = useRouter();
  const onSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    const querySearchParam = `keyword=${encodedSearchQuery}`;
    router.push(`/tai-lieu?${querySearchParam}`);
  };
  return (
    <div className="p-7 bg-white rounded-xl">
      <form onSubmit={onSearch}>
        <div className=" flex flex-row">
          <input
            value={searchQuery}
            placeholder="Tìm kiếm"
            type="text"
            className="input-search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="button-search"
          >
            {' '}
            <i className=" fa-regular fa-magnifying-glass text-white cursor-pointer" />
          </button>
        </div>
      </form>
    </div>
  );
}
