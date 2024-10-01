import { FC } from "react"

import s from './BoardCounter.module.css'

type BoardCounterPropType = {
    startValue: number
    maxValue: number
    counter: number
    value: number | string
}

export const BoardCounter: FC<BoardCounterPropType> = ({ startValue, maxValue, counter, value }) => {
    const hasError = maxValue < startValue || startValue < 0 || maxValue === startValue;
    const isMaxValue = maxValue === counter

    const displayValue = hasError ? "Incorrect Value" : value;

    return (
        <div className={s.board}>
            <span className={`
            ${hasError ? s.error : s.textBoard}
            ${isMaxValue ? s.maxNumber : ' '}
        `}>
                {displayValue}
            </span>
        </div>
    )
}