import "./index.css";

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import SkeletonCarousel from "@/components/Skeleton/SkeletonCarousel";
import SkeletonOption from "@/components/Skeleton/SkeletonOption";
import { baseApi, baseApiFe } from "@/utils/constants";

import CarouselProductSwiper from "./components/carousel-product-swiper";
import CopyContactPhone from "./components/CopyContactPhone";
import MoreProduct from "./components/MoreProduct";
import OptionDetail from "./components/option-detail";
import bodyStyle from './images/bodyStyle.png'
import buildDate from './images/buildDate.png'
import mileage from './images/mileage.png'
import origin from './images/origin.png'
import seats from './images/seats.png'
import transmission from './images/transmission.png'
// import ProductDescription from "./product-description";
// import ProductOverView from "./product-overview";
import { DetailProduct } from "./type";

type Props = {
  params: {
    slug: string;
  };
};

// set title và desc cho MetaData
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const productId = slug && slug?.split('id%3D')[1]
  const product = await fetch(
    `${baseApi}/product-service/api/v1/product-car/${productId}`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json());

  return {
    metadataBase: new URL(baseApiFe || ""),
    title: product?.data?.title,
    description: product?.data?.description,
    keywords: 'Hot, nhất, tháng, xe, xe hơi, tin tức xe hơi, công cụ tính khoản vay, công cụ tính toán, lãi suất, khoản vay, công cụ',
    openGraph: {
      images: product?.data?.urlImages,
      type: 'website',
      locale: "vi_VN",
      siteName: 'Caar'
    }
  };
}

