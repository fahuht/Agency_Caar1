import { StaticImageData } from "next/image";

import { ApiResponseStatus, CarMake, CarModel } from "@/types/global";

// item trong location
export interface LocationChild {
    value?: string | number | null;
    label: React.ReactNode;
    children?: LocationChild[];
    isLeaf?: boolean;
    type: string
}

export type  TableDisplayField = {
    label: string,
    value: string,
    className: string,
    width?: number
  }

export type DisplayCarType = 'GRID' | 'TABLE' | 'COLUMN';

// tình trạng xe
export type TransmissionType = '0' | '1' | '';

// data search
export interface State {
    "filter": string,
    "sort": string,
    "order": string,
    "page": string,
    "make": string,//hãng xe
    "model": string,//dòng xe List<String>
    "conversionPrice": { // mức giá
        "fromValueT": string,
        "toValueT": string
    },//giá xe
    "mileage": { // số km đã đi
        "fromValueT": string,
        "toValueT": string
    },//số km
    "buildDate": { // năm sản xuất
        "fromValueT": string,
        "toValueT": string
    },
    "bodyStyle": string,//kiểu dáng
    "useStatus": string,//trạng thái sử dung List<String>
    "seats": string,//số chỗ List<Integer>
    "exteriorColor": string,//màu
    "provinceCode": string,//tỉnh, thành phố
    "districtCode": string,//huyện,quận
    "subDistrictCode": string,//xã, phường
    "transmission"?: string, // 0 - số sàn , 1 - số tự động
    "fuelType": string,// loại nhiên liệu
    "productStatusCode"?:string[],
    "boardId"?:string,

}

export interface StateCollections {
  "filter": string,
  "sort": string,
  "order": string,
  "page": string,
  "make": string,//hãng xe
  "model": string,//dòng xe List<String>
  "conversionPrice": { // mức giá
      "fromValueT": string,
      "toValueT": string
  },//giá xe
  "mileage": { // số km đã đi
      "fromValueT": string,
      "toValueT": string
  },//số km
  "buildDate": { // năm sản xuất
      "fromValueT": string,
      "toValueT": string
  },
  "bodyStyle": string,//kiểu dáng
  "useStatus": string,//trạng thái sử dung List<String>
  "seats": string,//số chỗ List<Integer>
  "exteriorColor": string,//màu
  "provinceCode": string,//tỉnh, thành phố
  "districtCode": string,//huyện,quận
  "subDistrictCode": string//xã, phường
  "transmission"?: string // 0 - số sàn , 1 - số tự động
  "fuelType": string // loại nhiên liệu
  "productStatusCode":[],
  "boardId"?:string
}

export interface SearchParams {
    "tu-khoa": string,
    "hang-xe": string,//hãng xe
    "dong-xe": string,//dòng xe List<String>
    "gia-ban-tu": string,//giá xe
    "gia-ban-den": string,//giá xe
    "km-da-di-tu": string,//số km
    "km-da-di-den": string,//số km
    "nam-san-xuat-tu": string,
    "nam-san-xuat-den": string,
    "dang-xe": string,//kiểu dáng
    "trang-thai-su-dung": string,//trạng thái sử dung List<String>
    "trang-thai-san-pham":string,
    "ghe-ngoi": string,//số chỗ List<Integer>
    "mau-xe": string,//màu
    "dia-diem": string,//tỉnh, thành phố
    "loai-hop-so"?: string, // 0 - số sàn , 1 - số tự động
    "loai-dong-co": string,
    "nhien-lieu": string,
    "sap-xep-theo": string,
    "hien-thi"?: string,
    "trang"?:string,
    "productStatusCode"?:string,
    "boardId"?:string,
}

// các loại input nhập giá trị
export type SearchFieldType = 'INPUT' | 'SELECT' | 'FROM_TO';
export type OrderType = 'DESC' | 'ASC';
export type SortType = 'createdDate' | 'conversionPrice';

// các trường bên trong dataRequest
export type FieldType = 'filter' |
    'make' |
    'model' |
    'transmission' |
    'conversionPrice' |
    'provinceCode' |
    'districtCode' |
    'subDistrictCode' |
    'bodyStyle' |
    'useStatus' |
    'seats' |
    'mileage' |
    'buildDate' |
    'exteriorColor'|
    'sort'|
    'order' |
    "page"  |
    "fuelType" ;

// các trường giá trị từ api trả ra
export type ValueField = 'valueField' | 'code' | 'value';

// các trường trong dataRequest có thể chọn nhiều giá trị
// export type MultipleValueField = 'model' | 'useStatus' | 'seats' | 'exteriorColor';

export type RangeField = 'mileage' | 'buildDate' | 'conversionPrice';

// các trường chọn 1 giá trị
export type SingleValueField = 'filter' | 'make' | 'transmission' | 'provinceCode' | 'districtCode' | 'subDistrictCode' | 'bodyStyle' | 'model' | 'useStatus' | 'seats' | 'exteriorColor';

export type TableField = 'title' | 'price' | 'make' | 'model' | 'bodyStyle' | 'transmission' | 'mileage' | 'buildDate';
// các trường bên trong cấu hình các điều kiện tìm kiếm
export interface SearchField {
    placeHolder: string,
    field: FieldType,
    valueField: string,
    type: SearchFieldType,
    defaultDisplay: boolean,
    multiple: boolean,
    showInAdvanced: boolean
}

