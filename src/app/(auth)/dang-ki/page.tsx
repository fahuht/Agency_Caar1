import { Metadata } from "next";
import { Suspense } from "react";

import Loading from "../loading";
import RegisterAccount from "./register_account";

export const metadata: Metadata = {
    title: "Đăng ký",
    description: "Đăng ký website Caar",
};

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <RegisterAccount />
        </Suspense>
    );
}
