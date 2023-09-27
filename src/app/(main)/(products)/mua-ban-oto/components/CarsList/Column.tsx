import './Column.css';
import './Grid.css'

import dayjs from "dayjs";
import Image from 'next/image';
import Link from "next/link";

import { defaultImages } from "@/utils/constants";

import { Car } from "../../type"
import Collection from "../Collection";
import EmptyData from "./EmptyData";

dayjs.locale('vi');
// Thời gian hiện tại
const now = dayjs();
interface Props {
    cars: Car[],
}

export default function Grid({ cars }: Props) {
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
        <div className="car-list-column-container">
            <div className="car-list-column">
                {cars.map(item => (
                    <div className="relative" key={`car-item-${item.id}`}>
                    <Link href={`/${item.slug}`}>
                        <div className="car-item" >
                            <div className="car-image relative">
                                <div className="car-created-time absolute top-2 left-4 bg-gray-500 px-2 rounded-full z-[1]">
                                    <span className="text-white text-xs">{handleCheckDiff(item.createdDate || '')}</span>
                                </div>
                                <Image placeholder="blur" blurDataURL={defaultImages} objectFit="cover" quality={100} fill src={item.imageUrl} alt={item.title} />
                            </div>
                            <div className="car-content relative">
                                {/* <div className="car-actions absolute top-4 right-4">
                                    <i className="fa-light fa-bookmark fa-2x cursor-pointer text-r hover:text-primary-200" />
                                </div> */}
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
                    <div className="car-actions absolute top-10 right-4">
                       <Collection itemProduct={item} />
                    </div>
                    </div>
                ))}
            </div>
        </div>

    );
}