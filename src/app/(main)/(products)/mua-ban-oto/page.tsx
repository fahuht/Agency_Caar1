// import Loading from "./loading"; ``
import { Metadata } from "next";
import { cookies } from 'next/headers'
import { Suspense } from "react";

import { PagingListResponse } from "@/types/global";
import { FieldCarColumn, FieldCarGrid, FieldCarTable } from "@/utils/constants";

import CarList from "./components/CarsList"
import PaginationPage from "./components/Pagination";
import SkeletonProduct from "./components/SkeletonProduct";
import PageHeader from "./PageHeader"
import { Car, DisplayCarType, SearchParams } from "./type";

interface Props {
  searchParams: SearchParams,
}


// const a = {
//   id: 'b6fd3d1a-e5ea-401d-97be-bcc07722430e',
//   title: 'Mazda 6 2.0L Luxury 2020',
//   description: '🔥 Mazda 6 2.0 Cuối 2020 đi 23.000km ✅ Biển Tp đỡ tốn 20tr tiền biển . ✅ Xe sơn zin 99% cực kì đẹp ✅ Nội ngoại thất như mới . ✅ Bảo dưỡng full lịch sử hãng ✅ Option : Cam hành trình - dán phim - gập gương lên xuống kính - nẹp chống trầy - Bh 2 chiều … ✅ Bao check hãng toàn quốc . 🔥 Giá cực tốt : 639.000.000',
//   price: '639 triệu',
//   conversionPrice: 639,
//   priceUnit: 'triệu',
//   conversionPriceUnit: 'triệu',
//   location: 'KDC Lê Thành , 55 Đường Số 1 Phường An Lạc Quận Bình Tân Tp, Hồ Chí Minh',
//   exteriorColor: null,
//   interiorColor: null,
//   drivetrain: null
//   engine: null,
//   mileage: '639',
//   transmission: 'Số tự động',
//   transmissionCode: 'TRANS0002',
//   fuelType: 'FUEL0004',
//   bodyStyle: null,
//   bodyStyleCode: null,
//   model: null,
//   make: null,
//   useStatus: '0',
//   buildDate: '2020',
//   doors: null,
//   origin: 'Nhập khẩu',
//   seats: null,
//   contactName: 'Sài Gòn Used Car',
//   contactPhone: '0932749777',
//   profileName: null,
//   profileLink: 'https://saigonusedcar.oto.com.vn',
//   detailLink: 'https://oto.com.vn/mua-ban-xe-mazda-6-hcm/son-zin-ca-xe-cuc-ki-dep-aidxc22868915',
//   domain: 'OTO.COM.VN',
//   site: null,
//   dayId: 20230808,
//   prdNumber: '35117',
//   postDate: null,
//   contactAddress: null,
//   createdDate: '2023-08-08T16:23:00.326843',
//   modifiedDate: '2023-08-08T16:23:00.326843',
//   expiredDate: null,
//   imageUrl: 'https://img1.oto.com.vn/2023/08/02/20230802155238-de0b_wm.jpeg',
//   slug: 'ho-chi-minh/mazda-6-20l-luxury-2020-0932749777-id=b6fd3d1a-e5ea-401d-97be-bcc07722430e',
//   fullTextSearch: null,
//   districtCode: null,
//   provinceCode: '79',
//   subDistrictCode: null,
//   provinceName: 'Hồ Chí Minh',
//   districtName: null,
//   subDistrictName: null,
//   isLove: false,
//   urlImages: [Array]
// }

const parseValueUseStatus = (data: string): string => {
  if (data === 'moi') {
    return '0';
  }
  if (data === 'da-qua-su-dung') {
    return '1';
  }
  // đã qua sử dụng
  return '';
}

const parseValueUseSort = (data: string): string => {
  if (data === 'tin-dang-moi-nhat') {
    return 'createdDate';
  }
  return 'conversionPrice'
}

const parseValueOrder = (data: string): string => {
  if (data === 'tin-dang-moi-nhat') {
    return 'DESC';
  }
  if (data === 'gia-giam-dan') {
    return 'DESC';
  }
  if (data === 'gia-cao-den-thap') {
    return 'DESC';
  }
  return 'ASC'
}

const  parseValueBodyStyle = (data: string): string => {
  if(data === 'MPV'){
    return "BODY0007"
  }
  if(data === 'SUV/CUV'){
    return "BODY0002"
  }
  if(data === 'Sedan'){
    return "BODY0001"
  }
  if(data === 'Pickup'){
    return "BODY0006"
  }
  if(data === 'Couple'){
    return "BODY0004"
  }
  if(data === 'Hatchback'){
    return "BODY0005"
  }
  return ""
}

// lấy ra key cần trong object (nhận vào object và mảng key cần lấy)
function extractKeys<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): Partial<T> {
  const extractedObj: Partial<T> = {};
  keys.forEach(key => {
    if (key in obj) {
      extractedObj[key] = obj[key];
    }
  });
  return extractedObj;
}

