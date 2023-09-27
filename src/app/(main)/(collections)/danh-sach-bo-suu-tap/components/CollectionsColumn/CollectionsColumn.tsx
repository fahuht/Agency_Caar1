"use client";

import "./index.css";

import { Divider } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

import Grid from "@/app/(main)/(products)/mua-ban-oto/components/CarsList/Grid";
import { State } from "@/app/(main)/(products)/mua-ban-oto/type";
import { Product } from "@/types/global";

import { Collection } from "../../type";
import { dataCollections } from "../CollectionsList/type";
import ModalCreateCollections from "../ModalCreateCollections/ModalCreateCollection";

interface Props {
  collections: Collection<Product>[];
  // dataRequest?: object;
  handleSearchCollections: (data?: State) => void;
}

export default function CollectionsColumn({
  collections,
  // dataRequest,
  handleSearchCollections,
}: Props) {
  const router = useRouter();
  const pathName = usePathname();

  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);

  const handleCloseModal = () => setIsOpenModalCreate(false);

  // Xử lí chuyển chi tiết bộ sưu tập
  const handleChangeDetailsCollections = (item: dataCollections<Product>):void => {
    const url = `${pathName}/${item?.boardSlug}`;
    router.push(url);
  };

  return (
    <div className="collections-columns-container">
      <div className="create-collections-container">
        <button type='button' onClick={() => setIsOpenModalCreate(true)}>
          <i className="fa-sharp fa-solid fa-plus icon-create-collections" />
          <div className="mt-1 text-create-collections">
            Thêm bộ sưu tập mới
          </div>
        </button>
      </div>
      <Divider />

      {Array.isArray(collections) &&
        collections.length > 0 &&
        collections.map((item) => {
          return (
            <div key={`boardName_columns_${item?.boardId}`}>
              {/* Title */}
              <div className="flex items-center justify-between mt-5	">
                {/* Name Collections */}
                <div className="flex items-center">
                  <div className="text-2xl font-bold">{item?.boardName}</div>
                  <div className="text-xl text-slate-400 ml-4">
                    {" "}
                    {`(${item?.numberOfProduct})`}{" "}
                  </div>
                </div>
                <div>
                  <button type='button'
                    className="flex items-center"
                    onClick={() => handleChangeDetailsCollections(item)}
                  >
                    <div className="text-primary-200 mr-1 text-sm">
                      Xem tất cả
                    </div>
                    <div className="text-primary-200 mr-1 text-xs">
                      <i className="fa-sharp fa-light fa-chevron-right" />
                    </div>
                  </button>
                </div>
              </div>
              <Divider />
              <div>
                {item?.products?.length > 0 ? (
                  <Grid cars={item?.products || []} />
                ) : (
                  <div className="flex justify-center text-slate-400 text-xl">
                    Bộ sưu tập trống
                  </div>
                )}
              </div>
            </div>
          );
        })}

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
