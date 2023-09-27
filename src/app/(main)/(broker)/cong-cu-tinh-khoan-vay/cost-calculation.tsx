'use client'

import './index.css'

import {  InputNumber, Pagination, Slider } from 'antd';
import { isEmpty, isNaN } from 'lodash';
import React, { ReactNode, useEffect, useState } from 'react';

import { sliderField } from './constants';
import { CurrentData, InterestRate, ItemSlider, LoanAmount, LoanTerm } from './type';



export default function CostCalculation() {
    const [loanAmount, setLoanAmount] = useState<LoanAmount>({
        silder: 0,
        input: 0,
    }); // tổng số tiền cần vay

    const [interestRate, setInterestRate] = useState<InterestRate>({
        silder: 0,
        input: 0,
    }); // số lãi xuất

    const [loanTerm, setLoanTerm] = useState<LoanTerm>({
        silder: 0,
        input: 0,
    }); // tháng vay

    const [totalInterest, setTotalInterest] = useState<number>(0);

    const [formOfLoan, setFormOfLoan] = useState<number>(1); // hình thức vay
    const [listTotalPayment, setListTotalPayment] = useState<CurrentData[]>([]); // danh sach tien lai theo ki

    const totalLoanAndInterest = (): number => {
        const loan = loanAmount.input || 0;
        const yearInterestRate = Number(interestRate.input) / 100; // Lai phai tra theo nam
        const remainingAmount = loanAmount.input || 0;
        const amountMonth = loanTerm.input || 0;

        if (yearInterestRate > 0 && remainingAmount > 0 && amountMonth > 0) {
            const totalLoan = loan + totalInterest;
            return totalLoan;
        }
        return 0;
    };

    const handleSetValueSlider = (valueInput: number, valueSlider: number, item: ItemSlider): void => {
        if (item.field === 'Số tiền vay') {
            return setLoanAmount({
                ...loanAmount,
                input: valueInput,
                silder: valueSlider,
            });
        }
        if (item.field === 'Lãi suất') {
            return setInterestRate({
                ...interestRate,
                input: valueInput,
                silder: valueSlider,
            });
        }
        return setLoanTerm({
            ...loanTerm,
            input: valueInput,
            silder: valueSlider,
        });
    };

    const handleInputChange = (value: number | null, item: ItemSlider): void => {
        // Kiểm tra giá trị có hợp lệ
        if (value && !isNaN(value) && value <= item.maxValueInput) {
            // Cập nhật state và hiển thị giá trị đã định dạng
            if (value >= item.toValueSilder) {
                handleSetValueSlider(value, item.toValueSilder, item);
            } else {
                handleSetValueSlider(value, value, item);
            }
        } else if (value && !isNaN(value) && value > item.maxValueInput) {
            // Nếu giá trị lớn hơn giá trị tối đa thì set về giá trị tối đa
            handleSetValueSlider(item.maxValueInput, item.toValueSilder, item);
        } else {
            handleSetValueSlider(0, 0, item);
        }
    };

    const onChangeSilder = (newValue: number, item: ItemSlider): void => {
        handleSetValueSlider(newValue, newValue, item);
    };
    const formatTooltipValue = (value: number | undefined): string | number => {
        if (value) {
            return value.toLocaleString('en-US');
        }
        return 0;
    };
    const handleGetValueInput = (item: ItemSlider): number => {
        if (item.field === 'Số tiền vay') {
            return loanAmount.input;
        }
        if (item.field === 'Lãi suất') {
            return interestRate.input;
        }
        return loanTerm.input;
    };
    const handleGetValueSilder = (item: ItemSlider): number => {
        if (item.field === 'Số tiền vay') {
            return loanAmount.silder;
        }
        if (item.field === 'Lãi suất') {
            return interestRate.silder;
        }
        return loanTerm.silder;
    };
    
    const markSlider = (item: ItemSlider): Record<string | number, ReactNode> => ({
        [item.fromValueSlider]: item.textFromValue,
        [item.toValueSilder]: item.textToValue,
    });

    const calculatePayments = (): void => {
        const yearInterestRate = Number(interestRate.input) / 100; // Lai phai tra theo nam
        const listTotalPayments = []; // danh sach so tien phai tra theo ki han
        const remainingAmount = loanAmount.input;
        // so tien goc
        let totalInterestTerm = 0; // tổng lãi theo kì

        const amountMonth = loanTerm.input;

        if (
            formOfLoan === 1 &&
            yearInterestRate > 0 &&
            remainingAmount > 0 &&
            amountMonth > 0
        ) {
            // goc co dinh, lai giam dan
            let interestPayment = 0; // lai phai tra
            let endingBalance = remainingAmount; // so tien con lai
            const principlePayment = Math.round(remainingAmount / amountMonth); // goc phai tra
            let totalPayment = 0; // so tien phai tra
            // eslint-disable-next-line no-plusplus
            for (let month = 1; month <= amountMonth; month++) {
                interestPayment = Math.round((endingBalance * yearInterestRate) / 12);
                totalPayment = Math.round(interestPayment + principlePayment);
                endingBalance -= principlePayment;

                totalInterestTerm += interestPayment;
                if (endingBalance <= 1000) {
                    endingBalance = 0;
                }
                listTotalPayments.push({
                    month,
                    interestPayment,
                    principlePayment,
                    totalPayment,
                    endingBalance,
                });
            }
        } else if (yearInterestRate > 0 && remainingAmount > 0 && amountMonth > 0) {
            let interestPayment = 0; // lai phai tra
            let endingBalance = remainingAmount; // so tien con lai
            let principlePayment = 0; // goc phai tra
            const totalPayment = Math.round(
                (remainingAmount *
                    (yearInterestRate / 12) *
                    (1 + yearInterestRate / 12) ** amountMonth) /
                ((1 + yearInterestRate / 12) ** amountMonth - 1),
            ); // so tien phai tra
            // eslint-disable-next-line no-plusplus
            for (let month = 1; month <= amountMonth; month++) {
                interestPayment = Math.round((endingBalance * yearInterestRate) / 12);
                principlePayment = Math.round(totalPayment - interestPayment);
                endingBalance -= principlePayment;

                totalInterestTerm += interestPayment;
                if (endingBalance <= 1000) {
                    endingBalance = 0;
                }
                listTotalPayments.push({
                    month,
                    interestPayment,
                    principlePayment,
                    totalPayment,
                    endingBalance,
                });
            }
        }
        setTotalInterest(totalInterestTerm);
        return setListTotalPayment(listTotalPayments);
    };

    // xu li phan trang bang o day
    const [pageValue, setPageValue] = useState<number>(1);
    const totalElement = loanTerm.input;

    // Tính toán chỉ mục bắt đầu và kết thúc của mảng dữ liệu hiển thị trên trang hiện tại
    const startIndex = (pageValue - 1) * 12;
    const endIndex = startIndex + 12;
    const currentData: CurrentData[] = listTotalPayment.slice(startIndex, endIndex);

    const onChangePage = (page: number): void => {
        setPageValue(page);
    };

    const paginationRender = (_: string | number, type: string, originalElemnent: ReactNode): React.JSX.Element | ReactNode => {
        if (type === 'prev') {
            return <a>{'< Trang trước'}</a>;
        }
        if (type === 'next') {
            return <a>{'Trang sau >'}</a>;
        }
        return originalElemnent;
    };

    useEffect(() => {
        setPageValue(1);
        calculatePayments();
    }, [loanAmount.input, loanTerm.input, interestRate.input, formOfLoan]);

    return (
            <div className=" lendingRate mb-5 bg-white">
                <h1 className="title-page">
                    Công cụ tính khoản vay
                </h1>
                <div className="grid grid-cols-12 mt-6">
                    <div className="caculation-tool ">
                        {sliderField.map(item => (
                            <div className="slider-lending-rate" key={item.field}>
                                <p className="text-lg mb-3 flex items-center">
                                    <span>{item.serial}</span> {item.textDescription}{' '}
                                    <InputNumber
                                        max={item.maxValueInput}
                                        min={0}
                                        formatter={value =>
                                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        }
                                        parser={value => Number(value?.replace(/\$\s?|(,*)/g, ''))}
                                        value={handleGetValueInput(item)}
                                        onChange={e => handleInputChange(e, item)}
                                        className="input-value text-lg font-bold"
                                        size="large"
                                        controls={false}
                                        bordered={false}
                                    />{' '}
                                    {item.unit}
                                </p>
                                <Slider
                                    min={item.fromValueSlider}
                                    max={item.toValueSilder}
                                    step={item.step}
                                    marks={markSlider(item)}
                                    value={handleGetValueSilder(item)}
                                    onChange={value => onChangeSilder(value, item)}
                                    tooltipPlacement="bottom"
                                    tipFormatter={value => formatTooltipValue(value)}
                                    trackStyle={{ backgroundColor: '#FC792F', height: 10 }}
                                    railStyle={{ backgroundColor: '#e0e0e0', height: 10 }}
                                    handleStyle={{
                                        backgroundColor: '#FC792F',
                                        border: '2px solid white',
                                        height: 30,
                                        width: 30,
                                        borderRadius: '50%',
                                    }}
                                    className={item.class}
                                />
                            </div>
                        ))}
                        <div className="slider-lending-rate">
                            <p className="text-lg mb-3">
                                <span>4</span> Phương thức trả lãi
                            </p>
                            <div className=" form-radio-loan">
                                <label className="radio-label mr-5 text-base">
                                    <input
                                        type="radio"
                                        value={1}
                                        checked={formOfLoan === 1}
                                        onChange={() => setFormOfLoan(1)}
                                    />
                                    Gốc cố định, lãi giảm dần
                                </label>
                                <label className="radio-label text-base">
                                    <input
                                        type="radio"
                                        value={2}
                                        checked={formOfLoan === 2}
                                        onChange={() => setFormOfLoan(2)}
                                    />
                                    Gốc lãi chia đều hàng tháng
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="show-lending-rate ">
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="title-lending-rate text-lg">
                                    Số tiền phải trả tháng đầu
                                </p>
                                <p className="value-lending-rate text-3xl">
                                    {(listTotalPayment.length > 0 && listTotalPayment[0]?.totalPayment?.toLocaleString('en-US')) ||
                                        0}{' '}
                                    VND
                                </p>
                            </div>
                            <div>
                                <p className="title-lending-rate text-lg">Tổng lãi phải trả</p>
                                <p className="value-lending-rate text-3xl">
                                    {totalInterest.toLocaleString('en-US')} VND
                                </p>
                            </div>
                            <div>
                                <p className="title-lending-rate text-lg">
                                    Tổng số tiền gốc và lãi phải trả
                                </p>
                                <p className="value-lending-rate text-3xl">
                                    {totalLoanAndInterest().toLocaleString('en-US')} VND
                                </p>
                            </div>
                        </div>
                        <div />
                    </div>
                </div>

                {!isEmpty(currentData) ? (
                    <div className="view-table">
                        <h1 className="result-title">
                            Kết quả lãi vay
                        </h1>
                        <div className="style-view">
                            <div className="type-view-table">
                                <table className="table">
                                    <thead>
                                        <th className="text-xl text-left">
                                            Kỳ hạn
                                        </th>
                                        <th className="text-xl text-right">
                                            Lãi phải trả
                                        </th>
                                        <th className="text-xl text-right">
                                            Gốc phải trả
                                        </th>
                                        <th className="text-xl text-right">
                                            Số tiền phải trả
                                        </th>
                                        <th className="text-xl text-right">
                                            Số tiền còn lại
                                        </th>
                                    </thead>
                                    <tbody >
                                        {!isEmpty(currentData)
                                            ? currentData.map(item => (
                                                <tr key={item.month} className='table-item'>
                                                    <td className="loan-term-title">
                                                        <div className="table-label">
                                                            <span>Kì hạn</span>
                                                        </div>
                                                        <div className="table-content row-left">
                                                            <span>{item.month}</span>
                                                        </div>
                                                    </td>
                                                    <td className="">
                                                        <div className="table-label">
                                                            <span>Lãi phải trả</span>
                                                        </div>
                                                        <div
                                                            className="table-content flex justify-end"
                                                        >
                                                            <span>
                                                                {item.interestPayment.toLocaleString('en-US')}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="">
                                                        <div className="table-label">
                                                            <span>Gốc phải trả</span>
                                                        </div>
                                                        <div
                                                            className="table-content flex justify-end"
                                                        >
                                                            <span>
                                                                {item.principlePayment.toLocaleString(
                                                                    'en-US',
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="">
                                                        <div className="table-label">
                                                            <span> Số tiền còn lại</span>
                                                        </div>
                                                        <div
                                                            className="table-content flex justify-end"
                                                        >
                                                            <span>
                                                                {item.totalPayment.toLocaleString('en-US')}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="">
                                                        <div className="table-label">
                                                            <span>Số tiền còn lại</span>
                                                        </div>
                                                        <div
                                                            className="table-content flex justify-end"
                                                        >
                                                            <span>
                                                                {item.endingBalance.toLocaleString('en-US')}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            : ''}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagination mb-3 mt-2">
                                <Pagination
                                    total={totalElement}
                                    current={pageValue}
                                    onChange={onChangePage}
                                    size="small"
                                    responsive
                                    defaultPageSize={12}
                                    pageSize={12}
                                    showSizeChanger={false}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    itemRender={paginationRender}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}

                <div className="text-lg note">
                    <p>Lưu ý:</p>
                    <ul>
                        <li>
                            Số tiền phải trả được tạm tính dựa trên lãi suất tại thời điểm
                            tính. Lãi suất có thể thay đổi vào thời điểm nộp hồ sơ.
                        </li>
                        <li>Công cụ tính toán trên Caar chỉ mang tính chất tham khảo.</li>
                    </ul>
                </div>
            </div>
    );
}