// giá trị khi chọn locations và gửi vào handleUpdateDataRequest
export interface ValueLocation {
    value: String[] | undefined,
    selectedOptions: LocationChild[]
}

export interface CommonSelect {
    label: string,
    value: string,
    image?: StaticImageData;
}

//
export type DataUpdate = CarMake | CarModel | string | Price | ValueLocation;

// các item bên trong price list
export interface Price {
    value: string,
    label: string,
    fromValueT: string,
    toValueT: string,
}

export interface SaveBookmarkRequest {
    name: string,
    searchContent: string,
}

export interface SaveBookmarkResponse {
    status: ApiResponseStatus,
    id: string,
}

export interface Car {
    id?: string,
    productId?:string
    title: string,
    description: string
    price: string,
    conversionPrice: number,
    priceUnit: string,
    conversionPriceUnit: string,
    location: string,
    exteriorColor?: string | null,
    interiorColor?: string | null,
    drivetrain: string | null,
    engine: string | null,
    mileage: string,
    transmission: string,
    transmissionCode: string,
    fuelType: string,
    bodyStyle: string,
    bodyStyleCode: string,
    model: string,
    make: string,
    useStatus: string,
    buildDate: string,
    doors: string | null,
    origin: string | null,
    seats: string | null,
    contactName: string | null,
    contactPhone: string | null,
    profileName: string | null,
    profileLink: string | null,
    detailLink: string | null,
    domain: string | null,
    site: string | null,
    dayId: number | null,
    prdNumber: string | null,
    postDate: string | null,
    contactAddress: string | null,
    createdDate: string | null,
    modifiedDate: string | null,
    expiredDate: string | null,
    imageUrl: string,
    slug: string,
    fullTextSearch: string,
    districtCode: string | null,
    provinceCode: string | null,
    subDistrictCode: string | null,
    provinceName: string | null,
    districtName: string | null,
    subDistrictName: string | null,
    isLove: boolean,
    urlImages: string[]
}

// bộ sưu tập
export type BaseRequestGetCollection = {
    filter: string
    name: string
  }

export type GetCollectionRequest = {
    filter: string,
    name: string
  }
  export type GetCollectionResponse<T> = {
    status: number,
    data: T[]
    paginations: {
      number: number,
      size: number,
      numberOfElements: number,
      hasContent: boolean,
      hasNext: boolean,
      hasPrevious: boolean,
      totalPages: number,
      totalElements: number,
      last: boolean,
      first: boolean
    }
  }

  export type ItemCollection<T> = {
    id: string,
    isDeleted: boolean,
    createdDate: string,
    modifiedDate: string,
    createdUser: string,
    modifiedUser: string,
    name: string,
    userId: string,
    numberOfProduct: number,
    products: T[]
  }

  export type Product = {
      id: string;
      title: string; //tiêu đề
      description: string; //mô tả
      price: string; //giá
      conversionPrice: number; //giá chuyển đổi
      priceUnit: string; //đơn vị tiền
      conversionPriceUnit: string; //đơn vị tiền chuyển đổi
      location: string; // vị trí
      exteriorColor: string; //màu ngoại thất
      interiorColor: string; //màu nội thất
      drivetrain: string; //hệ thống dẫn lực
      engine: string; //động cơ
      mileage: string; //số km
      transmission: string; //hộp số
      fuelType: string; //loại nhiên liệu
      bodyStyle: string; //kiểu dáng
      model: string; //dòng xe
      make: string; //hãng xe
      useStatus: string; //trạng thái sử dụng
      buildDate: string; //đời xe
      doors: number;
      origin: string; //Nguồn gốc
      seats: number; //số chỗ ngồi
      contactName: string; //tên liên hệ
      contactPhone: string; //số liên hệ
      profileName: string; //tên hồ sơ
      profileLink: string | null; //link hồ sơ
      detailLink: string; //chi tiết link
      domain: string; //trang web
      site: string; //trang web
      dayId: number;
      postDate: string; //ngày đăng
      contactAddress: string; //địa chỉ liên hệ
      createdDate: string;
      modifiedDate: string;
      expiredDate: string; //ngày hết hạn
      imageUrl: string; //link ảnh
      slug: string;
      fullTextSearch: string;
      districtCode: string | null;
      provinceCode: string;
      subDistrictCode: string | null;
      provinceName: string | null;
      districtName: string | null;
      subDistrictName: string | null;
      urlImages: string[]; //list tring url ảnh
      prdNumber: string; // mã tin
  };

  export type CreateCollectionRequest = {
    name: string
  }

  export type CreateCollectionResponse = {
    status: number,
    id: string,
    errorCode: string
    errorMsg: string
  }

  export type CheckProductInCollectionRequest = {
    productId: string | undefined
  }

  export type CheckProductInCollectionResponse = {
    data: {
      boardIds: string[]
      productId: string
      productStatus: string
      productStatusCode: string
      status: number
    }
    status: number
  }

  export type AddProductRequest = {
    boardId: string,
    productId: string | undefined
  }

  export type AddProductResponse = {
    status: number,
    id: string
    errorCode: string
    errorMsg: string
  }

  export type RemoveProductRequest = {
    boardId: string,
    productId: string | undefined
  }

  export type RemoveProductResponse = {
    status: number,
    id: string
    errorCode: string
    errorMsg: string
  }

export type CheckSavedResponse = {
    status: number,
    data: {
        isSaved: boolean
    }
}

export type DataFormRedirectRegister = {
  email: string,
  phoneNumber:string
}
