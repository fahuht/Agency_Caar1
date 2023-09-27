import './Grid.css';

import dayjs from "dayjs";
import Image from 'next/image';
import Link from "next/link";

import OptionCollection from "@/components/OptionCollection/OptionCollection";
import { Product } from "@/types/global";
import { defaultImages } from "@/utils/constants";

import { Car } from "../../type"
import Collection from "../Collection";
import EmptyData from "./EmptyData";

dayjs.locale('vi');
// Thời gian hiện tại
const now = dayjs();
interface Props {
    cars: Car[] | Product[] | undefined,
    type?: string
    handleRemoveProduct?: (value?:string | undefined) => void
}

export default function Grid({ cars, type, handleRemoveProduct }: Props) {
    const handleCheckDiff = (date?: string): string => {
        const targetTime = date ? (dayjs(date) || null) : '';
        if (targetTime) {
            const diff = now.diff(targetTime, 'day');
            const formattedDiff = diff === 1 ? '1 ngày trước' : `${diff} ngày trước`;
            return formattedDiff;
        }
        return '--'
    }
    if (cars?.length === 0) {
        return <EmptyData />
    }
    return (
        <div className="car-list-grid">
            {cars && cars.map(item => (
                <div className="relative" key={`car-item-${item.id}`}>
                    <Link href={`/${item.slug}`}>
                        <div className="car-item ">
                            <div className="car-image relative">
                                <div className="car-created-time absolute top-2 left-4 bg-gray-500 px-2 rounded-full">
                                    <span className="text-white text-xs">{handleCheckDiff(item.createdDate || '')}</span>
                                </div>
                                {/* <div className="car-actions absolute top-2 right-4">
                                    <i className="fa-light fa-bookmark fa-2x text-white cursor-pointer hover:text-primary-200" />
                                </div> */}
                                <Image className="w-full" placeholder="blur" blurDataURL={defaultImages} height={260} width={472} src={item.imageUrl} priority alt={item.title} />
                            </div>
                            <div className="car-content">
                                <p className="car-title">
                                    <i className="fa-light fa-circle-info" />
                                    <span className="ml-2">{item.title || '--'}</span>
                                </p>
                                <p className="car-location">
                                    <i className="fa-light fa-location-dot" />
                                    <span className="ml-2">{item.location || '--'}</span>
                                </p>
                                <p className="car-price">{item.price || "--"}</p>
                                <hr className="car-hr" />
                                <div className="car-parameters">
                                    <span className="car-milage">
                                        <i className="fa-light fa-gauge mr-1" />
                                        {item.mileage || "--"}
                                    </span>
                                    <span className="car-build-date">
                                        <i className="fa-light fa-calendar-days mr-1" />
                                        {item.buildDate || "--"}
                                    </span>
                                    <span className="car-transmission">
                                        <i className="fa-light fa-engine mr-1" />
                                        {item.transmission || "--"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="car-actions absolute top-2 right-4">
                       {!type && <Collection itemProduct={item} />}
                       {type === 'detail-collection' && <OptionCollection itemProduct={item} handleRemoveProduct={handleRemoveProduct} />}
                    </div>
                </div>
            ))}
        </div>
    );
}