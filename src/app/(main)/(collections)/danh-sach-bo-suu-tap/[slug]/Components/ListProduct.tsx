'use client'

import '../index.css'

import { useMutation } from '@tanstack/react-query';
import { Dropdown, type MenuProps } from 'antd';
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react';

import Grid from '@/app/(main)/(products)/mua-ban-oto/components/CarsList/Grid';
import SkeletonProduct from '@/app/(main)/(products)/mua-ban-oto/components/SkeletonProduct';
import PageHeader from "@/app/(main)/(products)/mua-ban-oto/PageHeader";
import { RemoveProductRequest, State } from '@/app/(main)/(products)/mua-ban-oto/type';
import LoadingClient from '@/components/LoadingClient/LoadingClient';
import { Product } from '@/types/global';
import { notify } from '@/utils/common';

import { getDetailCollection, getListStatus, removeProductInCollection } from '../api';
import { CollectionItem, GetListStatusRequest, ItemStatus } from '../type';
import OptionCollection from './OptionCollection';

type Props = {
  collectionId: string | undefined
}

export default function ListProduct({ collectionId }: Props) {

  const baseDataRequest = {
    filter: "",
    make: "",
    model: "",
    conversionPrice: {
      fromValueT: "",
      toValueT: ""
    },
    mileage: {
      fromValueT: "",
      toValueT: ""
    },
    buildDate: {
      fromValueT: "",
      toValueT: ""
    },
    bodyStyle: "",
    useStatus: "",
    seats: "",
    exteriorColor: "",
    districtCode: "",
    provinceCode: "",
    subDistrictCode: "",
    boardId: "",
    fuelType: "",
    boardName: "",
    productStatusCode: [],
    page: '0',
    size: '10',
    sort: "createdDateBoard",
    order: "DESC"
  }

  const sortMenu: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          Ngày thêm mới nhất
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          Ngày thêm cũ nhất
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          Ngày đăng mới nhất
        </span>
      ),
    },
    {
      key: '4',
      label: (
        <span>
          Ngày đăng cũ nhất
        </span>
      ),
    },
  ];

  // State
  const [listStatus, setListStatus] = useState<ItemStatus[]>([])
  const [dataRequest, setDataRequest] = useState<State>(baseDataRequest)
  const [typeSort, setTypeSort] = useState<string>('Ngày thêm mới nhất')
  const [responseDetailCollection, setResponseDetailCollection] = useState<CollectionItem<Product>[]>([])
  const [nameCollection, setNameCollection] = useState<string>('')

  // useMutation
  const mutationGetDetailCollection = useMutation((data: State) => getDetailCollection(data))
  const mutationGetListStatus = useMutation((data: GetListStatusRequest) => getListStatus(data))
  const mutationRemoveProduct = useMutation((data: RemoveProductRequest) => removeProductInCollection(data))

