
import { Metadata } from "next";
import { Suspense } from "react";

import Loading from "../../../loading";
import ChangePassword from "./change-password";

export const metadata: Metadata = {
    title: "Thay đổi mật khẩu",
};

export default function EditPassword() {
    return (
        <Suspense fallback={<Loading />}>
                <ChangePassword />
            </Suspense>
    );
}
