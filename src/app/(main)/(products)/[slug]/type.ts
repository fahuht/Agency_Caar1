export type DetailProduct = {
  status: number;
  data: {
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
    provinceCode: string | null;
    subDistrictCode: string | null;
    provinceName: string | null;
    districtName: string | null;
    subDistrictName: string | null;
    urlImages: string[]; //list tring url ảnh
    prdNumber: string; // mã tin
  };
};

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
  transmissionCode: string,
  fuelType: string; //loại nhiên liệu
  bodyStyle: string; //kiểu dáng
  bodyStyleCode: string
  model: string; //dòng xe
  make: string; //hãng xe
  useStatus: string; //trạng thái sử dụng
  buildDate: string; //đời xe
  doors: string;
  origin: string; //Nguồn gốc
  seats: string; //số chỗ ngồi
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
  isLove: boolean
};

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

export type CreateCollectionRequest = {
  name: string
}

export type CreateCollectionResponse = {
  status: number,
  id: string
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

export type GetListStatusRequest = {
  types: string[]
}

export type GetListStatusResponse = {
  status: 1,
  data: {
    PRODUCT_PERSONAL_STATUS: []
  }
}

export type ItemStatus = {
  id: string,
  type: string,
  code: string,
  name: string,
  value: string,
  valueType: string,
  valueMethod: null,
  fromValue: null,
  toValue: null,
  level: number,
  parentCategoryId: null,
  priorityOrder: number
}

export type UpdateStatusRequest = {
  productId: string | undefined,
  productStatusCode: string,
  productCode: string,
  productStatus: string
}

export type UpdateStatusResponse = {
  status: number,
  id: string
  errorMsg: string
}

export type GetMoreProductRequest = {
  provinceCode: string,
  size: number
  page: number
}