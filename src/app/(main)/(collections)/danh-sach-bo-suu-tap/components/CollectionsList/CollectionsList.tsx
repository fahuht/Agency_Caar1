/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import "./index.css";

import dayjs from "dayjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import { State } from "@/app/(main)/(products)/mua-ban-oto/type";
import BlankImage from "@/public/assets/images/BlankImage.png";
import BlankImage2 from "@/public/assets/images/Placeholder.png";
import { Product } from "@/types/global";

import { Collection } from "../../type";
import ModalCreateCollections from "../ModalCreateCollections/ModalCreateCollection";
import SkeletonCollections from "../Skeleton/skeleton";
import { dataCollections } from "./type";

dayjs.locale("vi");
interface Props {
  collections: Collection<Product>[];
  // displayType: string;
  handleSearchCollections: (data?: State) => void;
  // dataRequest?: object;
}

export default function CollectionList({
  collections,
  handleSearchCollections,
  // dataRequest,
}: Props) {



  const pathName = usePathname();
  const router = useRouter()

  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

  const handleCloseModal = () => setIsOpenModalCreate(false);

  // Xử lí chuyển chi tiết bộ sưu tập
  const handleChangeDetailsCollections = (item: dataCollections<Product>):void => {
    const url =`${pathName}/${item?.boardSlug}`
    router.push(url)
  };

  // Xử lí hiển thị ảnh
  const renderImage = (item: dataCollections<Product>) => {
    const length = item?.products?.length;
    switch (length) {
      case 0:
        return (
          <button type="button" onClick={() => handleChangeDetailsCollections(item)}>
            <div className="hover:text-red-400 ">
              <div>
                <Image
                  src={BlankImage}
                  priority
                  alt="Picture of the collections"
                  className="w-full two-image-blank rounded-lg "
                />
              </div>
              <div className="text-start">
                <h1 className="mb-1 text-2xl font-medium">{item?.boardName}</h1>
                <p>{item?.numberOfProduct} xe</p>
              </div>
            </div>
          </button>
        );

      case 1:
        return (
          <button type="button" onClick={() => handleChangeDetailsCollections(item)}>
            <div className="grid hover:text-red-400 ">
              <div>
                <img
                  src={item?.products[0]?.imageUrl}
                  alt={item?.boardName}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="text-start">
                <h1 className="mb-1 text-2xl font-medium">{item?.boardName}</h1>
                <p>{item?.numberOfProduct} xe</p>
              </div>
            </div>
          </button>
        );

      case 2:
        return (
          <button type="button" onClick={() => handleChangeDetailsCollections(item)}>
          <div className="grid hover:text-red-400 rounded-lg">
            <div className="container-four-image">
              <div className="item-four-image ">
                <img
                  src={item?.products[0]?.urlImages[0]}
                  alt={item?.boardName}
                  className="h-full rounded-lg"
                />
              </div>
              <div className="item-four-image">
                <img
                  src={item?.products[1]?.urlImages[0]}
                  alt={item?.boardName}
                  className="h-full rounded-lg"
                />
              </div>
              <div className="item-four-image">
                {" "}
                <img
                  src={BlankImage2.src}
                  alt={item?.boardName}
                  className="h-full two-image-blank rounded-lg"
                />
              </div>
              <div className="item-four-image">
                {" "}
                <img
                  src={BlankImage2.src}
                  alt={item?.boardName}
                  className="h-full two-image-blank rounded-lg"
                />
              </div>
            </div>
            <div className="text-start">
              <h1 className="mb-1 text-2xl font-medium">{item?.boardName}</h1>
              <p>{item?.numberOfProduct} xe</p>
            </div>
          </div>
        </button>
        );

      case 3:
        return (
          <button type="button" onClick={() => handleChangeDetailsCollections(item)}>
            <div className="grid hover:text-red-400 rounded-lg">
              <div className="flex gap-1 ">
                <div className="item-three-image w-1/2 ">
                  <img
                    src={item?.products[0]?.urlImages[0]}
                    alt={item?.boardName}
                    className="h-full w-full rounded-lg"
                  />
                </div>
                <div className="column-container-three-image flex-1 ">
                  <div className="item-three-image h-1/2">
                    <img
                      src={item?.products[1]?.urlImages[0]}
                      alt={item?.boardName}
                      className="h-full w-full rounded-lg"
                    />
                  </div>
                  <div className="item-three-image h-1/2 mt-px">
                    <img
                      src={item?.products[2]?.urlImages[0]}
                      alt={item?.boardName}
                      className="h-full w-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="text-start  ">
                <h1 className="mb-1 text-2xl font-medium">{item?.boardName}</h1>
                <p>{item?.numberOfProduct} xe</p>
              </div>
            </div>
          </button>
        );

      default:
        return (
          <button type="button" onClick={() => handleChangeDetailsCollections(item)}>
            <div className="grid hover:text-red-400 rounded-lg">
              <div className="container-four-image">
                <div className="item-four-image ">
                  <img
                    src={item?.products[0]?.urlImages[0]}
                    alt={item?.boardName}
                    className="h-full rounded-lg"
                  />
                </div>
                <div className="item-four-image">
                  <img
                    src={item?.products[1]?.urlImages[0]}
                    alt={item?.boardName}
                    className="h-full rounded-lg"
                  />
                </div>
                <div className="item-four-image">
                  {" "}
                  <img
                    src={item?.products[2]?.urlImages[0]}
                    alt={item?.boardName}
                    className="h-full rounded-lg"
                  />
                </div>
                <div className="item-four-image">
                  {" "}
                  <img
                    src={item?.products[3]?.urlImages[0]}
                    alt={item?.boardName}
                    className="h-full rounded-lg"
                  />
                </div>
              </div>
              <div className="text-start">
                <h1 className="mb-1 text-2xl font-medium">{item?.boardName}</h1>
                <p>{item?.numberOfProduct} xe</p>
              </div>
            </div>
          </button>
        );
    }
  };

  return (
    <div className="collections-list-container ">
      <div className="collections-list-content">
        <div className="create-collections-container py-10">
          <button type="button" onClick={() => setIsOpenModalCreate(true)}>
            <i className="fa-sharp fa-solid fa-plus icon-create-collections" />
            <div className="mt-1 text-create-collections ">
              Thêm bộ sưu tập mới
            </div>
          </button>
        </div>
        <Suspense fallback={<SkeletonCollections />}>
          {/* <SkeletonCollections /> */}
          {collections.map((item) => (
            <>{renderImage(item)}</>
          ))}
        </Suspense>
      </div>

      {isOpenModalCreate && (
        <ModalCreateCollections
          // dataRequest={dataRequest}
          isOpenCreate={isOpenModalCreate}
          handleCloseModal={handleCloseModal}
          handleSearchCollections={handleSearchCollections}
        />
      )}
    </div>
  );
}
