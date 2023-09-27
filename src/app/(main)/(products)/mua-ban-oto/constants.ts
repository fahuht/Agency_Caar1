import * as Image from './images';
import { CommonSelect, Price, SearchField, TableDisplayField } from './type';
// fields tìm kiếm chung
export const searchFields:SearchField[] = [
  {
    placeHolder: 'Tìm kiếm theo hãng xe, dòng xe...',
    field: 'filter',
    valueField: 'filter',
    type: 'INPUT',
    defaultDisplay: true,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Năm sản xuất',
    field: 'buildDate',
    valueField: 'buildDate',
    type: 'FROM_TO',
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Loại xe',
    field: 'transmission',
    valueField: 'value',
    type: 'SELECT',
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: true,
  },
    {
    placeHolder: 'Mức giá',
    field: 'conversionPrice',
    valueField: 'value',
    type: 'FROM_TO',
    defaultDisplay: true,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Hãng xe',
    field: 'make',
    valueField: 'code',
    type: 'SELECT',
    defaultDisplay: true,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Dòng xe',
    field: 'model',
    valueField: 'code',
    type: 'SELECT',
    defaultDisplay: true,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Kiểu dáng',
    field: 'bodyStyle',
    valueField: 'value',
    type: 'SELECT',
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Địa điểm',
    field: 'provinceCode',
    valueField: 'value',
    type: 'SELECT',
    defaultDisplay: true,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Quận/Huyện',
    field: 'districtCode',
    valueField: 'value',
    type: 'SELECT',
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: false,
  },
  {
    placeHolder: 'Phường/Xã',
    field: 'subDistrictCode',
    valueField: 'value',
    type: 'SELECT',
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: false,
  },
  {
    placeHolder: 'Tình trạng',
    field: 'useStatus',
    valueField: 'value',
    type: 'SELECT',
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Số chỗ ngồi',
    field: 'seats',
    valueField: 'value',
    type: 'SELECT',
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Nhiên liệu',
    field: 'fuelType',
    valueField: 'value',
    type: 'SELECT',
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Số KM đã đi',
    field: 'mileage',
    valueField: 'mileage',
    type: 'FROM_TO',
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: true,
  },
  {
    placeHolder: 'Màu xe',
    field: 'exteriorColor',
    valueField: 'code',
    type: 'SELECT',
    defaultDisplay: false,
    multiple: false,
    showInAdvanced: true,
  },
];

// mức giá
export const priceList: Price[] = [
  {
    value: 'Dưới 300 triệu',
    label: 'Dưới 300 triệu',
    fromValueT: '0',
    toValueT: '300',
  },
  {
    value: '300 triệu - 500 triệu',
    label: '300 triệu - 500 triệu',
    fromValueT: '300',
    toValueT: '500',
  },
  {
    value: '500 triệu - 700 triệu',
    label: '500 triệu - 700 triệu',
    fromValueT: '500',
    toValueT: '700',
  },
  {
    value: '700 triệu - 1 tỷ',
    label: '700 triệu - 1 tỷ',
    fromValueT: '700',
    toValueT: '1000',
  },
  {
    value: '1 - 2 tỷ',
    label: '1 - 2 tỷ',
    fromValueT: '1000',
    toValueT: '2000',
  },
  {
    value: '2 - 3 tỷ',
    label: '2 - 3 tỷ',
    fromValueT: '2000',
    toValueT: '3000',
  },
  {
    value: '3 - 4 tỷ',
    label: '3 - 4 tỷ',
    fromValueT: '3000',
    toValueT: '4000',
  },
  {
    value: '4 - 5 tỷ',
    label: '4 - 5 tỷ',
    fromValueT: '4000',
    toValueT: '5000',
  },
  {
    value: '5 - 7 tỷ',
    label: '5 - 7 tỷ',
    fromValueT: '5000',
    toValueT: '7000',
  },
  {
    value: '7 - 10 tỷ',
    label: '7 - 10 tỷ',
    fromValueT: '7000',
    toValueT: '10000',
  },
  {
    value: 'Trên 10 tỷ',
    label: 'Trên 10 tỷ',
    fromValueT: '10000',
    toValueT: '',
  },
  {
    value: 'Thỏa thuận',
    label: 'Thỏa thuận',
    fromValueT: 'Thỏa thuận',
    toValueT: 'Thỏa thuận',
  },
];

