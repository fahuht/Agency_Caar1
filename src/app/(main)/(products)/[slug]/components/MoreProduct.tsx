'use client'

import '../index.css'

import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { notify } from '@/utils/common';

import Grid from '../../mua-ban-oto/components/CarsList/Grid';
import { DetailProduct, GetMoreProductRequest, Product } from '../type';
import { getMoreProduct } from './api';

type Props = {
    product: DetailProduct
}

export default function MoreProduct({ product }: Props) {

    // useMutation
    const mutationGetMoreProduct = useMutation((data: GetMoreProductRequest) => getMoreProduct(data))

    //State
    const [listCars, setListCars] = useState<Product[]>([])

    useEffect(() => {
        const newDataRequest = {
            provinceCode: product.data.provinceCode || "",
            page: 0,
            size: 4,
        }
        mutationGetMoreProduct.mutate(newDataRequest, {
            onSuccess: (res) => {
                if (res.status === 1) {
                    setListCars(res.data)
                }
            },
            onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
        })
    }, [product])
    return (
        <div className='list-product mt-7 px-2 lg:px-0'>
            {mutationGetMoreProduct.isLoading ?
                <div className='flex h-7 justify-center items-center'>
                    <i className="fa-duotone fa-spinner-third fa-spin text-xl"></i>
                </div> :
                <Grid cars={listCars || []} />
            }
        </div>
    );
}
