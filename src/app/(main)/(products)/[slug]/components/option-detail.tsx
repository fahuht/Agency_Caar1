"use client";

import { useMutation } from "@tanstack/react-query";
import { Popover } from "antd";
import React, { useEffect, useState } from "react";

import useGlobalStore from '@/app/store/globalStore';
import FBLogo from '@/public/assets/images/fb-logo.png'
import ZaloLogo from '@/public/assets/images/logo-zalo.png'
import { notify } from "@/utils/common";
import { baseApiFe } from "@/utils/constants";

import { CheckProductInCollectionRequest, CheckProductInCollectionResponse } from "../type";
import { checkProductInCollection } from "./api";
import Collection from "./collection";

type Props = {
  slug: string
  productId: string | undefined
};

export default function OptionDetail({ slug, productId }: Props) {
  const [openPopoverShare, setOpenPopoverShare] = useState<boolean>(false)
  const [responseCheckCollection, setResponseCheckCollection] = useState<CheckProductInCollectionResponse | undefined>()
  const urlShare = `${baseApiFe}/${slug}`
  const urlShareFB = `https://www.facebook.com/sharer/sharer.php?u=${urlShare}&amp;src=sdkpreparse`

  const useInfo = useGlobalStore(state => state.userInfo);

  useEffect(() => {
    if (openPopoverShare) {
      // @ts-ignore
      ZaloSocialSDK.reload()
    }
  }, [openPopoverShare])

  // useMutation
  const mutationCheckProductInCollection = useMutation((data: CheckProductInCollectionRequest) => checkProductInCollection(data))

  // kiểm tra sản phẩm đã nằm trong bộ sưu tập
  const handleCheckProductInCollection = (): void => {
    mutationCheckProductInCollection.mutate({ productId }, {
      onSuccess: (res) => {
        if (res.status === 1) {
          setResponseCheckCollection(res)
        }
      },
      onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
    })
  }

  useEffect(() => {
    if (useInfo?.id) {
      handleCheckProductInCollection()
    }
  }, [useInfo?.id])

  const handleCopyLink = (): void => {
    notify('Sao chép liên kết thành công', 'success')
    navigator.clipboard.writeText(urlShare)
  }

  const renderBtnShare = (): React.JSX.Element => (
    <div className="flex flex-col items-start gap-2">
      <div className="items-btn-share">
        <span
          className="flex gap-2 cursor-pointer items-center"
          onClick={() => handleCopyLink()}
        >
          <i className="fa-regular fa-link text-lg font-medium"></i>
          <span className="text-share ">Sao chép liên kết</span>
        </span>
      </div>
      <div
        className="zalo-share-button items-btn-share"
        data-href={urlShare}
        data-oaid="3203494928783117875"
        data-layout=""
        data-color="blue"
        data-customize="true"
        data-share-type
      >

        <div className="flex items-center gap-2 cursor-pointer ">
          <img src={ZaloLogo.src} className="h-6 w-6" />
          <span className="text-share">Chia sẻ qua Zalo</span>
        </div>
      </div>
      <div
        className="fb-share-button items-btn-share"
        data-href={urlShare}
        data-layout="button"
        data-size="small"
      >
        <a
          target="_blank"
          href={urlShareFB}
          className="fb-xfbml-parse-ignore flex gap-2"
        >
          <span>
            <img src={FBLogo.src} className="h-6 w-6" />
          </span>
          <span className="text-share">Chia sẻ qua Facebook</span>
        </a>
      </div>
    </div>
  )
  return (
    <div className="option-container flex items-center gap-4 justify-center">
      {useInfo?.id &&
        <Collection
          productId={productId}
          responseCheckCollection={responseCheckCollection}
          handleCheckProductInCollection={handleCheckProductInCollection}
        />
      }
      <Popover
        placement='bottomRight'
        trigger='click'
        open={openPopoverShare}
        onOpenChange={() => setOpenPopoverShare(prev => !prev)}
        content={renderBtnShare()}
      >
        <div className="icon-option flex items-center gap-3 justify-center">
          <i className="fa-sharp fa-light fa-share-nodes text-3xl text-orange-600"></i>
        </div>
      </Popover>
    </div>
  );
}
