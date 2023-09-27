/* eslint-disable consistent-return */
/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import "./index.css";

import { useMutation } from "@tanstack/react-query";
import { Breadcrumb, Divider, Dropdown, MenuProps } from "antd";
import { ChangeEvent, useEffect, useState } from "react";

import LoadingClient from "@/components/LoadingClient/LoadingClient";
import { GetListStatusRequest, ItemStatus, Product } from "@/types/global";
import { notify } from "@/utils/common";

import PageHeader from "../../(products)/mua-ban-oto/PageHeader";
import { State } from "../../(products)/mua-ban-oto/type";
import { getDataCollections, getListStatusCollections } from "./api";
import CollectionsColumn from "./components/CollectionsColumn/CollectionsColumn";
import CollectionList from "./components/CollectionsList/CollectionsList";
import {
  Collection,
  displayType,
  // DisplayCollectionType,
  SearchParams,
} from "./type";

interface Props {
  searchParams: SearchParams;
}

export default function Page({ searchParams }: Props) {
  const itemBreadcrumb = [
    { href: "/", title: "Trang chủ" },
    { title: "Tin đã lưu" },
  ];

  const baseDataRequest = {
    filter: "",
    sort: "createdDate",
    order: "DESC",
    page: "0",
    make: "", //hãng xe
    model: "", //dòng xe List<String>
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
    bodyStyle: "", //kiểu dáng
    useStatus: "", //trạng thái sử dung List<String>
    seats: "", //số chỗ List<Integer>
    exteriorColor: "", //màu
    provinceCode: "", //tỉnh,, thành phố
    districtCode: "", //huyện,quận
    subDistrictCode: "", //xã, phường
    transmission: "", // 0 - số sàn , 1 - số tự động
    fuelType: "", // loại nhiên liệu
    productStatusCode: [],
    boardId: "",
  };

  // STATE
  const [dataRequest, setDataRequest] = useState<State>(baseDataRequest);

  const [dataStatus, setDataStatus] = useState<ItemStatus[]>([]);
  const [dataCollections, setDataCollections] = useState<Collection<Product>[]>(
    []
  );
  const [displayTypeActive, setDisplayTypeActive] = useState<
    string | undefined
  >(displayType.grid);

  // Call Api trạng thái bộ sưu tập
  const mutationGetListStatus = useMutation((data: GetListStatusRequest) =>
    getListStatusCollections(data)
  );

  // useMutation
  const mutationCheckProductInCollection = useMutation((data: State) =>
    getDataCollections(data)
  );

  // Xử lí tìm kiếm danh sách bộ sưu tập
  const handleSearchCollections = (data?: State): void => {
    if (data) {
      const newDataRequest = {
        ...data,
        productStatusCode:
          Array.isArray(data.productStatusCode) &&
          data.productStatusCode.length > 0
            ? data.productStatusCode
            : dataRequest.productStatusCode,
      };
      localStorage.setItem(
        "requestCollections",
        JSON.stringify(newDataRequest)
      );
      setDataRequest(newDataRequest);
      mutationCheckProductInCollection.mutate(newDataRequest, {
        onSuccess: (res) => {
          if (res && res.data && res.status === 1) {
            setDataCollections(res.data);
          }
        },
        onError: () => notify("Có lỗi trong quá trình thực hiện", "error"),
      });
    } else {
      mutationCheckProductInCollection.mutate(dataRequest, {
        onSuccess: (res) => {
          if (res && res.data && res.status === 1) {
            setDataCollections(res.data);
          }
        },
        onError: () => notify("Có lỗi trong quá trình thực hiện", "error"),
      });
    }
  };

  // Call api danh sách khi lần đầu vào trang
  useEffect(() => {
    const getDataLocal = localStorage.getItem("requestCollections");

    const parseDataLocal =
      (getDataLocal && JSON.parse(getDataLocal)) || baseDataRequest;

    const newDataLocal = {
      ...parseDataLocal,
      boardId: "",
      sort: "createdDate",
      order: "DESC",
    };
    handleSearchCollections(newDataLocal || dataRequest);
    const newDataRequest = {
      types: ["PRODUCT_PERSONAL_STATUS"],
    };
    mutationGetListStatus.mutate(newDataRequest, {
      onSuccess: (res) => {
        if (res.status === 1) {
          setDataStatus(res.data.PRODUCT_PERSONAL_STATUS);
        }
      },
      onError: () => notify("Có lỗi trong quá trình thực hiện", "error"),
    });
  }, []);

  // Xử lí tìm kiếm theo trạng thái bộ sưu tập
  const handleSearchStatus = (item?: ItemStatus): void => {
    const newDataRequest = {
      ...dataRequest,
      productStatusCode: item?.code
        ? [item?.code]
        : ["PSS001", "PSS002", "PSS003"],
    };
    setDataRequest(newDataRequest);
    return handleSearchCollections(newDataRequest);
  };

  const handleUpdateDisplayType = (type: string): void => {
    setDisplayTypeActive(type);
  };

  const handleUpdateDataRequest = (
    data: ChangeEvent<HTMLInputElement> | any,
    config: string
  ): void => {

    const newData = { ...dataRequest };
    if (config === "sort") {
      if (data === "1") {
        newData.sort = "createdDate";
        newData.order = "DESC";
        handleSearchCollections(newData);
        return setDataRequest(newData);
      }
      newData.sort = "createdDate";
      newData.order = "ASC";
      handleSearchCollections(newData);
      return setDataRequest(newData);
    }

  };

  const sortMenu: MenuProps["items"] = [
    {
      key: "1",
      label: <span>Mới nhất</span>,
      onClick: () => handleUpdateDataRequest("1", "sort"),
    },
    {
      key: "2",
      label: <span>Cũ nhất</span>,
      onClick: () => handleUpdateDataRequest("2", "sort"),
    },
  ];

  const getSortName = (): string => {
    if (dataRequest.sort === "createdDate" && dataRequest.order === "DESC") {
      return "Mới nhất";
    }

    return "Cũ nhất";
  };

  return (
    <div className="collection-container">
      <div className="router-title pt-2">
        <Breadcrumb items={itemBreadcrumb} separator=">" />
      </div>

      {/* Form search */}
      <div className="form-search">
        <PageHeader
          type="collections"
          searchParams={searchParams}
          displayTypeFromServer={searchParams["hien-thi"] || "GRID"}
          handleSearchCollections={handleSearchCollections}
        />
      </div>

      {/* Hiển thị type */}
      <div className="container flex justify-end items-center mx-auto mt-2">
        <div className="select-type-display-container">
          <button
            type="button"
            onClick={() => handleUpdateDisplayType(displayType.grid)}
          >
            <i
              className={`fa-light fa-grid-2 ${
                displayTypeActive === displayType.grid ? "text-primary-200" : ""
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => handleUpdateDisplayType(displayType.column)}
          >
            <i
              className={`fa-light fa-diagram-cells ${
                displayTypeActive === displayType.column
                  ? "text-primary-200"
                  : ""
              }`}
            />
          </button>
        </div>
        <div className="flex items-center">
          <div>Sắp xếp theo:</div>
          <div className="ml-2 ">
            <Dropdown
              menu={{ items: sortMenu }}
              placement="bottom"
              trigger={["click"]}
            >
              <span className="text-sm flex items-center gap-1 text-primary-200 cursor-pointer">
                {getSortName()}{" "}
                <i className="fa-sharp fa-light fa-chevron-down" />
              </span>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Trạng thái collections */}
      <div className="status-collection-container mb-3 mt-2">
        <div className="text-slate-500">Trạng thái</div>
        <Divider type="vertical" className="divider-status-collections" />
        <div className="flex ">
          <button type="button"
            onClick={() => handleSearchStatus()}
            >

          <span
            className={`item-status hover:text-orange-600 font-semibold cursor-pointer p-2
          ${
            dataRequest.productStatusCode &&
            dataRequest.productStatusCode.length === 3 &&
            "text-orange-600 border-orange-600 border-b"
          }`}
          >
            Tất cả
          </span>
          </button>

          {dataStatus.length > 0 &&
            dataStatus.map((item) => {
              return (
                <button
                key={item.id}
                type="button"
                onClick={() => handleSearchStatus(item)}
                >

                <span
                  className={`item-status text-base hover:text-orange-600 font-semibold cursor-pointer p-2
                 ${
                   dataRequest.productStatusCode &&
                   dataRequest.productStatusCode.length < 2 &&
                   dataRequest?.productStatusCode[0] === item.code &&
                   "text-orange-600 border-orange-600 border-b"
                 }`}
                >
                  {item.name}
                </span>
                </button>

              );
            })}
        </div>
      </div>

      {/* Render danh sách bộ sưu tập */}
      {displayTypeActive === "GRID" && (
        <CollectionList
          collections={dataCollections}
          // dataRequest={dataRequest}
          handleSearchCollections={handleSearchCollections}
          // displayType={
          //   (searchParams["hien-thi"] as DisplayCollectionType) || "GRID"
          // }
        />
      )}

      {displayTypeActive === "COLUMN" && (
        <CollectionsColumn
          collections={dataCollections}
          // dataRequest={dataRequest}
          handleSearchCollections={handleSearchCollections}
        />
      )}
      <LoadingClient
        isLoading={
          mutationGetListStatus.isLoading ||
          mutationCheckProductInCollection.isLoading
        }
      />
    </div>
  );
}
