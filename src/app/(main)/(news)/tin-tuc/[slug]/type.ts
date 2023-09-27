export type DetailNews = {
    status: number,
    data: {
        id: string,
        createdDate: string,
        modifiedDate: string,
        createdUser: string,
        modifiedUser: string,
        isDeleted: boolean,
        categoryId: string,
        categoryName: string,
        categoryCode: string,
        title: string,
        content: string,
        imageId: string,
        attachmentId: null,
        resourceCode: string,
        resourceName: string,
        resourceUrl: string | null,
        postDate: string,
        status: string,
        level: string,
        posterId: string,
        posterName: string,
        approverId: string,
        approverName: string,
        countViews: string | null,
        newsTagDtos: [],
        newsMetaKeywordDtos: [],
        shortDescription: string,
        slug: string
    }
}

export type MoreNews = {
    status: number,
    data: []
}

export type ItemNews = {
    id: string,
    categoryName: string,
    categoryCode: string,
    title: string,
    countViews: number,
    slug: string
}