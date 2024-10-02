import { FC } from "react"

import s from './BoardCounter.module.css'

type BoardCounterPropType = {
    startValue: number
    maxValue: number
    counter: number
    value: number | string
}

export const BoardCounter: FC<BoardCounterPropType> = ({
    startValue,
    maxValue,
    counter,
    value }) => {

    const hasError = maxValue < startValue || startValue < 0 || maxValue === startValue
    const isMaxValue = maxValue === counter && !hasError;

    const displayValue = hasError ? "Incorrect Value" : value;
    const styles = `${hasError ? s.error : ''}
                    ${typeof displayValue === 'number' ? s.number : s.text}
                    ${isMaxValue}`

    return (
        <div className={s.board}>
            <span className={styles}>
                {displayValue}
            </span>
        </div>
    )
}

