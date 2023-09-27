"use client";

import React, { useState } from "react";

type Props = {
  description: string;
};

export default function ProductDescription({ description }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const renderDesc = (desc: string): string => {
    if (desc && desc.length) {
      if (desc.length < 200 || isExpanded) {
        return desc;
      }
      return `${desc.slice(0, 200)}...`;
    }
    return '';
  };

  const toggleDesc = (): void => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <span className="font-semibold text-2xl">Mô tả chung</span>
      <p className="text-grey-100 break-words w-4/5">
        {renderDesc(description)}
      </p>
      {isExpanded ? (
        <span
          className="cursor-pointer text-orange-600 font-semibold"
          onClick={() => toggleDesc()}
        >
          Thu gọn <i className="fa-sharp fa-solid fa-chevron-up"></i>
        </span>
      ) : (
        <span
          className="cursor-pointer text-orange-600 font-semibold"
          onClick={() => toggleDesc()}
        >
          Đọc thêm <i className="fa-sharp fa-solid fa-chevron-down"></i>
        </span>
      )}
    </div>
  );
}
