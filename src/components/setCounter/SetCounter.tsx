import { ChangeEvent, FC, useState, useEffect } from "react";

import { Input } from "../input/Input";
import s from './SetCounter.module.css';

type SetCounterProps = {
    counter: number;
    maxValue: number;
    setMaxValue: (value: number) => void;
    setCounter: (value: number) => void;
};

export const SetCounter: FC<SetCounterProps> = ({
    counter,
    maxValue,
    setMaxValue,
    setCounter
}) => {
    const getInitialState = (key: string) => {
        const savedValue = localStorage.getItem(key);
        return savedValue ? JSON.parse(savedValue) : false;
    };

    const [counterError, setCounterError] = useState(() => getInitialState('counterError'));
    const [maxValueError, setMaxValueError] = useState(() => getInitialState('maxValueError'));

    const isMaxValueError = (max: number, start: number) => max < start || max < 0;
    const isCounterError = (start: number, max: number) => start > max || start < 0;
    const areValuesEqual = (start: number, max: number) => start === max;

    const updateErrors = () => {
        const equalValues = areValuesEqual(counter, maxValue);
        const newMaxValueError = isMaxValueError(maxValue, counter) || equalValues;
        const newCounterError = isCounterError(counter, maxValue) || equalValues;

        setMaxValueError(newMaxValueError);
        setCounterError(newCounterError);
    };

    const handleMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(Number(e.currentTarget.value));
    };

    const handleCounterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCounter(Number(e.currentTarget.value));
    };

    useEffect(() => {
        localStorage.setItem('counterError', JSON.stringify(counterError));
        localStorage.setItem('maxValueError', JSON.stringify(maxValueError));
    }, [counterError, maxValueError]);

    useEffect(() => {
        updateErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter, maxValue]);

    return (
        <div className={s.board}>
            <div className={s.setContainer}>
                <span>max value: </span>
                <Input
                    type="number"
                    value={maxValue}
                    onChange={handleMaxValueChange}
                    error={maxValueError}
                />
            </div>

            <div className={s.setContainer}>
                <span>start value: </span>
                <Input
                    type="number"
                    value={counter}
                    onChange={handleCounterChange}
                    error={counterError}
                />
            </div>
        </div>
    );
};