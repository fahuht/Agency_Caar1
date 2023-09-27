'use client'

import { useMutation } from '@tanstack/react-query';
import { Input, Popover } from 'antd';
import React, { useEffect, useState } from 'react';

import NoImage from '@/public/assets/images/no-image.png'
import { notify } from '@/utils/common';

import {
    AddProductRequest,
    BaseRequestGetCollection,
    CheckProductInCollectionResponse,
    CreateCollectionRequest,
    GetCollectionRequest,
    GetCollectionResponse,
    GetListStatusRequest,
    ItemCollection,
    ItemStatus,
    Product,
    RemoveProductRequest,
    UpdateStatusRequest
} from '../type';
import {
    addProductInCollection,
    createCollection,
    getCollection,
    getListStatus,
    removeProductInCollection,
    updateStatus
} from './api';
import ModalCreateCollection from './ModalCreateCollection';


type Props = {
    productId: string | undefined
    responseCheckCollection: CheckProductInCollectionResponse | undefined
    handleCheckProductInCollection: () => void
};
export default function Collection({ productId, responseCheckCollection, handleCheckProductInCollection }: Props) {
    // state
    const [openCollection, setOpenCollection] = useState<boolean>(false)
    const [responeListCollection, setResponeListCollection] = useState<GetCollectionResponse<ItemCollection<Product>> | undefined>()
    const [openModalCreateCollection, setOpenModalCreateCollection] = useState<boolean>(false)
    const [listStatus, setListStatus] = useState<ItemStatus[]>([])

    // dùng useMutation
    const mutationGetCollection = useMutation((data: GetCollectionRequest) => getCollection(data))
    const mutationCreateCollection = useMutation((data: CreateCollectionRequest) => createCollection(data))
    const mutationAddProduct = useMutation((data: AddProductRequest) => addProductInCollection(data))
    const mutationRemoveProduct = useMutation((data: RemoveProductRequest) => removeProductInCollection(data))
    const mutationGetListStatus = useMutation((data: GetListStatusRequest) => getListStatus(data))
    const mutationUpdateStatus = useMutation((data: UpdateStatusRequest) => updateStatus(data))

    const baseRequest = {
        filter: '',
        name: ''
    }

    // get list status bộ sưu tập
    useEffect(() => {
        const newDataRequest = {
            types: ['PRODUCT_PERSONAL_STATUS']
        }
        mutationGetListStatus.mutate(newDataRequest, {
            onSuccess: (res) => {
                if (res.status === 1) {
                    setListStatus(res.data.PRODUCT_PERSONAL_STATUS)
                }
            },
            onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
        })
    }, [])
    // hàm get list bộ sưu tập
    const handleGetListCollection = (data: BaseRequestGetCollection): void => {
        mutationGetCollection.mutate(data, {
            onSuccess: (res) => {
                if (res.status === 1) {
                    setResponeListCollection(res)
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
            },
            onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
        })
    }

    // thêm hoặc xoá sản phẩm khỏi bộ sưu tập
    const handleAddOrRemoveProduct = (item: ItemCollection<Product>): void => {
        const newDataRequest = {
            boardId: item.id,
            productId
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

    // cập nhật trạng thái bộ sưu tập
    const handleUpdateStatus = (item: ItemStatus): void => {
        const newDataRequest = {
            productId,
            productStatusCode: item.code,
            productCode: "",
            productStatus: item.value
        }
        mutationUpdateStatus.mutate(newDataRequest, {
            onSuccess: (res) => {
                if (res.status === 1) {
                    notify('Cập nhật trạng thái thành công', 'success')
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
            {/* <span className='text-base text-gray-600 font-medium'>{item.name}</span> */}
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
            <div className='collection-container mt-2'>
                <Input.Search
                    placeholder='Tìm kiếm bộ sưu tập'
                    allowClear
                    size="large"
                    onSearch={handleSearch}
                />
                <div className='list-collection mt-2'>
                    <div className='flex flex-col'>
                        <span className='text-base font-bold text-gray-500 text-center'>Tất cả bộ sưu tập</span>
                        {mutationGetCollection.isLoading &&
                            <div className='flex justify-center mt-3 text-orange-600'>
                                <i className="fa-duotone fa-spinner-third fa-spin text-xl"></i>
                            </div>
                        }
                        {responeListCollection &&
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

    const renderListStatus = (): React.JSX.Element => (
        <div>
            {listStatus && listStatus.length > 0 &&
                listStatus.map(item => (
                    <div
                        className='flex justify-left p-2 cursor-pointer hover:bg-pink-100'
                        onClick={() => handleUpdateStatus(item)}
                        key={item.id}
                    >
                        <span className='text-base text-left text-gray-600 font-medium'>{item.name}</span>
                    </div>
                ))}
        </div>
    )

    return (
        <div className='flex items-center'>
            <div className='flex gap-1'>
                <Popover
                    placement='bottomRight'
                    trigger='click'
                    open={openCollection}
                    onOpenChange={() => setOpenCollection(prev => !prev)}
                    content={renderContentCollection()}
                    className='flex items-center'
                >
                    {responseCheckCollection &&
                        responseCheckCollection.data &&
                        responseCheckCollection.data.boardIds ? (
                        <div className="icon-option flex items-center gap-3 justify-center">
                            <i className="fa-solid fa-bookmark text-2xl text-orange-600"></i>
                        </div>
                    )

                        :
                        <div className="icon-option flex items-center gap-3 justify-center">
                            <i className="fa-regular fa-bookmark text-2xl text-orange-600"></i>
                        </div>}
                </Popover>
                {responseCheckCollection &&
                    responseCheckCollection.data &&
                    responseCheckCollection.data.productStatus &&
                    <Popover
                        placement='bottomRight'
                        trigger='click'
                        content={renderListStatus()}

                    >
                        <div className='flex items-center bg-pink-100 p-1 gap-3 rounded cursor-pointer'>
                            <div className='flex flex-col justify-center'>
                                <span className='text-center text-xs text-gray-600 w-fit whitespace-nowrap'>Trạng thái</span>
                                <span className='text-center text-sm font-semibold w-fit whitespace-nowrap'>{responseCheckCollection.data.productStatus}</span>
                            </div>
                            <i className="fa-sharp fa-solid fa-chevron-down  text-center flex items-center text-xs"></i>

                        </div>
                    </Popover>
                }
            </div>
            {openModalCreateCollection &&
                <ModalCreateCollection
                    openModalCreateCollection={openModalCreateCollection}
                    setOpenModalCreateCollection={setOpenModalCreateCollection}
                    handleCreateNewCollection={handleCreateNewCollection}
                />}
        </div>
    );
}
