
import { Metadata } from "next";
import { Suspense } from "react";

import Loading from "../../../loading";
import EditProfile from "./edit-profile";

export const metadata: Metadata = {
    title: "Chỉnh sửa hồ sơ",
};

export default function EditProfilePage() {
    return (
        <Suspense fallback={<Loading />}>
                <EditProfile />
            </Suspense>
    );
}
