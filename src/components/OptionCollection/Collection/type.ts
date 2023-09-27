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

export type CreateCollectionRequest = {
    name: string
}

export type CreateCollectionResponse = {
    status: number,
    id: string
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