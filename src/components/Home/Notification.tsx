'use client';

import { useMutation } from '@tanstack/react-query';
import { Popover } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef,useState } from 'react';

import imageNotification from '@/public/assets/images/Caar.png';
import { checkTimeAgo } from '@/utils/common';

import { getNotification, seenNotification } from './api';
import { Notifications, RequestGetNotification } from './type';

export default function NotificationHeader() {
  const ref = useRef<HTMLDivElement>(null);
  // base request láy danh sách thông báo
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

  const [dataRequest, setDataRequest] = useState<RequestGetNotification>(
    baseRequestGetNotification,
  );
  const [openNotification, setOpenNotification] = useState(false); // đóng mở popup thông báo
  const [listNotification, setListNotification] = useState<Notifications[]>([]); // danh sách thông báo
  const [totalNotificationUnSeen, setTotalNotificationUnSeen] =
    useState<number>(0); // số lượng thông báo chưa đọc
  const hidePopupNotification = () => {
    setOpenNotification(false);
  };

  const showPopupNotification = (newOpen: boolean) => {
    setOpenNotification(newOpen);
  };

  // call api danh sách thông báo
  const mutationGetNotification = useMutation(
    (data: RequestGetNotification) => {
      return getNotification(`/api/notification/get-list-notification`, data);
    },
    {
      onSuccess: (data) => {
        if (data && data.status === 1) {
          setListNotification([...listNotification, ...data.content]);
          setTotalNotificationUnSeen(
            totalNotificationUnSeen +
              data.numberOfUnseenNotification ||0,
          );
        }
      },
    },
  );

  useEffect(() => {
    mutationGetNotification.mutate(baseRequestGetNotification);
  }, []);

  // call api xem thông báo
  const mutationSeenNotification = useMutation(
    (data: string) => {
      return seenNotification(
        `/api/notification/seen-notification?id=${data}`,
      );
    },
  );

  // check màu của thông báo chưa đọc
  const checkColorNotification = (status: boolean) => {
    if (status) {
      return 'text-black hover:text-orange-600';
    } 
    return 'text-zinc-500 hover:text-orange-600';
  };

  // đánh dấu tin tức là đã xem
  const handleSeenNotification = (id: string, status: boolean) => {
    hidePopupNotification();
    if (!status) {
      // call api đánh dấu đã xem tin tức
      const updateListNotification = listNotification.map(obj=>{
        if(obj.id === id) {
          return {...obj,seenStatus:true}
        }
        return obj;
      })
      setListNotification(updateListNotification) 
      mutationSeenNotification.mutate(id);
    }
  };

  // cuộn xuongs thì cho thêm thông báo

  const handleScrollNotification = () => {
    const scrollTop = ref.current?.scrollTop;
    const scrollHeight = ref.current?.scrollHeight;
    const clientHeight = ref.current?.clientHeight;
    if (
      scrollTop &&
      clientHeight &&
      scrollHeight &&
      scrollTop + clientHeight >= scrollHeight
    ) {
      const newDataRequest = {
        ...dataRequest,
        page: dataRequest.page + 1,
      };
      setDataRequest(newDataRequest);
      mutationGetNotification.mutate(dataRequest);
    }
  };

  // hiển thị danh sách xem thông báo
  const renderListNotification = () => {
    if (listNotification && listNotification.length > 0) {
      return (
        <div className="px-3">
          <div className="pb-3 pt-2 flex justify-between">
            <p className="text-lg font-medium mr-3">Danh sách thông báo</p>
            <Link
              href="/thong-bao/danh-sach-thong-bao?page=0"
              className="text-sky-600 self-center"
              onClick={()=>hidePopupNotification()}
            >
              Xem tất cả
            </Link>
          </div>
          <div
            className="max-h-96 overflow-x-auto"
            ref={ref}
            onScroll={() => handleScrollNotification()}
          >
            {listNotification.map((item) => (
              <Link
                key={item.id}
                href={item.redirectUrl||""}
                className="flex justify-between p-2 hover:bg-slate-100"
                onClick={() => handleSeenNotification(item.id, item.seenStatus)}
              >
                <div className="flex justify-between {checkColorNotification(item.seenStatus)}">
                <Image
                    src={imageNotification}
                    alt="Picture of the author"
                    className="mr-3 self-center"
                    height={30}
                    width={30}
                  />
                  <div className={checkColorNotification(item.seenStatus)}>
                  <p className="font-medium text-base">
                    {item.notificationTitle}
                  </p>
                  <p>{checkTimeAgo(item.createdDate)}</p>
                  </div>
                </div>
                {item.seenStatus === false ? (
                  <i className="fa-sharp fa-solid fa-circle icon-unseen-notification"></i>
                ) : (
                  ''
                )}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="px-3">
        <div className="pb-3 pt-2">
          <p className="text-lg font-medium">Danh sách thông báo</p>
        </div>
        <p className="text-center">Không có thông báo nào</p>
      </div>
    );
  };

  return (
    <div>
      <Popover
        overlayClassName="notification-header"
        placement="bottom"
        content={renderListNotification()}
        open={openNotification}
        onOpenChange={showPopupNotification}
        trigger="click"
      >
        <i className="fa-sharp fa-light fa-bell icon-notification-header">
          {totalNotificationUnSeen > 0 ? (
            <i className="fa-sharp fa-solid fa-circle notification-tick-icon"></i>
          ) : (
            ''
          )}
        </i>
      </Popover>
    </div>
  );
}
