import { ItemSlider } from "./type";

export const sliderField: ItemSlider[] = [
    {
        serial: 1,
        textDescription: 'Số tiền vay là',
        unit: 'VND',
        fromValueSlider: 100000000,
        toValueSilder: 10000000000,
        maxValueInput: 500000000000,
        textFromValue: '100 triệu',
        textToValue: '10 tỉ',
        step: 1,
        field: 'Số tiền vay',
        class: "amount-loan  text-base"
    },
    {
        serial: 2,
        textDescription: 'Lãi suất',
        unit: '%',
        fromValueSlider: 0,
        toValueSilder: 20,
        maxValueInput: 100,
        textFromValue: '1%',
        textToValue: '20%',
        step: 1,
        field: 'Lãi suất',
        class: "interest-rate  text-base"

    },
    {
        serial: 3,
        textDescription: 'Thời gian vay',
        unit: 'tháng',
        fromValueSlider: 0,
        toValueSilder: 300,
        maxValueInput: 400,
        textFromValue: '1 tháng',
        textToValue: '300 tháng',
        step: 1,
        field: '',
        class: "amount-month text-base"
    },
];