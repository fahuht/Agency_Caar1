import './index.css';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import imageLogoFooter from '@/public/assets/images/Caar-logo_white.png';
import appstore from '@/public/assets/images/get-it-appstore.png';
import chplay from '@/public/assets/images/get-it-google.png';
import {
  appMoblieAndroid,
  appMoblieIos,
  PageFacebook,
} from '@/utils/constants';

const Footer = () => {
  return (
      <footer className="footer-page">
        <div className="">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 sm:w-2/3 lg:w-3/12">
              <div className="w-full mb-10">
                <Link className="mb-3" href="/">
                  <Image
                    src={imageLogoFooter}
                    alt="Logo website Caar.vn"
                    className="mb-10"
                    // width={120} //automatically provided
                    // height={50} //automatically provided
                    // blurDataURL="data:..." automatically provided
                    // placeholder="blur" // Optional blur-up while loading
                  />
                </Link>

                <p className="text-sm font-extrabold">TÊN CÔNG TY</p>
                <p className="text-base mt-1 mb-7 text-body-color">
                  CÔNG TY CỔ PHẦN GIẢI PHÁP VÀ ĐẦU TƯ AGENCY
                </p>
                <p className="text-sm font-extrabold">ĐỊA CHỈ</p>
                <p className="text-base mt-1 mb-7 text-body-color">
                  Số 23/371 Đê La Thành, Đống Đa, Hà Nội
                </p>
                <p className="text-sm font-extrabold">HOTLINE</p>
                <p className="text-base mt-1 mb-7 text-body-color">
                  info@egi.vn
                </p>
                <p className="text-sm font-extrabold">TÊN CÔNG TY</p>
                <p>0963.529.499</p>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
              <div className="w-full mb-10">
                <h4 className="text-sm font-extrabold mb-3 text-dark">
                  LIÊN KẾT NHANH
                </h4>
                <ul>
                  <li>
                    <a href="/mua-ban-oto" className="link-footer">
                      Mua xe
                    </a>
                  </li>{' '}
                  <li>
                    <a href="/tin-tuc" className="link-footer">
                      Tin tức - Thị trường
                    </a>
                  </li>
                  <li>
                    <a href="/tai-lieu" className="link-footer">
                      Tài Liệu
                    </a>
                  </li>
                  <li>
                    <a href="/cong-cu" className="link-footer">
                      Công cụ tính khoản vay
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full mb-10">
                <h4 className="text-sm font-extrabold mb-3 text-dark">
                  HƯỚNG DẪN
                </h4>
                <ul>
                  <li>
                    <a href="/ho-tro" className="link-footer">
                      Hỗ trợ dịch vụ
                    </a>
                  </li>{' '}
                  <li>
                    <a href="/cau-hoi" className="link-footer">
                      Câu hỏi thường gặp
                    </a>
                  </li>
                  <li>
                    <a href="/lien-he" className="link-footer">
                      Liên hệ
                    </a>
                  </li>
                  <li>
                    <a href="/site-map" className="link-footer">
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
              <div className="w-full mb-10">
                <h4 className="text-sm font-extrabold mb-3 text-dark">
                  DÀNH CHO BROKER
                </h4>
                <ul>
                  <li>
                    <a href="/quy-che-hoat-dong" className="link-footer">
                      Quy chế hoạt động
                    </a>
                  </li>{' '}
                  <li>
                    <a href="/dieu-khoan-thoa-thuan" className="link-footer">
                      Điều khoản thỏa thuận
                    </a>
                  </li>
                  <li>
                    <a href="/chinh-sach-bao-mat" className="link-footer">
                      Chính sách bảo mật
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full mb-10 ">
                <h4 className="text-sm font-extrabold text-dark">QUY ĐỊNH</h4>
                <ul>
                  <li>
                    <a href="/ho-tro" className="link-footer">
                      Hỗ trợ dịch vụ
                    </a>
                  </li>{' '}
                  <li>
                    <a href="/cau-hoi" className="link-footer">
                      Câu hỏi thường gặp
                    </a>
                  </li>
                  <li>
                    <a href="/lien-he" className="link-footer">
                      Liên hệ
                    </a>
                  </li>
                  <li>
                    <a href="/site-map" className="link-footer">
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
              <div className="w-full mb-10">
                <h4 className="text-sm font-extrabold mb-3 text-dark">
                  TẢI ỨNG DỤNG
                </h4>
                <Link className="mb-5" href={appMoblieIos} target="_blank">
                  <Image
                    className="mb-3"
                    src={appstore}
                    alt="Caar in Appstore"
                    width={150}
                    height={50}
                  />
                </Link>
                <Link href={appMoblieAndroid} target="_blank">
                  <Image
                    className="mb-3"
                    src={chplay}
                    alt="Caar in GooglePlay"
                    width={150}
                    height={50}
                  />
                </Link>
                <div className="flex items-center mb-6">
                  <Link href={PageFacebook} target="_blank">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36ZM16.9509 10.3994C17.7994 9.5509 18.9502 9.07422 20.1501 9.07422H22.6936C22.8152 9.07422 22.9137 9.17276 22.9137 9.29433V12.6204C22.9137 12.742 22.8152 12.8405 22.6936 12.8405H20.1501C19.9491 12.8405 19.7562 12.9204 19.614 13.0626C19.4719 13.2048 19.392 13.3976 19.392 13.5987V16.1177H22.6661C22.8093 16.1177 22.9144 16.2523 22.8797 16.3912L22.0482 19.7173C22.0237 19.8153 21.9356 19.884 21.8346 19.884H19.392V26.7074C19.392 26.8289 19.2934 26.9275 19.1719 26.9275H15.8458C15.7242 26.9275 15.6257 26.8289 15.6257 26.7074V19.884H13.2045C13.0829 19.884 12.9844 19.7855 12.9844 19.6639V16.3378C12.9844 16.2162 13.0829 16.1177 13.2045 16.1177H15.6257V13.5987C15.6257 12.3987 16.1024 11.2479 16.9509 10.3994Z"
                        fill="white"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <span className="footer-end">
            <span>© 2023 Bản quyền thuộc về Caar.vn</span>
          </span>
        </div>
      </footer>
  );
};

export default Footer;
