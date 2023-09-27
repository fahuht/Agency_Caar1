import "./index.css";

import SkeletonCarousel from "./SkeletonCarousel";

export default function SkeletonDetailProduct() {
  return (
      <div className="detail-product-container mb-4">
      <div className="animate-pulse w-full my-2 p-2">
          <div className="h-6 bg-slate-200 rounded-lg dark:bg-slate-200 w-3/4 mb-2"></div>
        </div>
        <div className="content-product flex">
          <div className="content-product-left">
            <SkeletonCarousel />
          </div>
          <div className="content-product-right">
            <div className="info-product animate-pulse flex flex-col ">
              <div className="flex-1 space-y-6 p-4">
                <div className="grid grid-cols-4">
                  <div className="h-4 bg-slate-200 rounded col-span-3" />
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-4">
                    <div className="h-6 bg-slate-200 rounded col-span-2" />
                  </div>
                </div>
                <div className="grid grid-cols-4">
                  <div className="h-4 bg-slate-200 rounded col-span-3" />
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-4">
                    <div className="h-3 bg-slate-200 rounded col-span-2" />
                  </div>
                </div>
                <div className="grid grid-cols-4">
                  <div className="h-4 bg-slate-200 rounded col-span-3" />
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-4">
                    <div className="h-3 bg-slate-200 rounded col-span-2" />
                  </div>
                </div>
                <div className="grid grid-cols-4">
                  <div className="h-4 bg-slate-200 rounded col-span-3" />
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-4">
                    <div className="h-3 bg-slate-200 rounded col-span-2" />
                  </div>
                </div>
                <div className="grid grid-cols-4">
                  <div className="h-4 bg-slate-200 rounded col-span-3" />
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-4">
                    <div className="h-3 bg-slate-200 rounded col-span-2" />
                  </div>
                </div>
              </div>
            </div>
            <div className="info-owner">
              <div className="info-owner-top">
                <div className="flex items-center mt-1 gap-1">
                  <svg className="w-10 h-10 text-slate-200 dark:text-slate-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div className="animate-pulse">
                    <div className="h-4 bg-slate-200 rounded-full dark:slate-200 w-32 mb-2"></div>
                  </div>
                </div>
              </div>
              <div className="info-owner-bottom mt-5">
                <div className="animate-pulse flex items-center justify-between">
                  <div>
                    <div className="h-2.5 bg-slate-200 rounded-full dark:bg-slate-200 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-slate-200"></div>
                  </div>
                  <div className="h-2.5 bg-slate-200 rounded-full dark:bg-slate-200 w-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="animate-pulse w-full product-description my-2 p-2">
          <div className="h-4 bg-slate-200 rounded-full dark:bg-slate-200 w-48 mb-4"></div>
          <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-200  mb-2.5"></div>
          <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-200 mb-2.5"></div>
          <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-200  mb-2.5"></div>
          <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-200  mb-2.5"></div>
          <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-200 "></div>
        </div>

      </div>
  );
}