// hàm get danh sách sản phẩm trong bộ sưu tập
const handleGetDetailCollection = (data?: State): void => {
  if (data) {
    mutationGetDetailCollection.mutate(data, {
      onSuccess: (res) => {
        if (res.status === 1) {
          setResponseDetailCollection(res.data)
          setNameCollection(res.data[0]?.boardName ? res.data[0]?.boardName : nameCollection)
          localStorage.setItem('requestCollections', JSON.stringify(data))
        }
      },
      onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
    })
  }
  else {
    mutationGetDetailCollection.mutate(dataRequest, {
      onSuccess: (res) => {
        if (res.status === 1) {
          setResponseDetailCollection(res.data)
          localStorage.setItem('requestCollections', JSON.stringify(dataRequest))
        }
      },
      onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
    })
  }
}

  useEffect(() => {
    // call api chi tiết bộ sưu tập
    const requestCollections =  localStorage.getItem('requestCollections')
    const newDataRequest = requestCollections && JSON.parse(requestCollections) || baseDataRequest
    handleGetDetailCollection({ ...newDataRequest, boardId: collectionId })

    const newDataRequestStatus = {
      types: ['PRODUCT_PERSONAL_STATUS']
    }
    // call api get list trạng thái bộ sưu tập
    mutationGetListStatus.mutate(newDataRequestStatus, {
      onSuccess: (res) => {
        if (res.status === 1) {
          setListStatus(res.data.PRODUCT_PERSONAL_STATUS)
        }
      },
      onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
    })

    setDataRequest({ ...newDataRequest, boardId: collectionId })
  }, [collectionId])

  

  // xoá sản phẩm khỏi bộ sưu tập
  const handleRemoveProduct = (productId?: string): void => {
    if (productId) {
      const newDataRequest = {
        boardId: collectionId || '',
        productId
      }
      mutationRemoveProduct.mutate(newDataRequest, {
        onSuccess: (res) => {
          if (res.status === 1) {
            notify('Xoá sản phẩm khỏi bộ sưu tập thành công', 'success')
            handleGetDetailCollection(dataRequest)
          }
          if (res.status === 0) {
            notify(res.errorMsg, 'error')
          }
        },
        onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
      })
    }
    else {
      notify('Có lỗi trong quá trình thực hiện', 'error')
    }
  }

  const handleChangeStatus = (item?: ItemStatus): void => {
    const newDataRequest = {
      ...dataRequest,
      productStatusCode: item?.code ? [item?.code] : ["PSS001", "PSS002", "PSS003"]
    }
    setDataRequest(newDataRequest)
    handleGetDetailCollection(newDataRequest)
  }

  // call api khi sort sản phẩm
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    let newDataRequest = { ...dataRequest }
    if (e.key === '1') {
      setTypeSort('Ngày thêm mới nhất')
      newDataRequest = {
        ...dataRequest,
        sort: 'createdDateBoardDetail',
        order: 'DESC'
      }
    }
    if (e.key === '2') {
      setTypeSort('Ngày thêm cũ nhất')
      newDataRequest = {
        ...dataRequest,
        sort: 'createdDateBoardDetail',
        order: 'ASC'
      }
    }
    if (e.key === '3') {
      setTypeSort('Ngày đăng mới nhất')
      newDataRequest = {
        ...dataRequest,
        sort: 'createdDateProduct',
        order: 'DESC'
      }
    }
    if (e.key === '4') {
      setTypeSort('Ngày đăng cũ nhất')
      newDataRequest = {
        ...dataRequest,
        sort: 'createdDateProduct',
        order: 'ASC'
      }
    }
    handleGetDetailCollection(newDataRequest)
    setDataRequest(newDataRequest)
  };

  const menuProps = {
    items: sortMenu,
    onClick: handleMenuClick,
  };

  return (
    <div className='list-product-collection'>
      <div className='router-title-detail-collection'>
        <Link href='/'>Trang chủ</Link>
        <i className="fa-solid fa-chevron-right text-xs"></i>
        <Link href='/danh-sach-bo-suu-tap'>Ô tô đã lưu</Link>
        <i className="fa-solid fa-chevron-right text-xs"></i>
        <span>Chi tiết bộ sưu tập</span>
      </div>
      <PageHeader type="detail-collection" handleGetDetailCollection={handleGetDetailCollection} />

      <div className='list-status-container mt-2'>
        <span className='text-status'>Trạng thái</span>
        <div className='list-status'>
          <span
            className={`item-status hover:text-orange-600 font-semibold cursor-pointer p-2
          ${dataRequest.productStatusCode && dataRequest.productStatusCode.length === 3 && 'text-orange-600 border-orange-600 border-b'}`}
            onClick={() => handleChangeStatus()}
          >
            Tất cả
          </span>
          {listStatus.length > 0 && listStatus.map(item => (
            <span
              key={item.id}
              className={`item-status text-base hover:text-orange-600 font-semibold cursor-pointer p-2
               ${dataRequest.productStatusCode && dataRequest.productStatusCode.length < 2 && dataRequest?.productStatusCode[0] === item.code && 'text-orange-600 border-orange-600 border-b'}`}
              onClick={() => handleChangeStatus(item)}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <div className='list-product-container container mx-auto mt-3 '>
        <div className='flex flex-col border-gray-600 border-b p-4'>
          <span className='name-collection text-4xl font-semibold'>
            {nameCollection}
          </span>
          <div className='option-collection mt-4'>
            <OptionCollection
              collectionId={collectionId}
              handleGetDetailCollection={handleGetDetailCollection}
            />
          </div>
        </div>
        <div className='flex justify-between mt-2'>
          <div className='number-product'>
            <span className='text-xs md:text-sm lg:text-base font-medium text-gray-700 '>
              Bao gồm {responseDetailCollection[0]?.numberOfProduct || '0'} xe hơi
            </span>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-xs md:text-sm lg:text-base font-medium text-gray-700'>Sắp xếp theo: </span>
            <Dropdown menu={menuProps} placement="bottom" trigger={["click"]} >
              <span className='text-xs md:text-sm lg:text-base flex gap-2 items-center text-orange-600 cursor-pointer'>
                {typeSort}
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </Dropdown>
          </div>
        </div>
        <div className='list-product mt-3 px-2 lg:px-0'>
          <Suspense fallback={<SkeletonProduct displayType="GRID" />}>
            {mutationGetDetailCollection.isLoading ||
              mutationRemoveProduct.isLoading ?
              <SkeletonProduct displayType="GRID" /> :
              <Grid cars={responseDetailCollection[0]?.products || []} type="detail-collection" handleRemoveProduct={handleRemoveProduct} />
            }
          </Suspense>
        </div>
      </div>
      <LoadingClient isLoading={mutationGetListStatus.isLoading || mutationRemoveProduct.isLoading} />
    </div>
  );
}
