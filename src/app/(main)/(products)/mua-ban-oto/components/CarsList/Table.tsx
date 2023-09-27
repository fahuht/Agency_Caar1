import './Table.css';

import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

import { defaultImages } from "@/utils/constants";

import { tableDisplayField } from "../../constants";
import { Car, TableDisplayField, TableField } from "../../type"
import Collection from "../Collection";
import EmptyData from "./EmptyData";

interface Props {
    cars: Car[],
}
export default function Table({ cars }: Props) {
    // console.log('====================================');
    // console.log('cars', cars);
    // console.log('====================================');
    const renderContent = (field: TableDisplayField, item: Car): ReactElement => {
        if (field.value === 'action') {
            return (
                // <i className="fa-light fa-bookmark cursor-pointer text-r hover:text-primary-200" />
                <Collection itemProduct={item} />
            )
        }
        if (field.value === 'title') {
            return <Link className="text-primary-200" href={`/${item.slug}`}>{item.title}</Link>
        }
        if (field.value === 'urlImages') {
            return (
                <div className="relative flex gap-4 justify-end">
                    {item?.urlImages.slice(0, 4).map((image, index) => {
                        if (index === 3 && item.urlImages.length > 4) {
                            return (
                                <div className="car-image-count relative" key={`image-${item.id}-${image}`}>
                                    <Image
                                        loading="lazy"
                                        key={`image-${item.id}-${image}`}
                                        placeholder="blur"
                                        blurDataURL={defaultImages}
                                        objectFit="cover"
                                        quality={100}
                                        width={50}
                                        height={50}
                                        src={image}
                                        alt={item.title}
                                        style={{
                                            width: '3rem',
                                            height: '3rem'
                                        }}
                                    />
                                    <div className="backdrop-sepia-0 bg-black/30 absolute left-0 top-0 w-full h-full flex items-center justify-center">
                                        <span className="text-white text-xs">{item.urlImages.length} ảnh</span>
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <Image
                                loading="lazy"
                                style={{
                                    width: '3rem',
                                    height: '3rem'
                                }}
                                key={`image-${item.id}-${image}`}
                                placeholder="blur"
                                blurDataURL={defaultImages}
                                objectFit="cover"
                                quality={100}
                                width={50}
                                height={50}
                                src={image}
                                alt={item.title}
                            />
                        )
                    })}
                </div>
            )
        }
        return (
            <div>{item[field.value as TableField] || '--'}</div>
        )
    }

    const renderTdContent = (field: TableDisplayField, item: Car): ReactElement => {
        return (
            <td
                style={{
                    minWidth: `${field?.width}px`,
                }}
                key={`td-${item.id}-${field.value}`}
                className={`p-4 text-sm font-medium overflow-hidden text-ellipsis ${field.className || ''}`}
            >
                <div className="table-label">
                    {field.label}
                </div>
                <div className={`table-content ${field.value === 'action' ? 'item-collection' : ''}`}>
                {renderContent(field, item)}
                </div>
            </td>
        )
    }

    const renderThContent = (field: TableDisplayField): ReactElement => {
        return (
            <th
                // width={field?.width}
                key={`thead-${field.value}`}
                style={{
                    minWidth: `${field?.width}px`,
                }}
                scope="col"
                className={`p-4 text-sm font-normal text-left text-gray-800 truncate${field.className || ''}`}
            >
                {field.label}
            </th>
        )
    }

    if (cars?.length === 0) {
        return <EmptyData />
    }
    return (
        <div className="car-list-table">
            <div className="car-list-content">
                <section className="container mx-auto">
                    <div className="type-view-table border md:rounded-lg overflow-x-auto">
                        <table className="table border min-w-full w-auto table-fixed">
                            <thead className="bg-white border">
                                {tableDisplayField.map(item => renderThContent(item))}
                            </thead>
                            <tbody className="divide-y bg-white">
                                {cars.map(item => (
                                    <tr key={`trow-${item.id}`} className="table-item p-3">
                                        {tableDisplayField.map(field => renderTdContent(field, item))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}