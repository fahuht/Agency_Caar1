"use client";

import "./index.css";

import {
  Affix,
  Cascader,
  Checkbox,
  Dropdown,
  Input,
  InputNumber,
  MenuProps,
  Popover,
  Space,
  Tooltip,
} from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import queryString from "query-string";
import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

import useGlobalStore from "@/app/store/globalStore";
import { useGetCommon } from "@/hooks/useGetCommon";
import PageHeaderImage from "@/public/advance-search-page-header.png";
import { Bookmark, CarMake, CarModel } from "@/types/global"; //District, SubDistrict
import { notify, readVietnameseCurrency } from "@/utils/common";

import DrawerAdvancedSearch from "./components/Drawer/DrawerAdvancedSearch";
import SaveBookmark from "./components/SaveBookmark/SaveBookmark";
import WindowResizeHandler from "./components/WindowResizeHandler";
import { displayType, priceList, searchFields } from "./constants";
import {
  LocationChild,
  Price,
  SearchField,
  SearchParams,
  SingleValueField,
  State,
} from "./type";
// import SkeletonProduct from './components/SkeletonProduct';
interface Props {
  // onSearch?: (data: State) => void;
  globalDataRequest?: State;
  displayTypeFromServer?: string;
  searchParams?: SearchParams;
  type?: string;
  handleSearchCollections?: (data: State) => void;
  handleGetDetailCollection?: (data: State) => void;
}

