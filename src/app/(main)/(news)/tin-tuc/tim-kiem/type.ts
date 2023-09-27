// eslint-disable-next-line @typescript-eslint/naming-convention
export type paginations = {
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
export type ParamsUrl = {
  type: string|"";
  page: string|"";
  keyword: string | '';
};

export interface TopNews {
    id: string;
    categoryName: string;
    categoryCode: string;
    title: string;
    countViews: string;
    slug: string;
};
