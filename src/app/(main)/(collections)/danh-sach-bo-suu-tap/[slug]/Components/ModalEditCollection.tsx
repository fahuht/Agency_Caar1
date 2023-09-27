"use client";

import '../index.css'

import { useMutation } from '@tanstack/react-query';
import { Modal } from 'antd';
import { useState } from 'react';

import { notify } from '@/utils/common';

import { updateCollection } from '../api';
import { UpdateCollectionRequest } from '../type';

type Props = {
    openModalEdit: boolean
    setOpenModalEdit: (value: boolean) => void
    collectionId: string | undefined
    handleGetDetailCollection: () => void
}

export default function ModalEditCollection({ collectionId, openModalEdit, setOpenModalEdit, handleGetDetailCollection }: Props) {
    const [nameCollection, setNameCollection] = useState<string>('')

    // useMutation
    const mutationGetListStatus = useMutation((data: UpdateCollectionRequest) => updateCollection(data))

    const handleUpdateCollection = (data: string): void => {
        const newDataRequest = {
            collectionId,
            name: data
        }

        mutationGetListStatus.mutate(newDataRequest, {
            onSuccess: (res) => {
                if (res.status === 1) {
                    notify('Cập nhật bộ sưu tập thành công', 'success')
                    setOpenModalEdit(false)
                    handleGetDetailCollection()
                }
                if (res.status === 0) {
                    notify(res.errorMsg, 'error')
                }
            },
            onError: () => notify('Có lỗi xảy ra trong quá trình thực hiện', 'error')
        })
    }

    return (
        <Modal
            title='Chỉnh sửa bộ sưu tập'
            open={openModalEdit}
            onCancel={() => setOpenModalEdit(false)}
            footer={
                (<div className='flex gap-3 justify-end'>
                    <button
                        type='button'
                        className='p-3 bg-white rounded font-semibold'
                        onClick={() => setOpenModalEdit(false)}
                    >
                        Huỷ
                    </button>
                    <button
                        type='button'
                        className='p-3 bg-orange-600 rounded text-white font-semibold'
                        onClick={() => handleUpdateCollection(nameCollection)}
                    >
                        Cập nhật
                    </button>
                </div>)
            }
        >
            <div className='p-3 pt-6'>
                <span className='text-sm text-gray-600 font-semibold'>Tên bộ sưu tập</span>
                <input
                    className='input-custom' type='text'
                    onChange={(e) => setNameCollection(e.target.value)}
                />
            </div>
        </Modal>
    );
}
