import './index.css'

import Image from 'next/image';
import Link from 'next/link';

import ImgPeople from '@/public/landing-pages-image/people.png'
import { ApiListResponse, CarMake } from '@/types/global';
import { baseApi } from '@/utils/constants';

import { ItemsExperience } from './constants';


async function getMake() {
    try {
        const res = await fetch(
            `${baseApi}/product-service/api/v1/car/find-by-type/PRODUCT_CAR_MAKE`,
            { next: { revalidate: 5 * 24 * 60 * 60 * 1000 } }
        );
        if (!res.ok) return undefined;
        return await res.json();
    } catch (error) {
        // console.log(error);
        return undefined;
    }
}

export default async function MakeCar() {
    const getListMakes: Promise<ApiListResponse<CarMake>> = getMake();
    const listMake = await getListMakes;
    return (
        <div className='bg-orange-500 pt-8 make-car-board-page'>
            <div className='make-car-container'>
                <span className='text-lg lg:text-2xl text-white font-bold reveal'>Tìm kiếm hãng xe yêu thích của bạn</span>
                <div className='list-make'>
                    {listMake?.data.map(item => (
                        <Link
                            href={`/mua-ban-oto?hang-xe=${item.code}`}
                            key={item.id}
                            className='make-item w-32 reveal'>
                            <Image
                                width={60}
                                height={60}
                                src={item.urlCarMaKe}
                                alt={item.name}
                            />
                            <span className='text-base text-white mt-auto whitespace-nowrap'>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='image-bg-bottom mt-10'>
                <div className='left-content col-span-1'>
                    <Image
                        src={ImgPeople}
                        alt="Bạn đã sẵn sàng trải nghiệm giải pháp - Thay đổi hoàn toàn công việc kinh doanh môi giới bất động sản với giải pháp toàn diện từ EGI"
                        height={700}
                        className='img-left-content reveal'
                    />
                </div>
                <div className='right-content'>
                    <div className='text-production flex flex-col container reveal'>
                        <span className='text-2xl text-white font-bold'>Bạn đã sẵn sàng trải nghiệm giải pháp?</span>
                        <span className='text-lg text-white font-medium w-2/3'>Thay đổi hoàn toàn công việc kinh doanh môi giới bất động sản với giải pháp toàn diện từ EGI</span>
                    </div>
                    <div className="list-experience flex gap-3 mt-10 container">
                        {ItemsExperience.map(item => (
                            <div className='experience-item reveal' key={item.label}>
                                <Image
                                    src={item.img}
                                    alt={item.label}
                                    width={50}
                                    height={50}
                                />
                                <span className='experience-item-text'>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
