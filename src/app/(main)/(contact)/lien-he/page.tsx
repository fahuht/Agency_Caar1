import "./index.css";

import React from "react";

export default function Contact() {
  return (
      <div className="contact-web p-24 m-0 grid grid-cols-12 w-full">
        <div className="flex flex-col justify-center col-span-12 lg:col-span-6">
          <ul className="mb-10">
            <li className="style-title font-bold text-xl mb-3">
              LIÊN HỆ VỚI CHÚNG TÔI
            </li>
            <li className="font-semibold text-base">
              Công Ty Cổ Phần Giải Pháp Và Đầu Tư Agency
            </li>
          </ul>

          <ul className="text-base leading-9">
            <div className="flex items-center">
              <i className="fa-regular fa-location-dot mr-4" />
              <li>
                Địa chỉ: Số 23 Ngõ 371 Đê La Thành, Phường Ô Chợ Dừa, Quận Đống
                Đa, Hà Nội
              </li>
            </div>

            <div className="flex items-center">
              <i className="fa-light fa-phone mr-4" />
              <li> 0963 529 499</li>
            </div>

            <div className="flex items-center">
              <i className="fa-light fa-envelope mr-4" />
              <li> info@egi.vn</li>
            </div>
          </ul>
        </div>

        <div className="map flex justify-end col-span-12 lg:col-span-6">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.2729125147916!2d105.81770841161642!3d21.02176338793656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab708014785f%3A0x99a3901efdbbc9f2!2zMjMgTmfDtSAzNzEgxJDDqiBMYSBUaMOgbmgsIENo4bujIEThu6thLCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1685443357188!5m2!1sen!2s"
            width="500"
            height="450"
            // style="border:0;"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
  );
}
