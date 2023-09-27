export interface DocumentCar {
  id: string;
  type: string;
  code: string;
  name: string;
  value: string;
  valueType: string;
  valueMethod: string;
  fromValue: number;
  toValue: number;
  level: number;
  parentCategoryId: number;
  priorityOrder: number;
  listDocument:FileDocument[]
}
export type RequestGetDocument = {
  fileName: string;
  type: string;
};

export interface FileDocument {
  categoryId: string;
  documentType: string;
  fileName: string;
  id: string;
  resourceId: string;
}
