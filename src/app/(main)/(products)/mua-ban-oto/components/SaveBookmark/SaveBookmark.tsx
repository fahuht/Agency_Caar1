'use client'

// import { usePostCommon } from '@/hooks/usePostCommon';
import { useMutation } from '@tanstack/react-query';
import { Input, Modal } from 'antd';
import React, { ChangeEvent, ReactElement, ReactNode, useEffect, useState } from 'react'

import { useGetCommon } from '@/hooks/useGetCommon';
import { ErrorResponse } from '@/types/global';
import { notify, readVietnameseCurrency } from '@/utils/common';

import { bodyTypes, colors, fuelType, priceList, searchFields, seats, transmissionTypes, useStatus } from '../../constants';
import { CommonSelect, RangeField, SaveBookmarkRequest, SaveBookmarkResponse, SearchField, SingleValueField, State } from '../../type';
import { saveBookmarkRequest } from './api';
// import useGlobalStore from '@/app/store/globalStore';
// import { State } from './type';


interface Props {
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
    globalDataRequest: State
}

interface DataRequest {
    name: string,
    searchContent: State
}

export default function SaveBookmark({ isModalOpen, handleOk, handleCancel, globalDataRequest }: Props): ReactElement {

    // const useInfo = useGlobalStore(state => state.userInfo);

    const { data: makeList } = useGetCommon({
        type: 'CAR_MAKE',
    });
    const { data: modelList } = useGetCommon({
        type: 'CAR_MODEL',
    });

    const { data: provinceList } = useGetCommon({
        type: 'PROVINCE',
    });
    // const { data: districtList } = useGetCommon({
    //     type: 'DISTRICT',
    // });
    // const { data: subDistrictList } = useGetCommon({
    //     type: 'SUBDISTRICT',
    // });

    const [dataRequest, setDataRequest] = useState<DataRequest>({
        name: '',
        searchContent: globalDataRequest
    });

    const { data: exteriorColors } = useGetCommon({
        type: 'CAR_COLORS',
    });

    const mutation = useMutation((data: SaveBookmarkRequest) => saveBookmarkRequest(data));


    useEffect(() => {
        if (globalDataRequest) {
            const newData = {
                ...dataRequest,
                searchContent: globalDataRequest
            };
            setDataRequest(newData);
        }
    }, [globalDataRequest]);

    const handleGetOptions = (config: SearchField): CommonSelect[] => {
        // if (config.field === 'make') {
        //     return makeList?.data || []
        // }
        // if (config.field === 'model' && dataRequest.make) {
        //     return modelList?.data?.filter(item => item.makeCode === dataRequest.make) || [];
        // }
        if (config.field === 'transmission') {
            return transmissionTypes;
        }
        if (config.field === 'bodyStyle') {
            return bodyTypes;
        }
        if (config.field === 'useStatus') {
            return useStatus;
        }
        if (config.field === 'seats') {
            return seats;
        }
        if (config.field === 'exteriorColor') {
            return colors;
        }
        if (config.field === 'conversionPrice') {
            return priceList
        }
        if (config.field === 'fuelType') {
            return fuelType
        }
        return []
    }

    const renderRangeTagName = (config: SearchField): ReactElement => {
        if (config.field === 'conversionPrice') {
            const fromValueT = dataRequest.searchContent.conversionPrice.fromValueT ? parseFloat(dataRequest.searchContent.conversionPrice.fromValueT) * 1000000 : 0;
            const toValueT = dataRequest.searchContent.conversionPrice.toValueT ? parseFloat(dataRequest.searchContent.conversionPrice.toValueT) * 1000000 : 0;

            if (!fromValueT && !toValueT) {
                return <div></div>
            }
            if (fromValueT && !toValueT) {
                return (
                    <div className="common-select-item" key={`bookmark-button-${config.field}-from`}>
                        <span>{`Từ ${readVietnameseCurrency(fromValueT)}`}</span>
                    </div>
                )
            }
            if (!fromValueT && toValueT) {
                return (
                    <div className="common-select-item" key={`bookmark-button-${config.field}-to`}>
                        <span>{`Tối đa ${readVietnameseCurrency(toValueT)}`}</span>
                    </div>
                )
            }
            return (
                <div className="common-select-item" key={`bookmark-button-${config.field}-fom-to`}>
                    <span>{`${readVietnameseCurrency(fromValueT)} - ${readVietnameseCurrency(toValueT)}`}</span>
                </div>
            )
        }
        if (config.field === 'mileage') {
            return (
                <>
                    {dataRequest.searchContent.mileage.fromValueT && (
                        <div className="common-select-item" key={`bookmark-button-${config.field}-from-km`}>
                            <span>Từ {dataRequest.searchContent.mileage.fromValueT || '0'} Km</span>
                        </div>
                    )}
                    {dataRequest.searchContent.mileage.toValueT && (
                        <div className="common-select-item" key={`bookmark-button-${config.field}-to-km`}>
                            <span>Đến {dataRequest.searchContent.mileage.toValueT || '0'} Km</span>
                        </div>
                    )}
                </>
            )
        }
        return (
            <>
                {dataRequest.searchContent.buildDate.fromValueT && (
                    <div className="common-select-item" key={`bookmark-button-${config.field}-from-build-date`}>
                        <span>Từ đời {dataRequest.searchContent.buildDate.fromValueT || '0'}</span>
                    </div>
                )}
                {dataRequest.searchContent.buildDate.toValueT && (
                    <div className="common-select-item" key={`bookmark-button-${config.field}-to-build-date`}>
                        <span>Đến đời {dataRequest.searchContent.buildDate.toValueT || '0'} Km</span>
                    </div>
                )}
            </>
        )
    }

    const getTagNameSingleValue = (config: SearchField): string => {
        if (config.field === 'make') {
            const obj = makeList?.data.find(item => item.code === dataRequest.searchContent.make);
            return obj?.name || dataRequest.searchContent.make || '';
        }
        const data = handleGetOptions(config);
        const obj = data.find(item => item.value === dataRequest.searchContent[config.field as SingleValueField]);
        return obj?.label || dataRequest.searchContent[config.valueField as SingleValueField] || '';
    }

    const renderSpecificTagNameValue = (config: SearchField): ReactElement => {
        if (dataRequest?.searchContent?.make && config.field === 'model') {
            const data = modelList?.data.find(item => ((item.makeCode === dataRequest?.searchContent?.make) && (dataRequest.searchContent.model === item.code))) || null;
            if(data){
                return (
                    <div className="common-select-item" key={`bookmark-button-${config.field}-${data?.code}`}>
                        <span>{data?.name}</span>
                    </div>
                )
            }
        }
        if (config.field === 'exteriorColor') {
            const data = exteriorColors?.data.find(item => dataRequest.searchContent.exteriorColor === item.code);
            if(data){
                return (
                    <div className="common-select-item" key={`bookmark-button-${config.field}-${data?.code}`}>
                        <span>{data?.name}</span>
                    </div>
                )
            }
        }
        const data = handleGetOptions(config).find(item => dataRequest.searchContent[config.field as SingleValueField] === item.value);
        if (config.field === 'seats') {
            if(data){
                return (
                    <div className="common-select-item" key={`bookmark-button-${config.field}-${data?.value}`}>
                        <span>{data?.label} chỗ</span>
                    </div>
                )
            }

        }
        return <div></div>
    }

    const getProvinceName = () => {
        const obj = provinceList?.data?.find(item => item.provinceCode === dataRequest.searchContent.provinceCode);
        return obj?.provinceName || dataRequest.searchContent.provinceCode;
    }

    // const getDistrictName = () => {
    //     const obj = districtList?.data?.find(item => item.districtCode === dataRequest.searchContent.districtCode);
    //     return obj?.districtName || dataRequest.searchContent.districtCode;
    // }


    // const getSubDistrictName = () => {
    //     const obj = subDistrictList?.data?.find(item => item.subDistrictCode === dataRequest.searchContent.subDistrictCode);
    //     return obj?.subDistrictName || dataRequest.searchContent.subDistrictCode;
    // }


    const renderBookmarkData = (config: SearchField): ReactNode => {
        if (config.type === 'FROM_TO' && (dataRequest.searchContent[config.field as RangeField].fromValueT || dataRequest.searchContent[config.field as RangeField].toValueT)) {
            return renderRangeTagName(config)
        }
        if (config.field === 'provinceCode') {
            return (
                <>
                    {dataRequest.searchContent.provinceCode && (
                        <div className="common-select-item" key={`bookmark-button-${config.field}-province`}>
                            <span>{getProvinceName()}</span>
                        </div>
                    )}
                    {/* {dataRequest.searchContent.districtCode && (
                        <div className="common-select-item" key={`bookmark-button-${config.field}-district`}>
                            <span>{getDistrictName()}</span>
                        </div>
                    )}
                    {dataRequest.searchContent.subDistrictCode && (
                        <div className="common-select-item" key={`bookmark-button-${config.field}-subdistrict`}>
                            <span>{getSubDistrictName()}</span>
                        </div>
                    )} */}

                </>
            )
        }
        if (config.field === 'districtCode' || config.field === 'subDistrictCode') {
            return <div></div>;
        }
        if (config.type === 'SELECT' && (config.field === 'seats' || config.field === 'model' || config.field === 'exteriorColor')) {
            return renderSpecificTagNameValue(config);
        }
        if (config.type === 'SELECT' && !config.multiple && dataRequest.searchContent[config.field]) {
            return (
                <div className="common-select-item" key={`bookmark-button-${config.field}`}>
                    <span>{getTagNameSingleValue(config)}</span>
                </div>
            )
        }
        if (config.field === 'filter') {
            return (
                <div>
                    {dataRequest.searchContent.filter && (
                        <div className="common-select-item" key={`bookmark-button-${config.field}`}>
                            <span>{dataRequest.searchContent.filter}</span>
                        </div>
                    )}
                </div>
            )
        }
        return <div></div>
    }

    const handleUpdateDataRequest = (e: ChangeEvent<HTMLInputElement>): void => {
        const newData = {
            ...dataRequest,
            name: e.target.value,
        };
        return setDataRequest(newData);
    }

    const onOk = (): void => {
        if (!dataRequest.name) {
            return notify('Vui lòng nhập tên bộ lọc', 'error')
        }
        if (dataRequest?.name.length > 25) {
            return notify('Tên bộ lọc tối đa 25 ký tự', 'error')
        }
        const data = {
            ...dataRequest,
            searchContent: JSON.stringify(dataRequest.searchContent)
        }
        return mutation.mutate(data, {
            onSuccess: (res: (SaveBookmarkResponse & ErrorResponse)): void => {
                if (res?.status === 0) {
                    return notify(res?.errorMsg, 'error')
                }
                handleOk();
                setDataRequest({
                    ...dataRequest,
                    name: ''
                })
                return notify('Lưu bộ lọc thành công', 'success')
            },
            onError: () => notify('Có lỗi trong quá trình thực hiện', 'error'),
        });
    }

    return (
        <Modal title="Lưu bộ lọc" open={isModalOpen} okText='Lưu bộ lọc' okType='default' cancelText='Hủy bỏ' onOk={onOk} onCancel={handleCancel}>
            <div className="save-bookmark-container common-select-box">
                <div className="common-select-content">
                    {searchFields.map(item => renderBookmarkData(item))}
                </div>
                <div className="bookmark-name mt-4">
                    <div className="bookmark-name-title">
                        <span>Tên bộ lọc</span>
                    </div>
                    <div className="bookmark-name-input mt-2">
                        <Input className='h-12' value={dataRequest.name} maxLength={25} onChange={handleUpdateDataRequest} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
