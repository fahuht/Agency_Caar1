'use client'

import { LoadingOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Input, Popover, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { Car } from '@/app/(main)/(products)/mua-ban-oto/type';
import LoadingClient from '@/components/LoadingClient/LoadingClient';
import NoImage from '@/public/assets/images/no-image.png'
import { Product } from '@/types/global';
import { notify } from '@/utils/common';

import {
    addProductInCollection,
    checkProductInCollection,
    createCollection,
    getCollection,
    removeProductInCollection,
} from './api';
import ModalCreateCollection from './ModalCreateCollection';
import {
    AddProductRequest,
    BaseRequestGetCollection,
    CheckProductInCollectionRequest,
    CheckProductInCollectionResponse,
    CreateCollectionRequest,
    GetCollectionRequest,
    GetCollectionResponse,
    ItemCollection,
    // Product,
    RemoveProductRequest,
} from './type';

type Props = {
    itemProduct: Car | Product | undefined
};
export default function Collection({ itemProduct }: Props) {

    // state
    const [openCollection, setOpenCollection] = useState<boolean>(false)
    const [responeListCollection, setResponeListCollection] = useState<GetCollectionResponse<ItemCollection<Product>> | undefined>()
    const [openModalCreateCollection, setOpenModalCreateCollection] = useState<boolean>(false)
    const [responseCheckCollection, setResponseCheckCollection] = useState<CheckProductInCollectionResponse | undefined>()

    // dùng useMutation
    const mutationGetCollection = useMutation((data: GetCollectionRequest) => getCollection(data))
    const mutationCreateCollection = useMutation((data: CreateCollectionRequest) => createCollection(data))
    const mutationAddProduct = useMutation((data: AddProductRequest) => addProductInCollection(data))
    const mutationRemoveProduct = useMutation((data: RemoveProductRequest) => removeProductInCollection(data))
    const mutationCheckProductInCollection = useMutation((data: CheckProductInCollectionRequest) => checkProductInCollection(data))

    const baseRequest = {
        filter: '',
        name: ''
    }

    // kiểm tra sản phẩm đã nằm trong bộ sưu tập
    const handleCheckProductInCollection = (): void => {
        mutationCheckProductInCollection.mutate({ productId: itemProduct?.productId }, {
            onSuccess: (res) => {
                if (res.status === 1) {
                    setResponseCheckCollection(res)
                }
            },
            onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
        })
    }

    // hàm get list bộ sưu tập
    const handleGetListCollection = (data: BaseRequestGetCollection): void => {
        mutationGetCollection.mutate(data, {
            onSuccess: (res) => {
                if (res.status === 1) {
                    setResponeListCollection(res)
                    handleCheckProductInCollection()
                }
            },
            onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
        })
    }

    // call list bộ sưu tập khi mở
    useEffect(() => {
        if (openCollection) {
            handleGetListCollection(baseRequest)
        }
    }, [openCollection])





    // tìm kiếm bộ sưu tập
    const handleSearch = (value: string): void => {
        const newDataRequest = {
            filter: value,
            name: '',
        }
        handleGetListCollection(newDataRequest)
    }

    // tạo mới bộ sưu tập
    const handleCreateNewCollection = (nameCollection: string): void => {
        const newDataRequest = {
            name: nameCollection
        }
        mutationCreateCollection.mutate(newDataRequest, {
            onSuccess: (res) => {
                if (res.status === 1) {
                    notify('Tạo bộ sưu tập thành công', 'success')
                    setOpenModalCreateCollection(false)
                    setOpenCollection(true)
                }
                if (res.status === 0) {
                    notify(res.errorMsg, 'error')
                }
            },
            onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
        })
    }


    // thêm hoặc xoá sản phẩm khỏi bộ sưu tập
    const handleAddOrRemoveProduct = (item: ItemCollection<Product>): void => {
        const newDataRequest = {
            boardId: item.id,
            productId: itemProduct?.productId
        }
        if (responseCheckCollection &&
            responseCheckCollection.data &&
            responseCheckCollection.data.boardIds &&
            responseCheckCollection.data.boardIds.length > 0 &&
            responseCheckCollection.data.boardIds.includes(item.id)) {
            return mutationRemoveProduct.mutate(newDataRequest, {
                onSuccess: (res) => {
                    if (res.status === 1) {
                        notify('Xoá sản phẩm khỏi bộ sưu tập thành công', 'success')
                        handleGetListCollection(baseRequest)
                        handleCheckProductInCollection()
                    }
                    if (res.status === 0) {
                        notify(res.errorMsg, 'error')
                    }
                },
                onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
            })
        }
        return mutationAddProduct.mutate(newDataRequest, {
            onSuccess: (res) => {
                if (res.status === 1) {
                    notify('Thêm sản phẩm vào bộ sưu tập thành công', 'success')
                    handleGetListCollection(baseRequest)
                    handleCheckProductInCollection()
                }
                if (res.status === 0) {
                    notify(res.errorMsg, 'error')
                }
            },
            onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
        })
    }

    // render item bộ sưu tập
    const renderItemCollection = (item: ItemCollection<Product>): React.JSX.Element => (
        <div
            className='mt-1 cursor-pointer flex items-center gap-2 p-3 hover:bg-pink-100'
            onClick={() => handleAddOrRemoveProduct(item)}
        >
            {responseCheckCollection &&
                responseCheckCollection.data &&
                responseCheckCollection.data.boardIds &&
                responseCheckCollection.data.boardIds.length > 0 &&
                responseCheckCollection.data.boardIds.includes(item.id) &&
                <i className="fa-sharp fa-solid fa-circle-check icon-check-in-collection"></i>
            }
            <div className='flex items-center gap-1 w-4/5'>
                {item.products && item.products.length > 0 ?
                    <img src={item.products && item.products[0]?.imageUrl} className='w-11 h-8' /> : <img className='w-11 h-8' src={NoImage.src} />
                }
                <span className='text-base text-gray-600 font-medium truncate'>{item.name}</span>
            </div>
        </div>
    )

    const renderContentCollection = (): React.JSX.Element => (
        <div className='p-2 flex flex-col'>
            <span className='text-xl font-bold text-gray-700 text-center'>Lưu xe</span>
            <div className='collection-container px-0 mt-2'>
                <Input.Search
                    placeholder='Tìm kiếm bộ sưu tập'
                    allowClear
                    size="large"
                    onSearch={handleSearch}
                />
                <div className='list-collection mt-2'>
                    <div className='flex flex-col'>
                        <span className='text-base font-bold text-gray-500 text-center'>Tất cả bộ sưu tập</span>
                        {mutationGetCollection.isLoading ?
                            <div className='flex justify-center mt-3'>
                                <Spin indicator={<LoadingOutlined className='text-xl' spin />} />
                            </div> :
                            responeListCollection &&
                            responeListCollection.data &&
                            responeListCollection.data.length > 0 &&
                            responeListCollection.data.map(item => renderItemCollection(item))
                        }
                    </div>
                </div>
                <div className='create-new-collection mt-3'>
                    <button
                        type='button'
                        className='p-2 flex items-center gap-4'
                        onClick={() => {
                            setOpenModalCreateCollection(true)
                            setOpenCollection(false)
                        }}
                    >
                        <i className="fa-solid fa-plus text-base text-orange-600"></i>
                        <span className="text-base hover:text-orange-600 font-medium">Tạo bộ sưu tập mới</span>
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <div className='flex items-center'>
            <div className='flex gap-1'>
                <Popover
                    placement='bottom'
                    trigger='click'
                    open={openCollection}
                    onOpenChange={() => setOpenCollection(prev => !prev)}
                    content={renderContentCollection()}
                    className='flex items-center'
                >
                    <div className="item-option-collection">
                        <span className="text-sm text-left hover:text-orange-600 font-medium flex items-center gap-2 cursor-pointer">
                            Lưu vào bộ sưu tập khác{" "}
                            <i className="fa-regular fa-bookmark ml-auto"></i>
                        </span>
                    </div>
                </Popover>
            </div>
            {openModalCreateCollection &&
                <ModalCreateCollection
                    openModalCreateCollection={openModalCreateCollection}
                    setOpenModalCreateCollection={setOpenModalCreateCollection}
                    handleCreateNewCollection={handleCreateNewCollection}
                />}
            <LoadingClient isLoading={mutationCreateCollection.isLoading ||
                mutationAddProduct.isLoading ||
                mutationCheckProductInCollection.isLoading ||
                mutationRemoveProduct.isLoading} />
        </div>
    );
}
