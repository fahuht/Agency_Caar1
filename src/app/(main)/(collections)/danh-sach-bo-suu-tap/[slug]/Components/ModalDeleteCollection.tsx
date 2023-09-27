"use client";

import '../index.css'

import { useMutation } from '@tanstack/react-query';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation'

import { notify } from '@/utils/common';

import { deleteCollection } from '../api';
import { DeleteCollectionRequest } from '../type';

type Props = {
    openModalDelete: boolean
    setOpenModalDelete: (value: boolean) => void
    collectionId: string | undefined
}

export default function ModalDeleteCollection({ collectionId, openModalDelete, setOpenModalDelete }: Props) {
    const router = useRouter()

    // useMutation
    const mutationDeleteCollection = useMutation((data: DeleteCollectionRequest) => deleteCollection(data))

    const handleDeleteCollection = (): void => {
        const newDataRequest = {
            collectionId: collectionId || '',
        }

        mutationDeleteCollection.mutate(newDataRequest, {
            onSuccess: (res) => {
                if (res.status === 1) {
                    notify('Xoá bộ sưu tập thành công', 'success')
                    setOpenModalDelete(false)
                    router.push('/danh-sach-bo-suu-tap')

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
            open={openModalDelete}
            onCancel={() => setOpenModalDelete(false)}
            footer={
                (<div></div>)
            }
        >
            <div className='p-3 pt-6 delete-collection-modal'>
                <div className='flex justify-center w-full'>
                    <div className='icon-option-collection'>
                        <i className="fa-solid fa-trash-can  text-3xl text-orange-600"></i>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center mt-2'>
                    <span className=' text-2xl font-bold'>Bạn có muốn xóa bộ sưu tập này?</span>
                    <span className='text-center text-base text-gray-600 font-semibold mt-3'>Nếu xóa bộ sưu tập này, tất cả xe hơi được lưu sẽ bị hủy bỏ. Bạn có chắc chắn xóa bộ sưu tập này?</span>
                </div>
                <div className='flex flex-col items-center gap-2 mt-4'>
                    <button
                        type='button'
                        className='bg-orange-600 text-white w-4/5 lg:w-1/2 p-3 rounded text-xl font-bold'
                        onClick={() => handleDeleteCollection()}
                    >Xoá bộ sưu tập
                    </button>
                    <button
                        type='button'

                        className='text-orange-600 w-1/2 p-3 rounded text-xl font-bold'
                        onClick={() => setOpenModalDelete(false)}
                    >Huỷ
                    </button>
                </div>
            </div>
        </Modal>
    );
}
