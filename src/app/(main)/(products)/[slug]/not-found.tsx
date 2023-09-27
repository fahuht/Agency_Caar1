import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Không tìm thấy trang",
};

const NotfoundPage = () => {
  <div className="page-content">
    <section className="bg-primary relative z-10 py-32">
      <div className="container mx-auto">
        <div className="-mx-4 flex">
          <div className="error-content w-full px-4">
            <div className="mx-auto max-w-md text-center">
              <h2 className="error-title">404</h2>
              <h4 className="error-sub-title">Không tìm thấy trang!</h4>
              <p className="mb-8 text-lg text-black">Sản phẩm không tồn tại.</p>
              <Link
                href="/mua-ban-oto"
                className="error-link-btn hover:text-primary  hover:bg-white"
              >
                Quay về trang trước
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>;
};

export default NotfoundPage;
