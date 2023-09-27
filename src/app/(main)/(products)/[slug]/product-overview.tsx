"use client";

import { Collapse } from "antd";
import * as React from "react";

import { DetailProduct } from "./type";

export default function ProductOverView({
  product,
}: {
  product: DetailProduct;
}) {
  const { Panel } = Collapse;
  return (
    <div>
      <Collapse
        defaultActiveKey="1"
        expandIconPosition="right"
        bordered={false}
      >
        <Panel
          header={
            <span className="text-lg font-bold">Thông tin tổng quan</span>
          }
          key="1"
        >
          <div className="flex general information gap-3 justify-around">
            <div className="flex flex-col">
              <i className="mdi mdi-car-back text-3xl text-orange-600" />
              <span className="text-sm font-medium text-grey-100">
                Kiểu dáng
              </span>
              <span className="text-base font-bold">
                {product.data.bodyStyle}
              </span>
            </div>
            <div className="flex flex-col">
              <i className="mdi mdi-speedometer-slow text-3xl text-orange-600" />
              <span className="text-sm font-medium text-grey-100">
                Số KM đã đi
              </span>
              <span className="text-base font-bold">
                {product.data.mileage}
              </span>
            </div>
            <div className="flex flex-col">
              <i className="mdi mdi-calendar-month-outline text-3xl text-orange-600" />
              <span className="text-sm font-medium text-grey-100">
                Năm sản xuất
              </span>
              <span className="text-base font-bold">
                {product.data.buildDate}
              </span>
            </div>
            <div className="flex flex-col">
              <i className="mdi mdi-car-info text-3xl text-orange-600" />
              <span className="text-sm font-medium text-grey-100">Xuất xứ</span>
              <span className="text-base font-bold">{product.data.origin}</span>
            </div>
            <div className="flex flex-col">
              <i className="mdi mdi-car-shift-pattern text-3xl text-orange-600" />
              <span className="text-sm font-medium text-grey-100">Hộp số</span>
              <span className="text-base font-bold">
                {product.data.transmission}
              </span>
            </div>
            <div className="flex flex-col">
              <i className="mdi mdi-sofa-single text-3xl text-orange-600" />
              <span className="text-sm font-medium text-grey-100">Số ghế</span>
              <span className="text-base font-bold">{product.data.seats}</span>
            </div>
          </div>
        </Panel>
        <Panel
          header={<span className="text-lg font-bold">An toàn</span>}
          key="2"
        ></Panel>
        <Panel
          header={<span className="text-lg font-bold">Tiện nghi</span>}
          key="3"
        ></Panel>
        <Panel
          header={<span className="text-lg font-bold">Thông số kỹ thuật</span>}
          key="4"
        ></Panel>
      </Collapse>
    </div>
  );
}