// loại xe
export const transmissionTypes: CommonSelect[] = [
  {
    label: 'Số sàn',
    value: 'TRANS0001'
  },
  {
    label: 'Số tự động',
    value: 'TRANS0002',
  },
  {
    label: 'Bán tự động',
    value: 'TRANS0003',
  },
  {
    label: 'Số hỗn hợp',
    value: 'TRANS0004',
  },
];

// loại nhiên liệu
export const fuelType: CommonSelect[] = [
  {
    label: 'Xăng',
    value: 'FUEL0001'
  },
  {
    label: 'Dầu',
    value: 'FUEL0002',
  },
  {
    label: 'Điện',
    value: 'FUEL0003',
  },
  {
    label: 'Hybrid',
    value: 'FUEL0004',
  },
];

export const bodyTypes: CommonSelect[] = [
  {
    label: 'MPV',
    value: 'MPV',
    image: Image.mpv
  },
  {
    value: 'SUV/CUV',
    label: 'SUV/CUV',
    image: Image.suv
  },
  // {
  //   value: 'BODY0002',
  //   label: 'CUV',
  //   image: Image.cuv
  // },
  {
    value: 'Sedan',
    label: 'Sedan',
    image: Image.sedan
  },
  {
    value: 'Pickup',
    label: 'Pickup',
    image: Image.pickup
  },
  {
    value: 'Couple',
    label: 'Couple',
    image: Image.couple
  },
  {
    value: 'Hatchback',
    label: 'Hatchback',
    image: Image.hatchback
  },
];


export const useStatus: CommonSelect[] = [
  {
    label: 'Mới',
    value: '0'
  },
  {
    label: 'Đã qua sử dụng',
    value: '1',
  },
  // {
  //   label: 'Ít sử dụng',
  //   value: '2',
  // },
];

export const seats: CommonSelect[] = [
  {
    label: '2',
    value: '2'
  },
  {
    value: '4',
    label: '4',
  },  
  {
    value: '5',
    label: '5',
  },
  {
    value: '7',
    label: '7',
  },
  {
    value: '9',
    label: '9',
  },
  {
    value: '12',
    label: '12',
  },
  {
    value: '15',
    label: '15',
  },
];

export const colors: CommonSelect[] = [
  {
    label: 'Đen',
    value: 'black'
  },
  {
    label: 'Đỏ',
    value: 'red'
  },
  {
    label: 'Trắng',
    value: 'white'
  },
  {
    label: 'Xám',
    value: 'gray',
  }
];

export const displayType = {
  grid: 'GRID',
  column: 'COLUMN',
  table: 'TABLE'
}


export const tableDisplayField: TableDisplayField[] =  [
  {
    label: '',
    value: 'action',
    className: 'text-center flex items-center justify-center',
    width: 100,
  },
  {
    label: 'Tên xe',
    value: 'title',
    className: 'text-left',
    width: 250,
  },
  {
    label: 'Giá',
    value: 'price',
    className: 'tex-left whitespace-nowrap',
    width: 120,
  },
  {
    label: 'Hãng',
    value: 'make',
    className: 'text-left',
    width: 120,
  },
  {
    label: 'Dòng',
    value: 'model',
    className: 'text-left',
    width: 120,
  },
  {
    label: 'Dáng',
    value: 'bodyStyle',
    className: 'text-left',
    width: 120,
  },
  {
    label: 'Hộp số',
    value: 'transmission',
    className: 'text-left',
    width: 120,
  },
  {
    label: 'Đã đi',
    value: 'mileage',
    className: 'text-left',
    width: 120,
  },
  {
    label: 'Đời',
    value: 'buildDate',
    className: 'text-left',
    width: 120,
  },
  {
    label: 'Ảnh',
    value: 'urlImages',
    className: 'text-right',
    width: 260,
  },
]
