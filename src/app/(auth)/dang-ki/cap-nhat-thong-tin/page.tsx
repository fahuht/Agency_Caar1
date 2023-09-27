import { Metadata } from "next";
import { Suspense } from "react";

import Loading from "../../loading";
import UpdateInfoAccount from "./update-info-account";

export const metadata: Metadata = {
    title: "Cập nhật thông tin người dùng",
    description: "Cập nhật thông tin người dùng website Caar",
};

export default function PageUpdateInfo() {
    return (
        <Suspense fallback={<Loading />}>
            <UpdateInfoAccount />
        </Suspense>
    );
}
