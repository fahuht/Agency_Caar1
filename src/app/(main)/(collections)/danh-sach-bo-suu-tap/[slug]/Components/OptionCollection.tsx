"use client";

import '../index.css'

import { useState } from 'react';

import ModalDeleteCollection from './ModalDeleteCollection';
import ModalEditCollection from './ModalEditCollection';

type Props = {
    collectionId: string | undefined
    handleGetDetailCollection: () => void
}

export default function OptionCollection({collectionId, handleGetDetailCollection}: Props) {
    // State
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

    return (
        <div className="option-container flex items-center gap-4">
            <div className='icon-option-collection'
                onClick={() => setOpenModalEdit(true)}
            >
                <i className="fa-solid fa-pen-to-square text-orange-600"></i>
            </div>
            <div className='icon-option-collection'
                onClick={() => setOpenModalDelete(true)}
            >
                <i className="fa-solid fa-trash-can text-orange-600"></i>
            </div>
            {openModalEdit && <ModalEditCollection
            handleGetDetailCollection={handleGetDetailCollection}
            collectionId={collectionId}
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            />}
            {openModalDelete && <ModalDeleteCollection
            collectionId={collectionId}
            openModalDelete={openModalDelete}
            setOpenModalDelete={setOpenModalDelete}
            />}
        </div>
    );
}
