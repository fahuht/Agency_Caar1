"use client"

import "./index.css";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import BrokerImage from "@/public/landing-pages-image/Broker.png";
import DataImage from "@/public/landing-pages-image/Data.png";
import BrokerBoxImage from "@/public/landing-pages-image/ImageBoxBroker.png";
import MiddleImage from "@/public/landing-pages-image/MiddleImage.png";

const MiddleLandingPage = () => {
  const router = useRouter();

  const handleRedirectProductList = ():void => {
    router.push('/mua-ban-oto')
  }

  const handleRedirectRegister = ():void => {
    router.push('/dang-ki')
  }

  return (
    <div>
      {/* NGUỒN HÀNG */}
      <section className="py-5 lg:py-[50px]">
        <div className="source-container">
          <div className="col-span-1 w-full lg:w-4/5 px-4 lg:px-0 reveal">
            <div className="title-landing-page	">
              Nguồn hàng lớn cập nhật liên tục
            </div>
            <span className="description-landing-page ">
              EGI là nền tảng PropTech cung cấp data về ô tô, giúp nhà
              môi giới tiếp cận với hàng trăm nghìn thông tin chính chủ có nhu
              cầu bán, cho thuê để phục vụ hoạt động kinh doanh của mình.
            </span>
            {/* <div className="flex items-center mt-2">
              <button onClick={() => handleRedirectProductList()}>
                <div className="bg-primary-999 p-3 text-white rounded-md text-center">
                  Tìm dự án
                </div>
              </button> */}
              {/* <button className="flex items-center ml-8">
                <div className="text-primary-999 font-normal">Tư vấn ngay</div>
                <div className="text-primary-999 text-sm ml-2">
                  <i className="fa-sharp fa-light fa-chevron-right" />
                </div>
              </button> */}
            {/* </div> */}
          </div>
          <div className="col-span-1 mt-5 ">
            <Image
              src={MiddleImage}
              alt="Picture of the author"
              className="rounded-lg	reveal"
            />
          </div>
        </div>
      </section>

      {/* BROKER */}
      <section className="py-5 lg:py-[50px]">
        <div className="broker-container">
          <div className="col-span-1 image-broker mt-5">
            <Image
              src={BrokerImage}
              alt="Picture of the author"
              className="rounded-lg hidden md:block lg:block reveal"
            />
            {/* GROUP BOX */}
            <div className="group-box-borker">
              <div className="box-broker mt-2 reveal">
                <div className="image-broker-box">
                  <Image src={BrokerBoxImage} alt="Picture of the author" />
                </div>
                <div className="lg:ml-4 md:ml-4 text-center">Tìm kiếm & lưu otô</div>
              </div>
              <div className="box-broker mt-2 reveal">
                <div className="image-broker-box">
                  <Image src={BrokerBoxImage} alt="Picture of the author" />
                </div>
                <div className="lg:ml-4 md:ml-4 text-center">
                  Tin tức & báo cáo thị trường
                </div>
              </div>
              <div className="box-broker mt-2 reveal">
                <div className="image-broker-box">
                  <Image src={BrokerBoxImage} alt="Picture of the author" />
                </div>

                <div className="lg:ml-4 md:ml-4 text-center">Quản lý đơn hàng</div>
              </div>
              <div className="box-broker mt-2 reveal mr-0">
                <div className="image-broker-box">
                  <Image src={BrokerBoxImage} alt="Picture of the author" />
                </div>

                <div className="lg:ml-4 md:ml-4 text-center">Quản lý dòng tiền </div>
              </div>
            </div>
          </div>
          {/* TEXT */}
          <div className="col-span-1 w-full lg:w-4/5  lg:ml-12 px-4 lg:px-0 reveal">
            <div className="title-landing-page">
              Bộ công cụ toàn diện hỗ trợ broker
            </div>
            <span className="description-landing-page">
              EGI là nền tảng PropTech cung cấp data về xe ô tô, giúp nhà môi
              giới tiếp cận với hàng trăm nghìn thông tin chính chủ có nhu cầu
              bán, cho thuê để phục vụ hoạt động kinh doanh của mình.
            </span>
            <div className="flex items-center my-2">
              <button type="button" onClick={() => handleRedirectRegister()}>
                <div className="bg-primary-999 p-3 text-white rounded-md text-center">
                Đăng ký ngay
                </div>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* DATA REAL-TIME */}
      <section className="py-5 lg:py-[50px]">
        <div className="source-container">
          <div className="col-span-1 w-full lg:w-4/5 px-4 lg:px-0 reveal">
            <div className="title-landing-page	">
            Data/dữ liệu thị trường đa dạng & real-time
            </div>
            <span className="description-landing-page">
            EGI là nền tảng PropTech cung cấp data thị trường otô, giúp nhà môi giới tiếp cận với hàng trăm nghìn thông tin chính chủ có nhu cầu bán, cho thuê để phục vụ hoạt động kinh doanh của mình.
            </span>
            <div className="flex items-center my-2">
              <button type="button" onClick={() => handleRedirectProductList()}>
                <div className="bg-primary-999 p-3 text-white rounded-md text-center">
                Khám phá
                </div>
              </button>

            </div>
          </div>
          <div className="col-span-1 ">
            <Image
              src={DataImage}
              alt="Picture of the author"
              className="rounded-lg reveal"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiddleLandingPage;
