import { create } from 'zustand';
import { devtools,persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { UserInfo } from '@/types/global';


interface GlobalStoreState {
  userInfo: UserInfo | null;
  setUserInfo: (data: UserInfo | null) => void;
}

const store = immer<GlobalStoreState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set((state) => {
    // eslint-disable-next-line no-param-reassign
    state.userInfo = userInfo
  }),
  // setUserInfo: (userInfo) => alert(JSON.stringify(userInfo)),
}));

const useAuthStore = create(persist(devtools(store), { name: 'globalStore' }));

export default useAuthStore;