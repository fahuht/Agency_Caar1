import { Metadata } from "next";
import { Suspense } from "react";

import Loading from "../../../loading";
import AccountOverview from "./overview-account";

export const metadata: Metadata = {
    title: "Tổng quan tài khoản",
};

export default function OverviewPage() {
    return (
        <Suspense fallback={<Loading />}>
            <AccountOverview />
        </Suspense>
    );
}
