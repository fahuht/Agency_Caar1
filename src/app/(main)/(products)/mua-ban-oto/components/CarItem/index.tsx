
import Image from 'next/image';

import Imagel from '@/public/advance-search-page-header.png'

import { Car } from "../../type";
// import { useParams } from 'next/navigation'
interface Props {
    data: Car
}
export default function CarItem({ data }: Props) {
    return (
        <div className="car-item " key={`car-item-${data.id}`}>
            <div className="car-image">
                <Image className="w-full" height={260} src={Imagel} priority alt={data.title} />
            </div>
            <div className="car-content">

            </div>
        </div>
    );
}