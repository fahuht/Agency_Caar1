import { ApiResponseStatus } from "@/types/global"

export type CollectionItem<T> = {
    boardId: string,
    boardName: string,
    createdDateBoard: string,
    numberOfProduct: number,
    products: T[]
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

export interface DetailCollectionResponse<T> {
    data: T[],
    status: ApiResponseStatus
}

export type UpdateCollectionRequest = {
    name: string
}

export type DeleteCollectionRequest = {
    collectionId: string
}