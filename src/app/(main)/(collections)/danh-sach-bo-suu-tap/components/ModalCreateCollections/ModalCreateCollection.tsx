"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Divider, Input, Modal } from "antd";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { State } from "@/app/(main)/(products)/mua-ban-oto/type";
import { notify } from "@/utils/common";

import { DataForm } from "../../type";
import { onCreateCollections } from "./api";
import Loading from "./loading";

dayjs.locale("vi");
// Thời gian hiện tại

interface Props {
  isOpenCreate: boolean;
  handleCloseModal: () => void;
  handleSearchCollections:(dataGetListCollections?:State)=>void
  // dataRequest?:object | undefined
}

const schema = yup.object({
  name: yup
    .string()
    .required("Vui lòng nhập tên bộ sưu tập")
    .max(150, "Tên bộ sưu tập tối đa 150 kí tự"),
});

export default function ModalCreateCollections({
  isOpenCreate,
  handleCloseModal,
  handleSearchCollections,
}: Props) {

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DataForm>({
    resolver: yupResolver(schema),
  });


  // const { mutate: mutationCheckProductInCollection, isLoading } = useMutation(
  //   (data: DataForm) => onCreateCollections(data)
  // );

  const {
    mutate: onCreateCollectionsMutation,
    isLoading,
  } = useMutation(onCreateCollections, {
    onSuccess: (data,) => {
      if (data && data.status === 1) {
        notify('Tạo bộ sưu tập thành công', 'success')
        handleCloseModal()
        handleSearchCollections()
      } else {
        setError("name", {
          type: "custom",
          message: "Bộ sưu tập đã tồn tại",
        });
      }
    },
  });


  const onSubmit = (data: DataForm) => {
// console.log('data: ',data);
// console.log('dataCollections: ',dataCollections);


    onCreateCollectionsMutation(data);
  };

  return (
    <Modal
      title="Thêm mới bộ sưu tập"
      open={isOpenCreate}
      footer={[
        <Button
          key="back"
          className="btn-cancel-collection"
          onClick={() => handleCloseModal()}
          size="large"
        >
          Huỷ
        </Button>,
        <Button
          key="submit"
          className="btn-create-collection"
          onClick={handleSubmit(onSubmit)}
          size="large"
          disabled={isLoading}
        >
          {isLoading ? <Loading /> : <div>Tạo mới</div>}
        </Button>,
      ]}
    >
      <Divider />
      <div>
        <div className="mb-1">Tên bộ sưu tập</div>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Nhập tên bộ sưu tập"
              value={value}
              onChange={onChange}
              name="name"
              size="large"
              onBlur={onBlur}
              onPressEnter={handleSubmit(onSubmit)}
              maxLength={150}
            />
          )}
          name="name"
        />

        {errors.name && (
          <div>
            <p className="text-red-600 text-xs mt-2">{errors.name.message}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
