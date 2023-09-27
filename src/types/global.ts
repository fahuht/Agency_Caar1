export type CollectionData = {
  id: string;
  title: string;
};

export type FeaturedProduct = {
  id: string;
  title: string;
  handle: string;
  thumbnail?: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export interface Province {
  provinceCode: string;
  provinceName: string;
}

export interface District {
  districtCode: string;
  districtName: string;
  provinceCode: string;
}

export interface SubDistrict {
  subDistrictCode: string;
  subDistrictName: string;
  districtCode: string;
}

// Hãng xe
export interface CarMake {
  id: string;
  type: string;
  code: string;
  name: string;
  value: string;
  valueType: string;
  level: number;
  parentCarId?: string;
  priorityOrder: number;
  urlCarMaKe: string;
}

// dòng xe
export interface CarModel {
  id: string;
  type: string;
  code: string;
  name: string;
  value: string;
  valueType: string;
  level: number;
  parentCarId?: string;
  priorityOrder: number;
  urlCarMaKe: string;
  makeCode: string;
}

export interface ExteriorColor {
  id: string;
  type: string;
  code: string;
  name: string;
  value: string;
  valueType: string;
  valueMethod: string | null;
  fromValue: string | null;
  toValue: string | null;
  level: number;
  parentCategoryId: string | null;
  priorityOrder: number;
}

export interface Bookmark {
  id: string;
  isDeleted: boolean;
  createdDate: string;
  modifiedDate: string;
  createdUser: string;
  modifiedUser: string;
  userId: string;
  name: string;
  searchContent: string;
}

export type Location = Province & District & SubDistrict;
export type CommonList = Province &
  District &
  SubDistrict &
  CarMake &
  CarModel &
  ExteriorColor &
  Bookmark;

export type ApiResponseStatus = 0 | 1; // 0 : lỗi, 1: Success

// export interface BaseListResponse<T> {
//     data: T[],
//     status: ApiResponseStatus
// }

export interface ApiListResponse<T> {
  data: T[];
  status: ApiResponseStatus;
}

export interface PagingListResponse<T> {
  data: T[];
  status: ApiResponseStatus;
  paginations: {
    number: number;
    size: number;
    numberOfElements: number;
    hasContent: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
  };
}

export type Paginations = Omit<PagingListResponse<{}>, 'data' | 'status'>

export interface ApiStatusRespone {
    status: ApiResponseStatus
}


export interface ErrorResponse {
  errorCode: string;
  errorMsg: string;
  status: ApiResponseStatus;
}
export interface UserInfo {
  biometricRegister: string;
  birthday: string;
  createdDate: string;
  createdUser: string;
  displayName: string;
  email: string;
  id: string;
  isBiometricLogin: boolean;
  modifiedDate: string;
  modifiedUser: string;
  phoneNumber: string;
  roleCode: string[];
  status: 1;
  statusUser: string;
  stepActive: string;
  userType: string;
  username: string;
  verifiedEmail: boolean;
}

export interface PostRequestResponse<T> {
  data: T;
  status: ApiResponseStatus;
}

export type Product = {
    id?: string;
    productId?:string;
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
    isLove: boolean
    urlImages: string[]; //list tring url ảnh
    prdNumber: string; // mã tin
};

export type GetListStatusRequest = {
  types: string[];
};

export type GetListStatusResponse = {
  status: 1;
  data: {
    PRODUCT_PERSONAL_STATUS: [];
  };
};

export type ItemStatus = {
  id: string;
  type: string;
  code: string;
  name: string;
  value: string;
  valueType: string;
  valueMethod: null;
  fromValue: null;
  toValue: null;
  level: number;
  parentCategoryId: null;
  priorityOrder: number;
};
export type Logout =
  | {
      errorCode: string;
      errorMsg: string;
      status: number;
    }
  | undefined;