async function getDetailProduct(productId: string | undefined) {
  try {
    const res = await fetch(
      `${baseApi}/product-service/api/v1/product-car/${productId}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return undefined;
    return await res.json();
  } catch (error) {
    return undefined
    // return Error;
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const productId = slug && slug?.split('id%3D')[1]
  const detailProduct: Promise<DetailProduct> = getDetailProduct(productId);
  const product = await detailProduct;
  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="detail-product-container">
        <div className="title-router">
          {/* <TitleRouter title={product?.data?.title} /> */}
          <Link href='/' className="whitespace-nowrap">Trang chủ</Link>
          <i className="fa-solid fa-chevron-right text-xs"></i>
          <Link href="/mua-ban-oto" className="whitespace-nowrap">Mua xe</Link>
          <i className="fa-solid fa-chevron-right text-xs"></i>
          <span className='truncate'>{product?.data?.title}</span>
        </div>
        <div className="product-title flex justify-between mt-5">
          <a className="product-title-left" title={product?.data?.title || "--"}>
            {product?.data?.title || "--"}
          </a>
          <div className="product-title-right flex align-center">
            <Suspense fallback={<SkeletonOption />}>
              <OptionDetail slug={slug} productId={productId} />
            </Suspense>
          </div>
        </div>
        <div className="content-product flex">
          <div className="content-product-left">
            <Suspense fallback={<SkeletonCarousel />}>
              <CarouselProductSwiper listImages={product?.data?.urlImages} />
            </Suspense>
          </div>
          <div className="content-product-right">
            <div className="info-product ">
              {/* Giá bán */}
              <div className="product-price flex flex-col p-2 mt-2">
                <span className="text-grey-100 font-medium text-base lg:text-xl">
                  Giá bán
                </span>
                <span className="font-bold text-2xl lg:text-4xl leading-8">
                  {product?.data?.price || "--"}
                </span>
              </div>
              <div className='flex flex-col gap-3 p-2 mb-2'>
                {/* Số KM đã đi */}
                <div className="product-mileage flex flex-col mt-8">
                  <span className="text-grey-100 font-medium text-sm lg:text-base">
                    Số KM đã đi
                  </span>
                  <span className="font-bold text-base lg:text-xl">
                    {product?.data?.mileage || "--"}
                  </span>
                </div>
                {/* Đời xe */}
                <div className="product-mileage flex flex-col">
                  <span className="text-grey-100 font-medium text-sm lg:text-base">
                    Đời xe
                  </span>
                  <span className="font-bold text-base lg:text-xl">
                    {product?.data?.buildDate || "--"}
                  </span>
                </div>
                {/* Vị trí */}
                <div className="product-location flex flex-col">
                  <span className="text-grey-100 font-medium text-sm lg:text-base">
                    Vị trí
                  </span>
                  <span className="font-bold text-base lg:text-xl desc-location">
                    {product?.data?.location || "--"}
                  </span>
                </div>
              </div>
            </div>
            <div className="info-owner">
              <div className="info-owner-top">
                <div className="avt"></div>
                <div className="full-name ">
                  <span className="text-grey-100 font-medium text-sm xl:text-base">
                    NGƯỜI BÁN
                  </span>
                  <span className="font-bold text-lg xl:text-xl truncate">
                    {product?.data?.contactName || "--"}
                  </span>
                </div>
              </div>
              <div className="info-owner-bottom">
                <div className="info-owner-bottom-item ">
                  <span className="text-grey-100 font-medium text-xs xl:text-sm">
                    ĐIỆN THOẠI
                  </span>
                  <span className="font-bold text-xs 2xl:text-sm flex">
                    {product?.data?.contactPhone || "--"}
                    <CopyContactPhone contactPhone={product?.data?.contactPhone || ""} />
                  </span>
                </div>
                <div className="info-owner-bottom-item ">
                  <span className="text-grey-100 font-medium text-xs xl:text-sm">
                    MÃ TIN
                  </span>
                  <span className="font-bold text-xs 2xl:text-sm truncate">
                    {product?.data?.prdNumber || "--"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-description mt-2 p-2">
          <span className='text-2xl font-bold'>Mô tả chung</span>
          <p className="text-grey-100 break-words w-4/5">
            {product?.data?.description || "--"}
          </p>
          {/* <ProductDescription description={product?.data?.description} /> */}
        </div>
        <div className="product-overview mt-8">
          <span className="text-lg font-bold">Thông số kỹ thuật</span>
          {/* <ProductOverView product={product} /> */}
          <div
            className=" general information "
          >
            <div className="flex flex-col items-center">
              {/* <i className="mdi mdi-car-back text-3xl text-orange-600" /> */}
              <img src={bodyStyle.src} />
              <span className="text-sm font-medium text-grey-100">
                Kiểu dáng
              </span>
              <span className="text-base font-bold">
                {product?.data?.bodyStyle || "--"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              {/* <i className="mdi mdi-speedometer-slow text-3xl text-orange-600" /> */}
              <img src={mileage.src} />
              <span className="text-sm font-medium text-grey-100">
                Số KM đã đi
              </span>
              <span className="text-base font-bold">
                {product?.data?.mileage || "--"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              {/* <i className="mdi mdi-calendar-month-outline text-3xl text-orange-600" /> */}
              <img src={buildDate.src} />
              <span className="text-sm font-medium text-grey-100">
                Năm sản xuất
              </span>
              <span className="text-base font-bold">
                {product?.data?.buildDate || "--"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              {/* <i className="mdi mdi-car-info text-3xl text-orange-600" /> */}
              <img src={origin.src} />
              <span className="text-sm font-medium text-grey-100">
                Xuất xứ
              </span>
              <span className="text-base font-bold">
                {product?.data?.origin || "--"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              {/* <i className="mdi mdi-car-shift-pattern text-3xl text-orange-600" /> */}
              <img src={transmission.src} />
              <span className="text-sm font-medium text-grey-100">
                Hộp số
              </span>
              <span className="text-base font-bold">
                {product?.data?.transmission || "--"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              {/* <i className="mdi mdi-sofa-single text-3xl text-orange-600" /> */}
              <img src={seats.src} />
              <span className="text-sm font-medium text-grey-100">
                Số ghế
              </span>
              <span className="text-base font-bold">
                {product?.data?.seats || "--"}
              </span>
            </div>
          </div>
        </div>
        <div className="discover-more flex flex-col mt-10">
          <span className="text-lg font-bold">Khám phá thêm</span>
          <div className='list-items-discovery '>
            <div className='items-discover'>
              <Link
                href="/mua-ban-oto?hang-xe=MAKE01009&hien-thi=GRID&sap-xep-theo=tin-dang-moi-nhat&trang=0"
                className="text-xs lg:text-base text-orange-600 font-medium">
                Toyota
              </Link>
            </div>
            <div className='items-discover'>
              <Link
                href="/mua-ban-oto?hang-xe=MAKE01003&hien-thi=GRID&sap-xep-theo=tin-dang-moi-nhat&trang=0"
                className="text-xs lg:text-base text-orange-600 font-medium">
                Huyndai
              </Link>
            </div>
            <div className='items-discover'>
              <Link
                href="/mua-ban-oto?hang-xe=MAKE01014&hien-thi=GRID&sap-xep-theo=tin-dang-moi-nhat&trang=0"
                className="text-xs lg:text-base text-orange-600 font-medium">
                Vinfast
              </Link>
            </div>
            <div className='items-discover'>
              <Link
                href="/mua-ban-oto?dia-diem=01&hien-thi=GRID&sap-xep-theo=tin-dang-moi-nhat&trang=0"
                className="text-xs lg:text-base text-orange-600 font-medium">
                Ô tô cũ tại Hà Nội
              </Link>
            </div>
            <div className='items-discover'>
              <Link
                href="/mua-ban-oto?dia-diem=79&hien-thi=GRID&sap-xep-theo=tin-dang-moi-nhat&trang=0"
                className="text-xs lg:text-base text-orange-600 font-medium">
                Ô tô cũ tại TP.HCM
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='more-product'>
        <div className='more-product-container'>
          <span className="text-lg font-bold">Tin xe khác</span>
          <MoreProduct product={product} />
        </div>
      </div>
    </>
  );
}
