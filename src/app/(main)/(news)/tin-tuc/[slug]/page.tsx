import 'dayjs/locale/vi';
import './index.css'

import dayjs from 'dayjs';
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import SkeletonNewsDetail from "@/components/Skeleton/SkeletonNewsDetail";
import SkeletonNewsImage from "@/components/Skeleton/SkeletonNewsImage";
import { baseApi, baseApiFe } from "@/utils/constants";

import ImageTitleTop from "./components/image-title-top";
import ShareOption from "./components/option-share";
import { ItemNews } from "./type";

dayjs.locale('vi')

type Props = {
    params: {
        slug: string;
    };
};

// set title và desc cho MetaData
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;
    const newsId = slug && slug?.split('id%3D')[1]
    const product = await fetch(
        `${baseApi}/news-service/api/v1/news/${newsId}`,
        { next: { revalidate: 60 } }
    ).then((res) => res.json());

    return {
        title: product?.data?.title,
        description: product?.data?.shortDescription,
        metadataBase: new URL(baseApiFe || ""),
        keywords: 'Hot, nhất, tháng, xe, xe hơi, tin tức xe hơi, công cụ tính khoản vay, công cụ tính toán, lãi suất, khoản vay, công cụ',
        openGraph: {
            images: `${baseApi}/file-service/api/v1/images/download/${product?.data?.imageId}`,
            locale: "vi_VN",
            type: 'website',
            siteName: 'Caar'
        }
    };
}

async function getNewsDetail(newsId: string | undefined) {
    try {
        const res = await fetch(
            `${baseApi}/news-service/api/v1/news/${newsId}`,
            { next: { revalidate: 0 } }
        );
        if (!res.ok) return undefined;
        return await res.json();
    } catch (error) {
        // console.log(error);
        return undefined
    }
}

async function getMoreNews() {
    try {
        const res = await fetch(
            `${baseApi}/news-service/api/v1/news/count-views/largest?size=10`,
            { next: { revalidate: 0 } }
        );
        if (!res.ok) return undefined;
        return await res.json();
    } catch (error) {
        // console.log(error);
        return undefined
    }
}

export default async function Page({ params }: Props) {
    const { slug } = params;
    const newsId = slug && slug?.split('id%3D')[1]
    const detailNewsData = getNewsDetail(newsId);
    const listMoreNewsData = getMoreNews();
    const [detailNews, listMoreNews] = await Promise.all([detailNewsData, listMoreNewsData])
    if (!detailNews) {
        notFound();
    }

    // lọc tin thị trường
    const marketNews = listMoreNews?.data.filter((item: ItemNews) => (item.categoryName === 'Tin thị trường'))

    // lọc tin phân tích
    const analysisNews = listMoreNews?.data.filter((item: ItemNews) => (item.categoryName === 'Phân tích dự báo'))
    return (
        <div className="news-detail-container ">
            <div className="router-title ">
                <Link href='/'>Trang chủ</Link>
                <i className="fa-solid fa-chevron-right text-xs"></i>
                <Link href='/tin-tuc'>Tin tức</Link>
                <i className="fa-solid fa-chevron-right text-xs"></i>
                <span className="text-base font-medium">Chi tiết tin tức</span>
            </div>
            <div className="title-news ">
                <div className="title-left flex flex-col">
                    <span className="title-date">
                        {detailNews?.data?.createdDate && dayjs(detailNews?.data?.createdDate).format('dddd, D/M/YYYY, HH:mm (Z)').toUpperCase()}
                    </span>
                    <span className="title-text ">
                        {detailNews?.data?.title}
                    </span>
                </div>
                <div className="title-right flex items-center">
                    <ShareOption slug={slug} />
                </div>
            </div>
            <div className="image-top mt-5">
                <Suspense fallback={<SkeletonNewsImage />}>
                    <ImageTitleTop imageId={detailNews?.data?.imageId} />
                </Suspense>
            </div>
            <div className="news-body flex gap-3 p-5 mt-3">
                <div className="news-content w-4/5 p-6 ">
                    <Suspense fallback={<SkeletonNewsDetail />}>
                        <div className="border-y border-gray-400 py-3">
                            <div dangerouslySetInnerHTML={{ __html: detailNews?.data?.content || "" }} />
                        </div>
                        <div className="flex flex-col mt-3">
                            <span className="text-sm text-gray-500 font-medium">Nguồn và ảnh</span>
                            <span className="text-base font-semibold">{detailNews?.data?.resourceName}</span>
                        </div>
                    </Suspense>
                </div>
                <div className="more-news w-1/5">
                    <div className="more-news-container ">
                        <span className='text-xl font-semibold p-2 border-b border-gray-400'>Tin nhiều người đọc</span>
                        <Suspense fallback={<SkeletonNewsDetail />}>
                            <div className='list-news'>
                                <span className='text-sm text-gray-600 font-semibold'>Tin thị trường</span>
                                {marketNews?.map((item: ItemNews) => (
                                    <Link key={item.id} href={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                                ))}
                            </div>
                            <div className='list-news'>
                                <span className='text-sm text-gray-600 font-semibold'>Phân tích dự báo</span>
                                {analysisNews?.map((item: ItemNews) => (
                                    <Link key={item.id} href={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                                ))}
                            </div>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
