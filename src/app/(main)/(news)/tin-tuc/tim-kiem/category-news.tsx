import Link from 'next/link';
import * as React from 'react';

import { ListCategoryNews } from './constants';
import { ParamsUrl } from './type';

type Props = {
  paramsQuery: ParamsUrl;
};

export default function CategoryNews({ paramsQuery }: Props) {
  const renderCategoryNews = () => {
    if (paramsQuery.type === 'tu-khoa') {
      return (
        <div>
          {ListCategoryNews.map((item) => (
            <div className="mt-3" key={item.id}>
              <Link
                className="text-slate-700 hover:border-b-0 font-semibold"
                href={item.link}
              >
                <span>
                  <i className={item.icon}></i>
                </span>
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      );
    } 
      return (
        <div>
          {ListCategoryNews.filter((i) => i.type !== paramsQuery.type).map(
            (item) => (
              <div className="mt-3" key={item.id}>
                <Link
                  className="text-slate-700 hover:border-b-0 font-semibold"
                  href={item.link}
                >
                  <span>
                    <i className={item.icon}></i>
                  </span>
                  {item.title}
                </Link>
              </div>
            ),
          )}
        </div>
      );
    
  };
  return (
    <div className="my-5">
      <div className="bg-primary-100 p-6 rounded-2xl">
        <div className=" border-b-2 pb-3">
          <h1 className="text-base md:text-lg font-bold">Danh mục tin tức</h1>
        </div>
        {renderCategoryNews()}
      </div>
    </div>
  );
}
