"use client";

// import moment from 'moment'
import "./drawer.css";

import {
  Cascader,
  ColorPicker,
  DatePicker,
  Drawer,
  Input,
  InputNumber,
  Space,
  Tooltip} from "antd";
import dayjs, { type Dayjs } from "dayjs";
import Image from "next/image";
import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";

import useGlobalStore from "@/app/store/globalStore";
import { useGetCommon } from "@/hooks/useGetCommon";
// import { ApiListResponse, CommonList, District, SubDistrict } from '@/types/global';
import { notify } from "@/utils/common";

import {
  bodyTypes,
  colors,
  fuelType,
  priceList,
  searchFields,
  seats,
  transmissionTypes,
  useStatus,
} from "../../constants";
import {
  CommonSelect,
  LocationChild,
  Price,
  RangeField,
  SearchField,
  SingleValueField,
  State,
} from "../../type";

interface Props {
  onSearch?: (data: State) => void;
  onClose: () => void;
  onOpenBookmark?: (data: State) => void;
  globalDataRequest?: State;
  baseDataRequest: State;
  isOpenDrawer?: boolean;
  type?: string;
}

export default function FormAdvancedSearch({
  onSearch,
  onOpenBookmark,
  globalDataRequest,
  onClose,
  isOpenDrawer,
  baseDataRequest,
  type,
}: Props) {
  const [locations, setLocations] = useState<LocationChild[]>([]);
  const { RangePicker } = DatePicker;
  const useInfo = useGlobalStore((state) => state.userInfo);
  const maxDate = dayjs();
  const minDate = dayjs("1900-1-1");

  const disabledDate = (current: any): boolean => {
    // THỜI GIAN LỚN NHẤT ĐƯỢC CHỌN LÀ HIỆN TẠI , NHỎ NHẤT LÀ 1-1-1900
    return current && (current < minDate || current > maxDate);
  };
  const { isLoading: isLoadingProvince, data: provinceList } = useGetCommon({
    type: "PROVINCE",
    // onSuccessCallback: (res: ApiListResponse<CommonList>) => {
    //     const newData = res?.data?.map((item) => ({
    //         value: item?.provinceCode || '',
    //         label: item?.provinceName || '',
    //         children: [],
    //         isLeaf: true,
    //         type: 'PROVINCE',
    //     }));
    //     setLocations(newData);
    // },
    // onErrorCallback: () => {
    //     // console.log('error', error)
    // }
  });

  useEffect(() => {
    // console.log('provinceList', provinceList);
    if (provinceList?.data.length) {
      const newData = provinceList?.data?.map((item) => ({
        value: item?.provinceCode || "",
        label: item?.provinceName || "",
        children: [],
        isLeaf: true,
        type: "PROVINCE",
      }));
      setLocations(newData);
    }
  }, [provinceList]);
  // const { data: districtList } = useGetCommon({
  //     type: 'DISTRICT',
  // });
  // const { data: subDistrictList } = useGetCommon({
  //     type: 'SUBDISTRICT',
  // });
  const { isLoading: isLoadingMakeList, data: makeList } = useGetCommon({
    type: "CAR_MAKE",
  });
  const { data: modelList } = useGetCommon({
    type: "CAR_MODEL",
  });

  const { data: exteriorColors } = useGetCommon({
    type: "CAR_COLORS",
  });

  const [dataRequest, setDataRequest] = useState<State>(baseDataRequest);

  useEffect(() => {
    if (globalDataRequest) {
      setDataRequest(globalDataRequest);
    }
  }, [globalDataRequest]);

  // check active
  const isActiveCommon = (
    data: CommonSelect | any,
    config: SearchField
  ): boolean => {
    // if (config.multiple) {
    //     return dataRequest[config.field as MultipleValueField].includes(data.value)
    // }
    return dataRequest[`${config.field}`] === data.value;
  };

  const handleUpdateDataRequest = (
    data: ChangeEvent<HTMLInputElement> | any,
    config: SearchField,
    specific?: "fromValueT" | "toValueT"
  ): void => {
    // debugger;
    const newData = { ...dataRequest };
    // nhập text search
    if (config.field === "filter") {
      newData[config.field] = data.target.value || "";
      return setDataRequest(newData);
    }
    // chọn khoảng giá
    if (config.field === "conversionPrice") {
      // trường hợp chọn từ khoảng có sẵn
      if (data.fromValueT || data.toValueT) {
        // nếu đã chọn thì cập cập nhật về trống
        if (
          dataRequest.conversionPrice.fromValueT === data.fromValueT &&
          dataRequest.conversionPrice.toValueT === data.toValueT
        ) {
          newData.conversionPrice.fromValueT = "";
          newData.conversionPrice.toValueT = "";
          return setDataRequest(newData);
        }
        newData.conversionPrice.fromValueT = `${data.fromValueT}`;
        newData.conversionPrice.toValueT = `${data.toValueT}`;
        return setDataRequest(newData);
      }

      // trường hợp nhập input
      if (specific) {
        newData.conversionPrice[specific] = `${data}`;
        return setDataRequest(newData);
      }
    }
    // trường hợp là select và được chọn nhiều giá trị
    // if (config.type === 'SELECT' && config.multiple) {
    //     const index = dataRequest[config.field as MultipleValueField]?.indexOf(data[config.valueField]);
    //     if (index >= 0) {
    //         newData[config.field as MultipleValueField]?.splice(index, 1);
    //         return setDataRequest(newData);
    //     }
    //     newData[config.field as MultipleValueField]?.push(data[config.valueField]);
    //     return setDataRequest(newData);
    // }
    if (config.field === "make") {
      // reset dòng xe đã chọn khi thay đổi hãng xe
      newData.model = "";
    }
    // số km đã đi
    if (config.field === "mileage") {
      if (specific === "fromValueT") {
        newData.mileage.fromValueT = `${data}` || "";
        return setDataRequest(newData);
      }
      newData.mileage.toValueT = `${data}` || "";
      return setDataRequest(newData);
    }
    if (config.field === "buildDate") {
      // eslint-disable-next-line prefer-destructuring
      newData.buildDate.fromValueT = data[0];
      // eslint-disable-next-line prefer-destructuring
      newData.buildDate.toValueT = data[1];
      return setDataRequest(newData);
    }
    // tỉnh tp - quận huyên - xã phường
    if (config.field === "provinceCode") {
      if (data.value) {
        if (data.value.length === 1) {
          // eslint-disable-next-line prefer-destructuring
          newData.provinceCode = data.value[0];
          // newData.districtCode = '';
          // newData.subDistrictCode = '';
          return setDataRequest(newData);
        }
        // if (data.value.length === 2) {
        //     newData.provinceCode = data.value[0]
        //     newData.districtCode = data.value[1];
        //     newData.subDistrictCode = '';
        //     return setDataRequest(newData)
        // }
        // if (data.value.length === 3) {
        //     newData.provinceCode = data.value[0]
        //     newData.districtCode = data.value[1];
        //     newData.subDistrictCode = data.value[2];
        //     return setDataRequest(newData)
        // }
      }
      newData.provinceCode = "";
      // newData.districtCode = '';
      // newData.subDistrictCode = '';
      return setDataRequest(newData);
    }
    // reset giá trị khi chọn 2 lần
    if (dataRequest[config.field] === data[config.valueField]) {
      newData[config.field as SingleValueField] = "";
      return setDataRequest(newData);
    }
    newData[config.field] = data[config.valueField];
    return setDataRequest(newData);
  };

  // render cho dáng xe và hãng xe
  const renderExistImage = (config: SearchField): ReactElement => {
    if (isLoadingMakeList && config.field === "make") {
      return (
        <div className="branches !flex items-center justify-center">
          <i className="fa-duotone fa-spinner-third fa-spin"></i>
        </div>
      );
    }
    // hãng xe
    if (config.field === "make") {
      return (
        <div className="branches">
          {makeList?.data.map((item) => (
            <div
              className={`branch ${dataRequest.make === item.code ? "branch-active" : ""
                }`}
              key={item.id}
              onClick={() => handleUpdateDataRequest(item, config)}
            >
              <div className="branch-logo">
                {item.urlCarMaKe && (
                  <Image
                    width={50}
                    height={50}
                    src={item.urlCarMaKe}
                    alt={item.name}
                  />
                )}
              </div>
              <div className="branch-name mt-2 whitespace-nowrap">
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    // dáng xe
    return (
      <div className="branches">
        {bodyTypes.map((item) => (
          <div
            className={`branch ${isActiveCommon(item, config) ? "branch-active" : ""
              }`}
            key={`body-types-${item.value}`}
            onClick={() => handleUpdateDataRequest(item, config)}
          >
            <div className="branch-logo">
              {item.image && (
                <Image
                  width={50}
                  height={50}
                  src={item.image}
                  alt={item.label}
                />
              )}
            </div>
            <div className="branch-name mt-2">
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // check active khoảng giá
  const isActivePrice = (item: Price): boolean =>
    dataRequest.conversionPrice.fromValueT === item.fromValueT &&
    dataRequest.conversionPrice.toValueT === item.toValueT;

  // render chọn khoảng giá
  const renderPrice = (config: SearchField): ReactElement => {
    return (
      <div className="common-select-container">
        <Space.Compact size="large" className="w-full">
          <InputNumber
            placeholder="Từ"
            className="text-xs w-60 text-primary-200"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            maxLength={20}
            value={dataRequest.conversionPrice.fromValueT}
            // value={'123123'}
            onChange={(value) =>
              handleUpdateDataRequest(value as string, config, "fromValueT")
            }
          />
          <InputNumber
            placeholder="Đến"
            className="text-xs w-60 text-primary-200"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            maxLength={20}
            value={dataRequest.conversionPrice.toValueT}
            onChange={(value) =>
              handleUpdateDataRequest(value as string, config, "toValueT")
            }
          />
        </Space.Compact>
        <div className="common-select-box">
          <div className="common-select-content">
            {priceList.map((item) => (
              <div
                key={`price-list-${item.fromValueT}-${item.toValueT}`}
                className={`common-select-item ${isActivePrice(item) ? "common-select-item-active" : ""
                  }`}
                onClick={() => handleUpdateDataRequest(item, config)}
              >
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getStartOfYear = (): Dayjs | null =>
    dataRequest.buildDate.fromValueT
      ? dayjs()
        .year(parseFloat(dataRequest.buildDate.fromValueT || "0"))
        .startOf("year")
      : null;
  const getEndOfYear = (): Dayjs | null =>
    dataRequest.buildDate.toValueT
      ? dayjs()
        .year(parseFloat(dataRequest.buildDate.toValueT || "0"))
        .endOf("year")
      : null;

  // chọn năm sản xuất
  const renderBuildDate = (config: SearchField): ReactElement => {
    return (
      <div className="common-select-container">
        <Space.Compact size="large" className="w-full">
          <RangePicker
            allowEmpty={[true, true]}
            onChange={(_, year) => handleUpdateDataRequest(year, config)}
            className="w-full range-picker-drawer"
            value={[getStartOfYear(), getEndOfYear()]}
            picker="year"
            disabledDate={disabledDate}
            placeholder={["Từ năm", "Đến năm"]}
          />
        </Space.Compact>
      </div>
    );
  };

  const handleGetOptions = (config: SearchField) => {
    // if (config.field === 'make') {
    //     return makeList?.data || []
    // }
    // if (config.field === 'model' && dataRequest.make) {
    //     return modelList?.data?.filter(item => item.makeCode === dataRequest.make) || [];
    // }
    if (config.field === "transmission") {
      return transmissionTypes;
    }
    if (config.field === "bodyStyle") {
      return bodyTypes;
    }
    if (config.field === "useStatus") {
      return useStatus;
    }
    if (config.field === "seats") {
      return seats;
    }
    if (config.field === "exteriorColor") {
      return colors;
    }
    if (config.field === "conversionPrice") {
      return priceList;
    }
    if (config.field === "fuelType") {
      return fuelType;
    }
    return [];
  };

  // render chung cho các select
  const renderCommonSelect = (config: SearchField): ReactElement => {
    return (
      <div className="common-select-container">
        {config.type === "FROM_TO" && (
          <Space.Compact size="large" className="w-full">
            <InputNumber
              placeholder="Từ"
              className="text-xs w-60 text-primary-200"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              maxLength={20}
              value={dataRequest[config.field as RangeField].fromValueT}
              // value={'123123'}
              onChange={(value) =>
                handleUpdateDataRequest(value as string, config, "fromValueT")
              }
            />
            <InputNumber
              placeholder="Đến"
              className="text-xs w-60 text-primary-200"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              maxLength={20}
              value={dataRequest[config.field as RangeField].toValueT}
              onChange={(value) =>
                handleUpdateDataRequest(value as string, config, "toValueT")
              }
            />
          </Space.Compact>
        )}
        <div className="common-select-box">
          <div className="common-select-content">
            {config.field === "model" &&
              dataRequest.make &&
              modelList?.data
                ?.filter((item) => item.makeCode === dataRequest.make)
                .map((item) => (
                  <div
                    key={`common-${config.field}-${item.code}`}
                    className={`common-select-item ${dataRequest.model === item.code
                        ? "common-select-item-active"
                        : ""
                      }`}
                    onClick={() => handleUpdateDataRequest(item, config)}
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
            {config.field !== "model" &&
              handleGetOptions(config).map((item) => (
                <div
                  key={`common-${config.field}-${item.value}`}
                  className={`common-select-item ${isActiveCommon(item, config)
                      ? "common-select-item-active"
                      : ""
                    }`}
                  onClick={() => handleUpdateDataRequest(item, config)}
                >
                  <span>{item.label}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  // render chọn màu
  const renderColors = (config: SearchField): ReactElement => {
    return (
      <div className="common-select-container">
        <div className="common-select-box">
          <div className="common-select-content">
            {exteriorColors?.data?.map((item) => (
              <div
                key={`common-${config.field}-${item.code}`}
                className={`color-item ${dataRequest.exteriorColor === item.code
                    ? "color-item-active"
                    : ""
                  }`}
                onClick={() => handleUpdateDataRequest(item, config)}
              >
                <Tooltip placement="top" title={item.name}>
                  <div>
                    <ColorPicker value={item.value} open={false} />
                  </div>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // khi thay đổi đại điểm
  const onChangeLocation = (
    value: (string | number)[],
    selectedOptions: LocationChild[],
    config: SearchField
  ): void => {
    const data = { value, selectedOptions };
    return handleUpdateDataRequest(data, config);
  };

  // lấy danh sanh quận huyện theo tỉnh tp
  // const getDistrictByProvince = (code: string): District[] => {
  //     const data = districtList?.data?.filter(item => item.provinceCode === code) || [];
  //     return data;
  // }

  // xã phường theo quận huyện
  // const getSubDistrictByDistrict = (code: string): SubDistrict[] => {
  //     const data = subDistrictList?.data?.filter(item => item.districtCode === code) || [];
  //     return data;
  // }

  // load dữ liệu khi chọn tỉnh tp / quận huyện
  // const loadDataLocation = async (selectedOptions: LocationChild[]): Promise<void> => {
  //     try {
  //         const targetOption = selectedOptions[selectedOptions.length - 1];
  //         const isProvince = targetOption?.type === 'PROVINCE';
  //         if (isProvince) {
  //             const data = getDistrictByProvince(`${targetOption?.value}`);
  //             const newData = data?.map((item) => ({
  //                 value: item.districtCode || '',
  //                 label: item.districtName || '',
  //                 children: [],
  //                 isLeaf: false,
  //                 type: 'DISTRICT',
  //             }));
  //             if (targetOption) {
  //                 targetOption.children = newData;
  //             }
  //             return setLocations([...locations]);
  //         }
  //         const data = getSubDistrictByDistrict(`${targetOption?.value}`);
  //         const newData = data?.map((item) => ({
  //             value: item.subDistrictCode || '',
  //             label: item.subDistrictName || '',
  //             children: [],
  //             isLeaf: true,
  //             type: 'SUBDISTRICT',
  //         }));
  //         if (targetOption) {
  //             targetOption.children = newData;
  //         }
  //         return setLocations([...locations]);
  //     } catch (error) {
  //         return notify('Có lỗi trong quá trình thực hiện, vui lòng thử lại sau', 'warning')
  //     }
  // };

  // render chọn địa điểm
  const renderDiaPhuong = (config: SearchField): ReactElement => {
    return (
      <div className="search-item-button !px-0">
        <div className="search-item-button-title">
          <Cascader
            loading={isLoadingProvince}
            options={locations}
            value={dataRequest.provinceCode ? [dataRequest.provinceCode] : []}
            // loadData={loadDataLocation}
            className="w-full"
            onChange={(value, selectedOptions) =>
              onChangeLocation(value, selectedOptions, config)
            }
            changeOnSelect
            showSearch
            placeholder="Địa điểm"
          />
        </div>
      </div>
    );
  };

  const handleSearch = (): void => {
    if (onSearch) {
      // console.log('dataRequest', dataRequest);
      return onSearch(dataRequest);
    }
    return undefined
  };

  // render các trường
  const renderContentItemSearch = (config: SearchField): ReactElement => {
    if (config.field === "filter") {
      return (
        <Input
          className="h-12 bg-primary-100"
          placeholder="Nhập từ khóa cần tìm"
          onChange={(e) => handleUpdateDataRequest(e, config)}
          value={dataRequest.filter}
          // allowClear
          suffix={<i className="fa-solid fa-magnifying-glass"></i> }
          onPressEnter={() => handleSearch()}
        />
      );
    }
    if (config.field === "provinceCode") {
      return renderDiaPhuong(config);
    }
    if (config.field === "make" || config.field === "bodyStyle") {
      return renderExistImage(config);
    }
    if (config.field === "conversionPrice") {
      return renderPrice(config);
    }
    if (config.field === "buildDate") {
      return renderBuildDate(config);
    }
    if (config.field === "exteriorColor") {
      return renderColors(config);
    }
    // console.log('====================================');
    // console.log('config', config);
    // console.log('====================================');
    return renderCommonSelect(config);
  };

  // console.log('dataRequest', dataRequest);

  const renderItemSearch = (item: SearchField): ReactElement => {
    return (
      <div className="advanced-item" key={item.field}>
        <div className="advanced-item-title">
          <span>{item.placeHolder}</span>
        </div>
        <div className="advanced-item-content">
          <div className="search-item">{renderContentItemSearch(item)}</div>
        </div>
      </div>
    );
  };

  

 

  const isActiveSaveBookmark = (): boolean => {
    return Boolean(
      dataRequest.filter ||
      dataRequest.make ||
      dataRequest.model ||
      dataRequest.conversionPrice.fromValueT ||
      dataRequest.conversionPrice.toValueT ||
      dataRequest.mileage.fromValueT ||
      dataRequest.mileage.toValueT ||
      dataRequest.buildDate.fromValueT ||
      dataRequest.buildDate.toValueT ||
      dataRequest.bodyStyle ||
      dataRequest.useStatus ||
      dataRequest.seats ||
      dataRequest.exteriorColor ||
      dataRequest.provinceCode ||
      dataRequest.provinceCode ||
      dataRequest.districtCode ||
      dataRequest.subDistrictCode ||
      dataRequest.transmission ||
      dataRequest.fuelType
    );
  };

  const handleOpenSaveBookmark = (): void => {
    if (onOpenBookmark) {
      if (!useInfo?.id) {
        return notify("Bạn cần đăng nhập để sử dụng tính năng này", "warning");
      }
      if (!isActiveSaveBookmark()) {
        return notify("Bạn chưa chọn giá trị", "error");
      }
      return onOpenBookmark(dataRequest);
    }
    return undefined
  };

  const handleReset = (): void => {
    setDataRequest(baseDataRequest);
  };

  const handleCloseDrawer = (): void => {
    onClose();
  };

  return (
    <Drawer
      size="default"
      className="drawer-advanced-search"
      open={isOpenDrawer}
      onClose={() => handleCloseDrawer()}
    >
      <div className="relative h-5/6 overflow-y-scroll">
        <div className="box-advanced">
          {searchFields
            .filter((item) => item.showInAdvanced)
            .map((field) => renderItemSearch(field))}
        </div>
      </div>
      <div
        className={`search-item col-span-2 grid ${type ? "grid-cols-2" : "grid-cols-3"
          }  gap-1 mt-10`}
      >
        <Tooltip placement="top" title="Tìm kiếm">
          <div
            className="search-item-action form-search"
            onClick={handleSearch}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </Tooltip>
        {!type && (
          <Tooltip placement="top" title="Lưu bộ lọc">
            <div
              className={`search-item-action save-bookmark ${isActiveSaveBookmark() ? "save-bookmark-active" : ""
                }`}
              onClick={handleOpenSaveBookmark}
            >
              <i className="fa-regular fa-book-bookmark"></i>
            </div>
          </Tooltip>
        )}
        <Tooltip placement="top" title="Đặt lại giá trị">
          <div className="search-item-action reset-form" onClick={handleReset}>
            <i className="fa-solid fa-rotate-left"></i>
          </div>
        </Tooltip>
      </div>
    </Drawer>
  );
}
