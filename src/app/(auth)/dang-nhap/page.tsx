import { Metadata } from 'next'
import React from 'react';

import Login from './login';

// khai báo TypeScript rằng 'FB' là một thuộc tính có thể xuất hiện trên đối tượng 'window'
declare global {
  interface Window {
    FB: any;
  }
}

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập website Caar',
}

// function gán form data để login
export default function LoginPage() {

  return (
        <Login />
  );
}
