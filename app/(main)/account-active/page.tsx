// pages/account-activated.js

import Head from "next/head";

export default function AccountActivated() {
  return (
    <>
      <Head>
        <title>Account Activated</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Tài khoản của bạn đã được kích hoạt!
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Chúc mừng! Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng nhập
          và bắt đầu sử dụng dịch vụ của chúng tôi.
        </p>
        <a
          href="/sign-in"
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          Đăng nhập
        </a>
      </div>
    </>
  );
}
