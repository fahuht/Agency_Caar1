'use client';

import './index.css';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect,useState } from 'react';

import {
  Notifications,
  PagingListNotificationResponse,
  RequestGetNotification,
} from '@/components/Home/type';
import imageNotification from '@/public/assets/images/Caar.png';
import { checkTimeAgo } from '@/utils/common';

import { getNotification, seenNotification } from './api';
import PaginationNotify from './pagination';

type Props = {
  searchParams: { page: string | '0' };
};

export default function ListNotification({ searchParams }: Props) {
  const baseRequestGetNotification = {
    nofiticationTitle: '',
    notificationContent: '',
    createdDate: {
      fromValue: '',
      toVaVlue: '',
    },
    page: 0,
    size: 15,
  };
  const [listNotification, setListNotification] =
    useState<PagingListNotificationResponse<Notifications>>(); // danh sách thông báo
  // call api danh sách thông báo
  const mutationGetNotification = useMutation(
    (data: RequestGetNotification) => {
      return getNotification(`/api/notification/get-list-notification`, data);
    },
    {
      onSuccess: (data) => {
        if (data && data.status === 1) {
          setListNotification(data);
        }
      },
    },
  );

  // call api xem thông báo
  const mutationSeenNotification = useMutation(
    (data: string) => {
      return seenNotification(`/api/notification/seen-notification?id=${data}`);
    },
  );

  const checkColorNotificationUnseen = (status: boolean) => {
    if (!status) {
      return 'text-zinc-400';
    }
    return '';
  };

  const handleSeenNotification = (status: boolean, id: string) => {
    if (!status) {
      mutationSeenNotification.mutate(id);
    }
  };

  useEffect(() => {
    mutationGetNotification.mutate({
      ...baseRequestGetNotification,
      page: parseInt(searchParams.page, 10),
    });
  }, [searchParams]);

  return (
    <div className="page-list-notification">
      <h1 className="font-semibold text-3xl text-red-600 mb-5">
        Tất cả thông báo
      </h1>
      {listNotification &&
      listNotification.content &&
      listNotification.content.length > 0 ? (
        <div>
          {listNotification.content.map((item) => (
            <div key={item.id}>
              <Link
                href={item.redirectUrl || ''}
                className="link-notification"
                onClick={() => handleSeenNotification(item.seenStatus, item.id)}
              >
                <div
                  className={`flex ${checkColorNotificationUnseen(
                    item.seenStatus,
                  )}`}
                >
                  <Image
                    src={imageNotification}
                    alt="Picture of the author"
                    className="mr-4 md:mr-6 self-center"
                    height={40}
                    width={40}
                  />
                  <div>
                    <p className="font-medium text:sm text-lg">
                      {item.notificationTitle}
                    </p>
                    <p className="text-xxs md:text-sm text-zinc-400">
                      {checkTimeAgo(item.createdDate)}
                    </p>
                  </div>
                </div>
                {!item.seenStatus ? (
                  <i className="fa-sharp fa-solid fa-circle icon-unseen-notification"></i>
                ) : (
                  ''
                )}
              </Link>
            </div>
          ))}
          <PaginationNotify
            totalElement={listNotification.totalElements}
            paramsQuery={searchParams}
          />
        </div>
      ) : (
        <p className="text-3xl text-center font-medium">
          Hiện không có thông báo khả dụng
        </p>
      )}
    </div>
  );
}
