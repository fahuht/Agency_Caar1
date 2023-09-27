export interface NewsResponse<T> {
  status: number;
  data: T;
}

export type NewsItem = {
  id: string;
  createdDate: string;
  modifiedDate: string;
  createdUser: string;
  modifiedUser: string;
  isDeleted: boolean;
  categoryId: string;
  categoryName: string;
  categoryCode: string;
  title: string;
  content: string;
  imageId: null;
  attachmentId: null;
  resourceCode: null;
  resourceName: null;
  resourceUrl: null;
  postDate: null;
  status: string;
  level: null;
  posterId: null;
  posterName: null;
  approverId: null;
  approverName: null;
  countViews: null;
  newsTagDtos: [];
  newsMetaKeywordDtos: [];
  shortDescription: null;
  slug: string;
};
