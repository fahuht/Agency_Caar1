import { ApiResponseStatus } from '@/types/global';

export type RequestGetNotification = {
  nofiticationTitle: string;
  notificationContent: string;
  createdDate: {
    fromValue: string;
    toVaVlue: string;
  };
  page: number;
  size: number;
};

export interface PagingListNotificationResponse<T> {
  content: T[];
  status: ApiResponseStatus; // 0 : lỗi, 1: Success,
    number: number;
    size: number;
    numberOfElements: number;
    hasContent: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    totalPages: number;
    totalElements: number;
    numberOfUnseenNotification: number;
    numberOfSeenNotification: number;
    first: boolean;
    last: boolean;
}

export interface Notifications {
  id: string;
  createdDate: string;
  modifiedDate: string;
  createdUser: string;
  modifiedUser: string;
  userId: string;
  notificationTitle:string;
  notificationContent: string;
  groupCode: string;
  senderId: string;
  repicientId: string;
  seenStatus: boolean;
  redirectUrl:string;
}
