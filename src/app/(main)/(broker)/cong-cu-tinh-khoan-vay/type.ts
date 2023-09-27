export type ItemSlider = {
    serial: number,
    textDescription: string,
    unit: string,
    fromValueSlider: number,
    toValueSilder: number,
    maxValueInput: number,
    textFromValue: string,
    textToValue: string,
    step: number,
    field: string,
    class: string
}

export type CurrentData = {
    endingBalance: number
    interestPayment: number
    month: number
    principlePayment: number
    totalPayment: number
}

export type LoanAmount = {
    silder: number ,
    input: number,
}

export type InterestRate = {
    silder: number ,
    input: number,
}

export type LoanTerm = {
    silder: number ,
    input: number,
}

