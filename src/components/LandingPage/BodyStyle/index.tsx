import './index.css'

import Image from "next/image";
import Link from "next/link";

import { bodyTypes } from "./constants";

export default function BodyStyle() {
    return (
        <div className='bg-orange-500 py-8 body-style-landing-page'>
            <div className=' body-style-container'>
                <span className="text-2xl text-white font-bold reveal">Chọn xe theo kiểu dáng</span>
                <div className="list-body-style">
                    {bodyTypes.map(item => (
                        <div className="relative cursor-pointer reveal" key={item.value}>
                            <Link
                                href={`/mua-ban-oto?dang-xe=${item.value}`}
                                className="item-body-style">
                                <Image
                                    src={item.image}
                                    alt={item.label}
                                    className="image-body-style"
                                />
                            </Link>
                            <span className="label-body-style">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