const FormAdvancedSearch = ({
  searchParams,
  globalDataRequest,
  displayTypeFromServer,
  type,
  handleSearchCollections,
  handleGetDetailCollection
}: Props) => {
  const [locations, setLocations] = useState<LocationChild[]>([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [isOpenSaveBookmark, setIsOpenSaveBookmark] = useState<boolean>(false);
  const [bookmarkActive, setBookmarkActive] = useState<Bookmark | null>(null);
  const [displayTypeActive, setDisplayTypeActive] = useState<
    string | undefined
  >(displayTypeFromServer);
  const [advancedSearchHeight, setAdvancedSearchHeight] = useState(110); // chiều cao mặc định
  const useInfo = useGlobalStore((state) => state.userInfo);
  const pathName = usePathname();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
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

  const baseDataRequestCollections = {
    boardId: "",
    productStatusCode: [],
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

  const parseValueUseStatus = (data: string): string => {
    if (data === "moi") {
      return "0";
    }
    if (data === "da-qua-su-dung") {
      return "1";
    }
    return "";
  };

  const parseValueUseSort = (data: string): string => {
    if (data === "tin-dang-moi-nhat") {
      return "createdDate";
    }
    if (data === "gia-thap-den-cao") {
      return "conversionPrice";
    }
    return "conversionPrice";
  };

  const parseValueOrder = (data: string): string => {
    if (data === "tin-dang-moi-nhat") {
      return "DESC";
    }
    if (data === "gia-thap-den-cao") {
      return "ASC";
    }
    return "DESC";
  };

  const { isLoading: isLoadingProvince, data: provinceList } = useGetCommon({
    type: "PROVINCE",
    // onSuccessCallback: (res: ApiListResponse<CommonList>) => {
    //     console.log('res', res);

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

  const { data: bookmarkList } = useGetCommon({
    type: "BOOKMARKS",
  });

  const [dataRequest, setDataRequest] = useState<State>(
    type === "collections" ? baseDataRequestCollections : baseDataRequest
  );

  // map dataRequest từ url
  useEffect(() => {
    const requestCollections = localStorage.getItem('requestCollections')

    if (requestCollections && type) {
      setDataRequest(JSON.parse(requestCollections))
    }
    // check searchParam có dữ liệu
    if (searchParams && Object.keys(searchParams).length > 0) {
      const newDataRequest = {
        ...dataRequest,
        filter: searchParams['tu-khoa'] || "",
        make: searchParams['hang-xe'] || "",
        model: searchParams['dong-xe'] || "",
        conversionPrice: {
          fromValueT: searchParams['gia-ban-tu'] || "",
          toValueT: searchParams['gia-ban-den'] || ""
        },
        mileage: {
          fromValueT: searchParams['km-da-di-tu'] || "",
          toValueT: searchParams['km-da-di-den'] || ""
        },
        buildDate: {
          fromValueT: searchParams['nam-san-xuat-tu'] || "",
          toValueT: searchParams['nam-san-xuat-den'] || ""
        },
        bodyStyle: searchParams['dang-xe'] || "",
        useStatus: parseValueUseStatus(searchParams['trang-thai-su-dung']) || "",
        seats: searchParams['ghe-ngoi'] || "",
        exteriorColor: searchParams['mau-xe'] || "",
        provinceCode: searchParams['dia-diem'] || "",
        // districtCode: ,// huyện,quận
        // subDistrictCode: ,// xã, phường
        transmission: searchParams['loai-hop-so'] || "",
        fuelType: searchParams['nhien-lieu'] || "",
        sort: parseValueUseSort(searchParams['sap-xep-theo']) || "createdDate",
        order: parseValueOrder(searchParams['sap-xep-theo']) || "DESC",
        page: searchParams.trang || "0"
      }
      setDataRequest(newDataRequest)
    }
      setDisplayTypeActive(searchParams && searchParams['hien-thi'] || 'GRID')
  }, [searchParams])

  // map dataRequest từ url

  useEffect(() => {
    // const getRequestToLocal = JSON.parse(localStorage.getItem('requestCollections') || '')

    // check searchParam có dữ liệu
    if ((searchParams && Object.keys(searchParams).length > 0)) {
      const newDataRequest = {
        ...dataRequest,
        filter: searchParams["tu-khoa"] || "",
        make: searchParams["hang-xe"] || "",
        model: searchParams["dong-xe"] || "",
        conversionPrice: {
          fromValueT: searchParams["gia-ban-tu"] || "",
          toValueT: searchParams["gia-ban-den"] || "",
        },
        mileage: {
          fromValueT: searchParams["km-da-di-tu"] || "",
          toValueT: searchParams["km-da-di-den"] || "",
        },
        buildDate: {
          fromValueT: searchParams["nam-san-xuat-tu"] || "",
          toValueT: searchParams["nam-san-xuat-den"] || "",
        },
        bodyStyle: searchParams["dang-xe"] || "",
        useStatus:
          parseValueUseStatus(searchParams["trang-thai-su-dung"]) || "",
        seats: searchParams["ghe-ngoi"] || "",
        exteriorColor: searchParams["mau-xe"] || "",
        provinceCode: searchParams["dia-diem"] || "",
        productStatusCode: [searchParams["trang-thai-san-pham"]] || "",
        boardId: searchParams.boardId || "",
        // districtCode: ,// huyện,quận
        // subDistrictCode: ,// xã, phường
        transmission: searchParams["loai-hop-so"] || "",
        fuelType: searchParams["nhien-lieu"] || "",
        sort: parseValueUseSort(searchParams["sap-xep-theo"]) || "createdDate",
        order: parseValueOrder(searchParams["sap-xep-theo"]) || "DESC",
        page: searchParams.trang || "0",
      };
      return setDataRequest(newDataRequest);
    }
    if (searchParams && searchParams["hien-thi"]) {
     return setDisplayTypeActive(searchParams["hien-thi"]);
    }
    // if((getRequestToLocal && Object.keys(getRequestToLocal).length)) {
    //   const newDataRequest = {
    //     ...dataRequest,
    //     filter: getRequestToLocal?.filter || "",
    //     make: getRequestToLocal?.make || "",
    //     model: getRequestToLocal?.model || "",
    //     conversionPrice: {
    //       fromValueT: getRequestToLocal?.conversionPrice?.fromValueT || "",
    //       toValueT: getRequestToLocal?.conversionPrice?.toValueT || "",
    //     },
    //     mileage: {
    //       fromValueT: getRequestToLocal?.mileage?.fromValueT  || "",
    //       toValueT: getRequestToLocal?.mileage?.toValueT || "",
    //     },
    //     buildDate: {
    //       fromValueT: getRequestToLocal?.buildDate?.fromValueT || "",
    //       toValueT: getRequestToLocal?.buildDate?.toValueT || "",
    //     },
    //     bodyStyle: getRequestToLocal?.bodyStyle || "",
    //     useStatus:
    //       parseValueUseStatus(getRequestToLocal?.useStatus) || "",
    //     seats: getRequestToLocal?.seats || "",
    //     exteriorColor: getRequestToLocal?.exteriorColor || "",
    //     provinceCode: getRequestToLocal?.provinceCode || "",
    //     productStatusCode: [getRequestToLocal?.productStatusCode] || "",
    //     boardId: getRequestToLocal?.boardId || "",
    //     // districtCode: ,// huyện,quận
    //     // subDistrictCode: ,// xã, phường
    //     transmission: getRequestToLocal?.transmission || "",
    //     fuelType:  getRequestToLocal?.fuelType|| "",
    //     sort: parseValueUseSort(getRequestToLocal?.sort) || "createdDate",
    //     order: parseValueOrder(getRequestToLocal?.order) || "DESC",
    //     page: getRequestToLocal?.page || "0",
    //   };
    //   return setDataRequest(newDataRequest);
    // }
    return undefined
  }, [searchParams]);

  useEffect(() => {
    if (globalDataRequest) {
      setDataRequest(globalDataRequest);
    }
  }, [globalDataRequest]);

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

  const getQueryString = (data: State, display?: string) => {
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
      "hien-thi":
        display || (searchParams && searchParams["hien-thi"]) || "GRID",
      "trang-thai-san-pham": data.productStatusCode || [],
      boardId: data.boardId || "",
      trang: data.page || "0",
    };
    const params = queryString.stringify(newData, config);
    return params;
  };

  const handleSearch = (data: State, display?: string): void => {
    setIsOpenDrawer(false);
    setDataRequest(data);
    const url = getQueryString(data, display);
    if (type === "collections" && handleSearchCollections) {
      return handleSearchCollections(data);
    }
    if (type === 'detail-collection' && handleGetDetailCollection) {
      return handleGetDetailCollection(data)
    }
    return router.push(`${pathName}?${url}`);
  };

  const handleUpdateDataRequest = (
    data: ChangeEvent<HTMLInputElement> | any,
    config: SearchField,
    specific?: "fromValueT" | "toValueT"
  ): void => {
    const newData = { ...dataRequest };
    setBookmarkActive(null); // khi thay thay đổi dữ liệu sẽ reset bookmark active
    if (config.field === "filter") {
      newData[config.field] = data.target.value || "";
      return setDataRequest(newData);
    }
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
    if (config.field === "make") {
      // reset dòng xe đã chọn khi thay đổi hãng xe
      newData.model = "";
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
    if (config.field === "sort") {
      // TIN ĐĂNG MỚI NHẤT
      if (data === "1") {
        newData.sort = "createdDate";
        newData.order = "DESC";
        handleSearch(newData);
        return setDataRequest(newData);
      }
      // giá giảm dần
      if (data === "2") {
        newData.sort = "conversionPrice";
        newData.order = "DESC";
        handleSearch(newData);
        return setDataRequest(newData);
      }
      // GIÁ TĂNG DẦN
      newData.sort = "conversionPrice";
      newData.order = "ASC";
      handleSearch(newData);
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
  // console.log('dataRequest', dataRequest);

  const isActive = (data: any, config: SearchField): boolean =>
    dataRequest[`${config.field}`] === data[config.valueField];

  const getNameActive = (config: SearchField): string => {
    if (config.field === "make") {
      const obj = makeList?.data.find(
        (item) => item.code === dataRequest[config.field]
      );
      return obj?.name || config.placeHolder;
    }
    if (config.field === "model") {
      const obj = modelList?.data.find(
        (item) =>
          item.makeCode === dataRequest.make &&
          item.code === dataRequest[config.field]
      );
      return obj?.name || config.placeHolder;
    }
    if (config.field === "conversionPrice") {
      if (
        dataRequest.conversionPrice.fromValueT === "Thỏa thuận" &&
        dataRequest.conversionPrice.toValueT === "Thỏa thuận"
      ) {
        return "Thỏa thuận";
      }
      const fromValueT = dataRequest.conversionPrice.fromValueT
        ? parseFloat(dataRequest.conversionPrice.fromValueT) * 1000000
        : 0;
      const toValueT = dataRequest.conversionPrice.toValueT
        ? parseFloat(dataRequest.conversionPrice.toValueT) * 1000000
        : 0;
      // console.log('toValueT', toValueT);
      if (fromValueT && !toValueT) {
        return `Trên ${readVietnameseCurrency(fromValueT)}`;
      }
      if (!fromValueT && toValueT) {
        return `Dưới ${readVietnameseCurrency(toValueT)}`;
      }
      return fromValueT || toValueT
        ? `${readVietnameseCurrency(fromValueT)}-${readVietnameseCurrency(
          toValueT
        )}`
        : config.placeHolder;
    }
    return "";
  };

  const renderContentHangXe = (config: SearchField): ReactElement => {
    if (isLoadingMakeList) {
      return (
        <div className="branches !flex items-center justify-center">
          <i className="fa-light fa-spinner-third fa-spin" />
        </div>
      );
    }
    return (
      <div className="branches">
        {makeList?.data.map((item: CarMake) => (
          <div
            className={`branch ${isActive(item, config) ? "branch-active" : ""
              }`}
            key={`makeList-advanced-${item.id}`}
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
            <div className="branch-name mt-2">
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDongXe = (config: SearchField): ReactElement => {
    if (!dataRequest.make || !modelList?.data?.length) {
      return <span className="ten-dong-xe">Không có dữ liệu</span>;
    }
    return (
      <div className="ds-dong-xe">
        {modelList?.data
          ?.filter((item) => item.makeCode === dataRequest.make)
          ?.map((item: CarModel) => (
            <div
              className="dong-xe"
              key={`modelList-${item.id}`}
              onClick={() => handleUpdateDataRequest(item, config)}
            >
              <div className="ten-dong-xe">
                <span>{item.name}</span>
              </div>
              <div className="chon-dong-xe">
                <Checkbox checked={dataRequest.model === item.code} />
              </div>
            </div>
          ))}
      </div>
    );
  };

  const isActiveRangePrice = (item: Price): boolean =>
    dataRequest.conversionPrice.fromValueT === item.fromValueT &&
    dataRequest.conversionPrice.toValueT === item.toValueT;

  const renderKhoangGia = (config: SearchField): ReactElement => {
    return (
      <div className="range-price-container">
        <Space.Compact size="large">
          <InputNumber
            placeholder="Từ"
            className="text-xs w-60"
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
            className="text-xs w-60"
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
        <div className="range-price-box">
          <div className="range-price-title">
            <p>Khoảng giá</p>
          </div>
          <div className="range-price-content">
            {priceList.map((item) => (
              <div
                key={`advanced-price-${item.toValueT}-${item.fromValueT}`}
                className={`range-price-item ${isActiveRangePrice(item) ? "range-price-item-active" : ""
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

  const onChangeLocation = (
    value: (string | number)[],
    selectedOptions: LocationChild[],
    config: SearchField
  ): void => {
    const data = { value, selectedOptions };
    return handleUpdateDataRequest(data, config);
  };

  // const getDistrictByProvince = (code: string): District[] => {
  //     const data = districtList?.data?.filter(item => item.provinceCode === code) || [];
  //     return data;
  // }

  // const getSubDistrictByDistrict = (code: string): SubDistrict[] => {
  //     const data = subDistrictList?.data?.filter(item => item.districtCode === code) || [];
  //     return data;
  // }

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

  const renderDiaPhuong = (config: SearchField): ReactElement => {
    return (
      <Cascader
        loading={isLoadingProvince}
        options={locations}
        value={dataRequest.provinceCode ? [dataRequest.provinceCode] : []}
        // loadData={loadDataLocation}
        onChange={(value, selectedOptions) =>
          onChangeLocation(value, selectedOptions, config)
        }
        changeOnSelect
        showSearch
        placeholder="Địa điểm"
        expandIcon={<i className="fa-sharp fa-light fa-chevron-down" />}
        inputIcon={<i className="fa-sharp fa-regular fa-magnifying-glass" />}
      />
    );
  };

  const renderContentItemSearch = (config: SearchField): ReactElement => {
    if (config.field === "make") {
      return (
        <Popover
          content={renderContentHangXe(config)}
          // title="Hãng xe"
          trigger="click"
          placement="bottom"
        >
          <div className="search-item-button">
            <div className="search-item-button-title">
              <span>
                {dataRequest[config.field]
                  ? getNameActive(config)
                  : config.placeHolder}
              </span>
              <i className="fa-sharp fa-light fa-chevron-down text-gray-500" />
            </div>
          </div>
        </Popover>
      );
    }
    if (config.field === "model") {
      return (
        <Popover
          content={renderDongXe(config)}
          // title="Dòng xe"
          trigger="click"
          placement="bottom"
        >
          <div className="search-item-button">
            <div className="search-item-button-title">
              <span>
                {dataRequest[config.field]
                  ? getNameActive(config)
                  : config.placeHolder}
              </span>
              <i className="fa-sharp fa-light fa-chevron-down text-gray-500" />
            </div>
          </div>
        </Popover>
      );
    }
    return (
      <Popover
        content={renderKhoangGia(config)}
        title="Triệu VNĐ"
        trigger="click"
        placement="bottom"
      >
        <div className="search-item-button">
          <div className="search-item-button-title">
            <span>{getNameActive(config)}</span>
            <i className="fa-sharp fa-light fa-chevron-down text-gray-500" />
          </div>
        </div>
      </Popover>
    );
  };

  const renderItemSearch = (item: SearchField): ReactElement => {
    if (item.field === "filter") {
      return (
        <div className="search-item col-span-3" key={`filter-${item.field}`}>
          <Input
            className="h-10 sm:h-12 bg-primary-100"
            placeholder="Nhập từ khóa cần tìm"
            onChange={(e) => handleUpdateDataRequest(e, item)}
            value={dataRequest.filter}
            // allowClear
            suffix={<i className="fa-sharp fa-regular fa-magnifying-glass" />}
            onPressEnter={() => handleSearch(dataRequest)}
          />
        </div>
      );
    }
    if (item.field === "provinceCode") {
      return (
        <div
          className="search-item hidden sm:hidden md:hidden xl:block"
          key={`province-${item.field}`}
        >
          <div className="search-item-button !px-0">
            <div className="search-item-button-title">
              {renderDiaPhuong(item)}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className="search-item hidden sm:hidden md:hidden xl:block"
        key={`common-advanced-${item.field}`}
      >
        {renderContentItemSearch(item)}
      </div>
    );
  };

  const handleOpenDrawer = (): void => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = (): void => {
    setIsOpenDrawer(false);
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
      dataRequest.transmission
    );
  };

  const handleOpenSaveBookmark = (data?: State): void => {
    if (!useInfo?.id) {
      return notify("Bạn cần đăng nhập để sử dụng tính năng này", "warning");
    }
    // gửi từ drawer advanced search
    if (data) {
      setDataRequest(data);
      setIsOpenDrawer(false);
      return setIsOpenSaveBookmark(true);
    }
    if (!isActiveSaveBookmark()) {
      return notify("Bạn chưa chọn giá trị", "error");
    }
    return setIsOpenSaveBookmark(true);
  };

  const handleReset = (): void => {
    setDataRequest(baseDataRequest);
  };

  const handleSaveBookmarkSuccess = (): void => {
    setIsOpenSaveBookmark(false);
    // refetchBookmark();
  };

  

  const handleSelectBookmark = (item: Bookmark): void => {
    try {
      const newDataRequest = JSON.parse(item.searchContent);
      setDataRequest({ ...newDataRequest, page: "0" });
      setBookmarkActive(item);
      return handleSearch(newDataRequest);
    } catch (error) {
      return notify("Có lỗi trong quá trình xử lý", "warning");
    }
  };

  const objSort: SearchField = {
    placeHolder: "sort",
    field: "sort",
    valueField: "sort",
    type: "SELECT",
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: false,
  };

  const sortMenu: MenuProps["items"] = [
    {
      // key: 'sap-xep=ngay-dang&thu-tu=tin-dang-moi-nhat',
      key: "1",
      label: <span>Tin đăng mới nhất</span>,
      onClick: () => handleUpdateDataRequest("1", objSort),
    },
    {
      // key: 'sap-xep=gia-ban&thu-tu=gia-thap-den-cao',
      key: "2",
      label: <span>Giá thấp đến cao</span>,
      onClick: () => handleUpdateDataRequest("2", objSort),
    },
    {
      // key: 'sap-xep=gia-ban&thu-tu=gia-cao-den-thap',
      key: "3",
      label: <span>Giá cao đến thấp</span>,
      onClick: () => handleUpdateDataRequest("3", objSort),
    },
  ];

  const getSortName = (): string => {
    if (dataRequest.sort === "createdDate" && dataRequest.order === "DESC") {
      return "Tin đăng mới nhất";
    }
    if (dataRequest.sort === "conversionPrice" && dataRequest.order === "ASC") {
      return "Giá thấp đến cao";
    }
    return "Giá cao đến thấp";
  };

  const handleUpdateDisplayType = (code: string): void => {
    setDisplayTypeActive(code);
    handleSearch(dataRequest, code);
  };

  const handleResizeWindow = (height: number): void => {
    if (height && height !== advancedSearchHeight) {
      // console.log('height resize', height);
      setAdvancedSearchHeight(height);
    }
  };

  useEffect(() => {
    if (
      ref?.current?.clientHeight &&
      ref?.current?.clientHeight !== advancedSearchHeight
    ) {
      // console.log('init page height', ref?.current?.clientHeight);
      setAdvancedSearchHeight(ref?.current?.clientHeight);
    }
  }, [ref?.current?.clientHeight]);

  return (
    <>
      <div
        style={{ paddingBottom: `${advancedSearchHeight / 2 + 15}px` }}
        className="box-image"
      >
        {type === "collections" || type === "detail-collection" ? (
          <div className="h-16" />
        ) : (
          <Image
            className=" w-full"
            src={PageHeaderImage}
            priority
            alt="Tìm kiếm , mua bán xe"
          />
        )}
      </div>
      {/* <SkeletonProduct displayType='GRID' /> */}
      <Affix offsetTop={advancedSearchHeight}>
        <div className="advanced-search-container" ref={ref}>
          <WindowResizeHandler
            targetRef={ref}
            onResize={(height) => handleResizeWindow(height)}
          />
          <div className="advanced-search-content">
            <div className="box-input-search flex items-center">
              {searchFields
                .filter((item) => item.defaultDisplay)
                .map((item) => renderItemSearch(item))}
              <div
                className={
                  type
                    ? "search-item advanced-search-action-container-collections"
                    : "search-item advanced-search-action-container"
                }
              >
                <Tooltip placement="top" title="Tìm kiếm">
                  <div
                    className="search-item-action form-search"
                    onClick={() => handleSearch(dataRequest)}
                  >
                    <i className="fa-sharp fa-regular fa-magnifying-glass" />
                  </div>
                </Tooltip>
                <Tooltip placement="top" title="Tìm kiếm nâng cao">
                  <div
                    className="search-item-action form-advanced"
                    onClick={handleOpenDrawer}
                  >
                    <i className="fa-light fa-sliders" />
                  </div>
                </Tooltip>
                {!type && (
                  <Tooltip placement="top" title="Lưu bộ lọc">
                    <div
                      className={`search-item-action save-bookmark ${isActiveSaveBookmark() ? "save-bookmark-active" : ""
                        }`}
                      onClick={() => handleOpenSaveBookmark()}
                    >
                      <i className="fa-light fa-bookmark" />
                    </div>
                  </Tooltip>
                )}

                <Tooltip placement="top" title="Đặt lại giá trị">
                  <div
                    className="search-item-action reset-form"
                    onClick={handleReset}
                  >
                    <i className="fa-light fa-rotate-right" />
                  </div>
                </Tooltip>
              </div>
            </div>
            {bookmarkList?.data?.length && !type && (
              <div className="advanced-search-hr px-4 ">
                <hr />
              </div>
            ) || ""}
            {bookmarkList?.data?.length && bookmarkList?.data?.length > 0 && !type && (
              <div className="bookmark-container">
                <div className="bookmark-label ">
                  <span>Tìm kiếm nhanh</span>
                </div>
                <div className="bookmarks">
                  {bookmarkList?.data?.map((item) => (
                    <div
                      className={`bookmark-item ${bookmarkActive?.id === item.id
                          ? "bookmark-item-active"
                          : ""
                        }`}
                      key={`bookmark-item-${item.id}`}
                      onClick={() => handleSelectBookmark(item)}
                    >
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) || ""}
            {!type && (
              <div className="car-list-select-type">
              <div className="select-type-content">
                  <i
                    className={`fa-light fa-grid-2 ${displayTypeActive === displayType.grid
                        ? "text-primary-200"
                        : ""
                      }`}
                    onClick={() => handleUpdateDisplayType(displayType.grid)}
                  />
                  <i
                    className={`fa-light fa-diagram-cells ${displayTypeActive === displayType.column
                        ? "text-primary-200"
                        : ""
                      }`}
                    onClick={() =>
                      handleUpdateDisplayType(displayType.column)
                    }
                  />
                  <i
                    className={`fa-light fa-bars ${displayTypeActive === displayType.table
                        ? "text-primary-200"
                        : ""
                      }`}
                    onClick={() => handleUpdateDisplayType(displayType.table)}
                  />
                <div className="select-sort-type flex items-center">
                  <span className="text-sm">Sắp xếp theo:</span>
                  <div className="select-sort-type-dropdown">
                    <Dropdown
                      menu={{ items: sortMenu }}
                      placement="bottom"
                      trigger={["click"]}
                    >
                      <span className="text-sm flex gap-1 text-primary-200 cursor-pointer">
                        {getSortName()}{" "}
                        <i className="fa-sharp fa-light fa-chevron-down" />
                      </span>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
            )}
            
            <DrawerAdvancedSearch
              onSearch={handleSearch}
              baseDataRequest={baseDataRequest}
              onClose={() => handleCloseDrawer()}
              onOpenBookmark={(data) => handleOpenSaveBookmark(data)}
              isOpenDrawer={isOpenDrawer}
              globalDataRequest={dataRequest}
              type={type}
            />
            {!type && (
              <SaveBookmark
                isModalOpen={isOpenSaveBookmark}
                handleOk={handleSaveBookmarkSuccess}
                handleCancel={() => setIsOpenSaveBookmark(false)}
                globalDataRequest={dataRequest}
              />
            )}
          </div>
        </div>
      </Affix>
    </>
  );
};

export default FormAdvancedSearch;