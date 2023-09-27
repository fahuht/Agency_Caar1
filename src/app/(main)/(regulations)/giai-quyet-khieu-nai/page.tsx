import "./index.css";

import React from "react";

import { baseApi, resolveComplaints } from "@/utils/constants";

import { NewsItem, NewsResponse } from "./type";

async function getNews() {
  try {
    const res = await fetch(
      `${baseApi}/news-service/api/v1/news/${resolveComplaints}`
    );
    if (!res.ok) return undefined;
    return await res.json();
  } catch (error) { 
    return undefined;
   }
}

export default async function Regulations() {
  const news: Promise<NewsResponse<NewsItem>> = getNews();
  const newsData = await news;

  return (
    <div className="bg-white py-8 px-[6%] regulations">
      <h2 className="pb-5 text-3xl text-orange-600 font-semibold text-left border-b-2 border-orange-500">
        {newsData?.data.title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: newsData?.data?.content || "" }} />
    </div>
  );
}
