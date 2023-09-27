/* eslint-disable tailwindcss/no-custom-classname */
import { ReactNode } from "react";

import RouterTitle from "@/components/TabLeftUserInfo/RouterTitle";
import TabLeft from "@/components/TabLeftUserInfo/TabLeft";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <div className="base-info-user px-1 lg:px-36">
          <div className="pt-6 md:ml-12 mb-6">
            <RouterTitle />
          </div>
            <div className="grid grid-cols-4 gap-3 md:mx-12 lg:mx-0">
                <TabLeft />
                <div className="col-span-4 lg:col-span-3 bg-white box-border rounded-md block">
                    {children}
                </div>
            </div>
        </div>
    );
}
