"use client";

import "./index.css";

import { SearchOutlined } from "@ant-design/icons";
import { Divider, Input } from "antd";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, { ChangeEvent, useState } from "react";

import DrawerAdvancedSearch from "@/app/(main)/(products)/mua-ban-oto/components/Drawer/DrawerAdvancedSearch";
import {  State } from "@/app/(main)/(products)/mua-ban-oto/type";

const PageHeaderLandingPage = () => {
  const router = useRouter();

  const baseDataRequest = {
    filter: "", // text search
    make: "", // hãng xe
    model: "", // dòng xe List<String>
    conversionPrice: {
      // mức giá
      fromValueT: "",
      toValueT: "",
    }, //giá xe
    mileage: {
      // số km đã đi
      fromValueT: "",
      toValueT: "",
    }, //số km
    buildDate: {
      // năm sản xuất
      fromValueT: "",
      toValueT: "",
    },
    bodyStyle: "", // kiểu dáng
    useStatus: "", // trạng thái sử dung List<String>
    seats: "", // số chỗ List<Integer>
    exteriorColor: "", // màu
    provinceCode: "", // tỉnh, thành phố
    districtCode: "", // huyện,quận
    subDistrictCode: "", // xã, phường
    transmission: "",
    fuelType: "", // loại nhiên liệu
    sort: "createdDate",
    order: "DESC",
    page: "0",
  };

  // STATE
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [dataRequest, setDataRequest] = useState<State>(baseDataRequest);

  const handleCloseDrawer = (): void => {
    setIsOpenDrawer(false);
  };


  const handleOpenDrawerSearch = (): void => {
    setIsOpenDrawer(true);
  };

  const getSlugStatus = (useStatus?: string): string => {
    if (useStatus === "0") {
      return "moi";
    }
    if (useStatus === "1") {
      return "da-qua-su-dung";
    }
    return "";
  };

  const getSlugSort = (data: State): string => {
    if (data.sort === "createdDate" && data.order === "DESC") {
      return "tin-dang-moi-nhat";
    }
    if (data.sort === "conversionPrice" && data.order === "DESC") {
      return "gia-thap-den-cao";
    }
    return "gia-cao-den-thap";
  };

  const getQueryString = (data: State) => {
    const config = {
      skipEmptyString: true,
      skipNull: true,
    };
    const newData = {
      "tu-khoa": data.filter,
      "hang-xe": data.make,
      "dong-xe": data.model,
      "gia-ban-tu": data.conversionPrice.fromValueT,
      "gia-ban-den": data.conversionPrice.toValueT,
      "km-da-di-tu": data.mileage.toValueT,
      "km-da-di-den": data.mileage.toValueT,
      "nam-san-xuat-tu": data.buildDate.fromValueT,
      "nam-san-xuat-den": data.buildDate.toValueT,
      "dang-xe": data.bodyStyle,
      "ghe-ngoi": data.seats,
      "trang-thai-su-dung": getSlugStatus(data.useStatus),
      "mau-xe": data.exteriorColor,
      "dia-diem": data.provinceCode,
      "loai-dong-co": "",
      "nhien-lieu": data.fuelType,
      "loai-hop-so": data.transmission,
      "sap-xep-theo": getSlugSort(data),
      "hien-thi": "GRID",
      "trang-thai-san-pham": data.productStatusCode || [],
      boardId: data.boardId || "",
      trang: data.page || "0",
    };
    const params = queryString.stringify(newData, config);
    return params;
  };

  const handleUpdateDataRequest = (
    data: ChangeEvent<HTMLInputElement> | any,
    config: string
  ): void => {
    const newData = { ...dataRequest };

    if (config === "filter") {
      newData[config] = data.target.value || "";
      return setDataRequest(newData);
    }
    return undefined
  };

  const handleSearch = (data: State): void => {
    setIsOpenDrawer(false);
    setDataRequest(data);
    const url = getQueryString(data);

    return router.push(`/mua-ban-oto?${url}`);
  };

  const renderRightIcon = (
    <div className="flex items-center">
      <Divider
        type="vertical"
        style={{ backgroundColor: "#ccc" }}
        className="h-7"
      />
      <div className="mr-4">
        <button
        type="button"
          className="flex items-center"
          onClick={() => handleOpenDrawerSearch()}
        >
          <div className="text-primary-999">
            <i className="fa-light fa-sliders" />
          </div>
          <div className="text-primary-999 ml-2">Bộ lọc</div>
        </button>
      </div>
      <div>
        <button type="button" onClick={() => handleSearch(dataRequest)}>
          <div className="text-white bg-primary-999	p-1 rounded-2xl px-4">
            Tìm kiếm
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="header-landing-page">
      <div className="container mx-auto">
        <div className="mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-5/12 grid grid-cols-2 reveal active">
            <div className="hero-content col-span-3">
              <h1 className="title-header">
                Nền tảng hàng đầu cho những nhà giao dịch ôtô
              </h1>
              <div>
                <Input
                  onChange={(e) => handleUpdateDataRequest(e, "filter")}
                  value={dataRequest.filter}
                  onPressEnter={() => handleSearch(dataRequest)}
                  className="h-14"
                  placeholder="Tìm kiếm sản phẩm oto..."
                  prefix={<SearchOutlined />}
                  size="large"
                  suffix={renderRightIcon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenDrawer && (
        <DrawerAdvancedSearch
          type="landing-page"
          isOpenDrawer={isOpenDrawer}
          baseDataRequest={baseDataRequest}
          onClose={() => handleCloseDrawer()}
          globalDataRequest={dataRequest}
          onSearch={handleSearch}
        />
      )}
    </div>
  );
};

export default PageHeaderLandingPage;
