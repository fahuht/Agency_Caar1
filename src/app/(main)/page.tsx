
import './index.css'

import { Metadata } from "next"

import BodyStyle from "@/components/LandingPage/BodyStyle"
import MakeCar from "@/components/LandingPage/MakeCar/index."
import NewsCar from "@/components/LandingPage/NewsCar"
import MiddleLandingPage from "@/components/LandingPage/Nguon-hang/page"
import PageHeaderLandingPage from "@/components/LandingPage/PageHeader/PageHeader"
import RegisterHomePage from "@/components/LandingPage/RegisterHomePage/RegisterHomePage"
import ScrollScript from "@/components/LandingPage/ScrollScript/ScrollScript"
import { baseApiFe } from '@/utils/constants'

export const metadata: Metadata = {
  title: "Caar",
  metadataBase: new URL(baseApiFe || ""),
  description: "Caar - Nền tảng hàng đầu cho những nhà giao dịch ôtô. EGI là nền tảng PropTech cung cấp data về ô tô, giúp nhà môi giới tiếp cận với hàng trăm nghìn thông tin chính chủ có nhu cầu bán, cho thuê để phục vụ hoạt động kinh doanh của mình.",
  keywords: 'Hot, nhất, tháng, xe, xe hơi, tin tức xe hơi, Chi tiết bộ sưu tập, kiểu dáng xe, hãng xe',
  openGraph: {
    locale: "vi_VN",
    type: 'website',
    siteName: 'Caar'
  }
}

type Props = {
  searchParams: { [key: string]: string | undefined }
}

const Home = ({ searchParams }: Props) => {
  return (
    <div className="landing-page-container">
      <ScrollScript />
      <PageHeaderLandingPage />
      <MiddleLandingPage />
      <BodyStyle />
      <MakeCar />
      <RegisterHomePage />
      <NewsCar searchParams={searchParams} />
    </div>
  )
}

export default Home
