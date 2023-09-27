'use client'

import React from 'react';

import { notify } from '@/utils/common';



type Props = {
    contactPhone: string
}

export default function CopyContactPhone({ contactPhone }: Props) {

    const handleCopyContact = (): void =>{
        notify('Sao chép liên hệ thành công', 'success')
        navigator.clipboard.writeText(contactPhone)
    }
    
    return (
        <div 
        className='ml-1 cursor-pointer'
        onClick={()=> handleCopyContact()}
        >
            <i className="fa-regular fa-copy"></i>
        </div>
    );
}
