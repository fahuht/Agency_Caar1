import dayjs from 'dayjs';
import { toast } from 'react-toastify';

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default'

export const notify = (message: string, type?: ToastType): void => {
    if (type === 'info') {
        toast.info(message)
    }
    if (type === 'success') {
        toast.success(message)
    }
    if (type === 'warning') {
        toast.warning(message)
    }
    if (type === 'error') {
        toast.error(message)
    }
    if (!type || type === 'default') {
        toast(message)
    }
};

export const readVietnameseCurrency = (amount: number): String => {
    if (amount >= 1000000000) {
        if (amount % 1000000000 === 0) {
            return `${amount / 1000000000  } tỷ`;
        }
        return `${(amount / 1000000000).toFixed(2)  } tỷ`;
    } if (amount >= 1000000) {
        if (amount % 1000000 === 0) {
            return `${amount / 1000000  } triệu`;
        }
        return `${(amount / 1000000).toFixed(2)  } triệu`;
    } 
        return `${amount.toLocaleString('vi-VN')  } đồng`;
    
};

// so sánh thời gian hiện tại với thời gian truyền vào , trả về kiều 1 ngày trước, 1 giờ trước ....
export const checkTimeAgo = (time: string) => {
    const now = dayjs();
    const differenceInHours = now.diff(time, 'hour');
    const differenceInDays = now.diff(time, 'day');

    if (differenceInDays > 0) {
      return `${differenceInDays} ngày trước`;
    } if (differenceInHours >= 1) {
      return `${differenceInHours} giờ trước`;
    } 
    return 'Vài phút trước';
  };