const getCars = async (searchParams: SearchParams): Promise<PagingListResponse<Car> | Error> => {
  const data = {
    "filter": searchParams["tu-khoa"] || "",
    "make": searchParams["hang-xe"] || "",
    "model": searchParams["dong-xe"] || "",
    "conversionPrice": {
      "fromValueT": searchParams["gia-ban-tu"] || "",
      "toValueT": searchParams["gia-ban-den"] || ""
    },
    "mileage": {
      "fromValueT": searchParams["km-da-di-tu"] || "",
      "toValueT": searchParams["km-da-di-den"] || ""
    },
    "buildDate": {
      "fromValueT": searchParams["nam-san-xuat-tu"] || "",
      "toValueT": searchParams["nam-san-xuat-den"] || "",
    },
    "bodyStyle": parseValueBodyStyle(searchParams["dang-xe"]) || "",
    "useStatus": parseValueUseStatus(searchParams['trang-thai-su-dung']),
    "seats": searchParams["ghe-ngoi"] || "",
    "exteriorColor": searchParams["mau-xe"] || "",
    "provinceCode": searchParams["dia-diem"] || "",
    "fuelType": searchParams["nhien-lieu"] || "",
    "transmission": searchParams["loai-hop-so"] || "",
    // "transmission": searchParams["loai-dong-co"] || "",
  };
  // console.log('dataRequest', data);
  // console.log('searchParams', searchParams);
  const sortField = parseValueUseSort(searchParams['sap-xep-theo'] || 'tin-dang-moi-nhat');
  const orderDirection = parseValueOrder(searchParams['sap-xep-theo'] || 'tin-dang-moi-nhat');
  const isMultipleImages = searchParams['hien-thi'] && searchParams['hien-thi'] === 'TABLE';
  const page = parseInt(searchParams.trang || "1", 10);
  const pageQuery = (Number.isNaN(page) || !page) ? "0" : page - 1;
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/product-service/api/v1/product-car/search?sort=${sortField}&order=${orderDirection}&page=${pageQuery}${isMultipleImages ? '&hasMultipleImage=true' : ''}`;
  // console.log('====================================');
  // console.log('searchParams', searchParams);
  // console.log('====================================');
  const cookieStore = cookies()
  const accessToken = cookieStore.get('ACCESS_TOKEN')

  let headersCfg = {}

  if (accessToken?.value) {
    headersCfg = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken.value}`
    }
  } else headersCfg = {
    'Content-Type': 'application/json',
  }
  const carList = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: headersCfg,
     cache: 'no-store'
  }).then(res => res.json()).catch();
  // console.log('====================================');
  // console.log('carList', carList);
  // console.log('====================================');

  // lọc response trả về dạng grid
  if(searchParams['hien-thi'] === 'GRID' || searchParams['hien-thi'] === undefined){
    const carsListGrid = carList?.data?.map((obj: Car) => extractKeys(obj, FieldCarGrid)) || [];
    const responseCarListGrid = {
      ...carList,
      data: carsListGrid
    }
    return responseCarListGrid as PagingListResponse<Car>
  }

  // lọc response trả về dạng column
  if(searchParams['hien-thi'] === 'COLUMN'){
    const carsListColumn = carList?.data?.map((obj: Car) => extractKeys(obj, FieldCarColumn)) || [];
    const responseCarListColumn = {
      ...carList,
      data: carsListColumn
    }
    return responseCarListColumn as PagingListResponse<Car>
  }

  // lọc response trả về dạng table
  if(searchParams['hien-thi'] === 'TABLE'){
    const carsListTable = carList?.data?.map((obj: Car) => extractKeys(obj, FieldCarTable)) || [];
    const responseCarListTable = {
      ...carList,
      data: carsListTable
    }
    return responseCarListTable as PagingListResponse<Car>
  }
  return carList as PagingListResponse<Car>;
}

export const generateMetadata = (): Metadata => {
  return {
    title: 'Tìm kiếm xe',
    description: 'Tìm kiếm xe'
  }
}

// const wait = async (ms) => {
//   await new Promise((rs,rj) => {
//     setTimeout(() => {
//       rs('');
//     }, ms);
//   })
// }

// export const ServerWork = async ({ searchParams }: Props) => {
//   const carList = await getCars(searchParams) as PagingListResponse<Car>;
//   // await wait(5000);
//   // console.log('====================================');
//   // console.log('carList', carList);
//   // console.log('====================================');
//   return (
//     <>
//       <CarList cars={carList?.data || []} displayType={searchParams['hien-thi'] as DisplayCarType || 'GRID'} />
//       {carList?.data?.length > 0 && <PaginationPage paginations={carList?.paginations} />}
//     </>
//   )
// }


export default async function MuaBanOTo({ searchParams }: Props) {
  const carList = await getCars(searchParams) as PagingListResponse<Car>;
  return (
    <div className="mua-ban-oto">
      <PageHeader searchParams={searchParams} displayTypeFromServer={searchParams['hien-thi'] || 'GRID'} />
      <Suspense fallback={<SkeletonProduct displayType={searchParams['hien-thi'] || 'GRID'} />}>
        {/* <ServerWork searchParams={searchParams} /> */}
        <>
          <CarList cars={carList?.data || []} displayType={searchParams['hien-thi'] as DisplayCarType || 'GRID'} />
          {carList?.data?.length > 0 && <PaginationPage paginations={carList?.paginations} />}
        </>
      </Suspense>
    </div>
  )
};
