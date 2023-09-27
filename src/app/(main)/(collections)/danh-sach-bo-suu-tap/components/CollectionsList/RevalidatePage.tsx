/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

export default function RevalidatePage() {
  const router = useRouter();
  const handleRefreshPage = ():void => {
    router.refresh();
  }
  return (
    <a href="javascript:void(0)" onClick={() => handleRefreshPage()} className="text-white bg-primary-200 inline-block rounded-lg border  px-8 py-3 text-center text-base font-semibol transition ">
      Tải lại
    </a>
  )
}
