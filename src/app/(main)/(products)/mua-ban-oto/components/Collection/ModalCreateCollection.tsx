import "./index.css";

import { Modal } from "antd";
import React, { useState } from "react";

export interface Props {
  openModalCreateCollection: boolean;
  setOpenModalCreateCollection: (value: boolean) => void;
  handleCreateNewCollection: (value: string) => void;
}

export default function ModalCreateCollection({
  openModalCreateCollection,
  setOpenModalCreateCollection,
  handleCreateNewCollection,
}: Props) {
  const [nameCollection, setNameCollection] = useState<string>("");

  return (
    <Modal
      title="Tạo mới bộ sưu tập"
      open={openModalCreateCollection}
      onCancel={() => setOpenModalCreateCollection(false)}
      footer={
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            className="p-3 bg-white rounded font-semibold"
            onClick={() => setOpenModalCreateCollection(false)}
          >
            Huỷ
          </button>
          <button
            type="button"
            className="p-3 bg-orange-600 rounded text-white font-semibold"
            onClick={() => handleCreateNewCollection(nameCollection)}
          >
            Tạo mới
          </button>
        </div>
      }
    >
      <div className="flex flex-col">
        <span className="text-sm text-gray-600 font-medium">
          Tên bộ sưu tập
        </span>
        <input
          className="input-custom"
          type="text"
          onChange={(e) => setNameCollection(e.target.value)}
        />
      </div>
    </Modal>
  );
}
