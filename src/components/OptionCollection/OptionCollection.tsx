"use client";

import {  Popover } from "antd";
import React, { useState } from "react";

import {  Car } from "@/app/(main)/(products)/mua-ban-oto/type";
import { Product } from "@/types/global";

import Collection from "./Collection";

type Props = {
    itemProduct: Car | Product | undefined;
    handleRemoveProduct?: (value?: string | undefined) => void;
};
export default function OptionCollection({
    itemProduct,
    handleRemoveProduct,
}: Props) {
    // state
    const [openOptionCollection, setOpenOptionCollection] = useState<boolean>(false);

    const renderContentCollection = (): React.JSX.Element => (
        <div className="p-2 flex flex-col gap-2">
            <div
                className="item-option-collection"
                onClick={() => {
                    if (itemProduct && handleRemoveProduct) {
                        handleRemoveProduct(itemProduct.productId);
                    }
                }}
            >
                <span className="text-sm font-medium hover:text-orange-600 text-left flex items-center gap-2 cursor-pointer">
                    Xoá khỏi bộ sưu tập{" "}
                    <i className="fa-regular fa-trash-can ml-auto"></i>
                </span>
            </div>
            <Collection itemProduct={itemProduct} />
        </div>
    );

    return (
        <div className="flex items-center">
            <div className="flex gap-1">
                <Popover
                    placement="bottomRight"
                    trigger="click"
                    open={openOptionCollection}
                    onOpenChange={() => setOpenOptionCollection((prev) => !prev)}
                    content={renderContentCollection()}
                    className="flex items-center"
                >
                    <div className="w-[2rem] h-[2rem] flex justify-center items-center hover:bg-slate-400 rounded-full cursor-pointer">
                        <i className="fa-solid fa-ellipsis-vertical text-white text-2xl"></i>
                    </div>
                </Popover>
            </div>
        </div>
    );
}
