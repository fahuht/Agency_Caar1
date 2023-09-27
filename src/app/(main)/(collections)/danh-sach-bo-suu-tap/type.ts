export interface SearchParams{
  "tu-khoa": string;
  "hang-xe": string; //hãng xe
  "dong-xe": string; //dòng xe List<String>
  "gia-ban-tu": string; //giá xe
  "gia-ban-den": string; //giá xe
  "km-da-di-tu": string; //số km
  "km-da-di-den": string; //số km
  "nam-san-xuat-tu": string;
  "nam-san-xuat-den": string;
  "dang-xe": string; //kiểu dáng
  "trang-thai-su-dung": string; //trạng thái sử dung List<String>
  "trang-thai-san-pham": string;
  "ghe-ngoi": string; //số chỗ List<Integer>
  "mau-xe": string; //màu
  "dia-diem": string; //tỉnh, thành phố
  "loai-hop-so"?: string; // 0 - số sàn , 1 - số tự động
  "loai-dong-co": string;
  "sap-xep-theo": string;
  "hien-thi"?: string;
  "boardId": string;
  "nhien-lieu":string;
  trang?: string;

}
// eslint-disable-next-line @typescript-eslint/naming-convention
export type itemStatusCollections = {
  code:string,
  name:string
}
export interface ListStatusCollectionResponse<T> {
  status: number;
  data: {
    data:T[]
  };
}
export interface ResponseDataStatusCollections {
  code: string;
  fromValue: null;
  id: string;
  level: number;
  name: string;
  parentCategoryId: null;
  priorityOrder: number;
  toValue: null;
  type: string;
  value: string;
  valueMethod: null;
  valueType: string;
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
  "productStatusCode":[],
  "boardId":string
}
export interface ListCollectionResponse<T> {
  status: number;
  data: T[];
}
export interface Collection<T> {
  boardId: string;
  boardName: string;
  createdDateBoard: string;
  numberOfProduct: number;
  products: T[];
}

export type DataForm = {
  name: string;
};


export const displayType = {
  grid: 'GRID',
  column: 'COLUMN',
}


export type DisplayCollectionType = "GRID" | "ROW";

