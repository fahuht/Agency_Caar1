import { Metadata } from "next";
import { Suspense } from "react";

import Loading from "../../loading";
import ActiveAcount from "./active_account";

export const metadata: Metadata = {
    title: "Mã kích hoặt",
    description: "Mã kích hoặt website Caar",
};

export default function PageUpdateInfo() {
    return (
        <Suspense fallback={<Loading />}>
            <ActiveAcount />
        </Suspense>
    );
}
