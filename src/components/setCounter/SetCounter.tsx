import { ChangeEvent, FC, useState, useEffect } from "react";

import { Input } from "../input/Input";
import s from './SetCounter.module.css';

type SetCounterProps = {
    counter: number;
    maxValue: number;
    setMaxValue: (value: number) => void;
    setCounter: (value: number) => void;
};

const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [value, setValue] = useState<T>(() => {
        const savedValue = localStorage.getItem(key);
        return savedValue ? JSON.parse(savedValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
};

export const SetCounter: FC<SetCounterProps> = ({
    counter,
    maxValue,
    setMaxValue,
    setCounter
}) => {

    const [counterError, setCounterError] = useLocalStorage('counterError', false);
    const [maxValueError, setMaxValueError] = useLocalStorage('maxValueError', false);

    const isMaxValueError = (max: number, start: number) => max < start || max < 0;
    const isCounterError = (start: number, max: number) => start > max || start < 0;
    const areValuesEqual = (start: number, max: number) => start === max;

    const handleMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = Number(e.currentTarget.value);
        setMaxValue(newMaxValue);
        updateErrors(counter, newMaxValue);
    };

    const handleCounterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newCounter = Number(e.currentTarget.value);
        setCounter(newCounter);
        updateErrors(newCounter, maxValue);
    };

    const updateErrors = (currentCounter: number, currentMaxValue: number) => {
        const equalValues = areValuesEqual(currentCounter, currentMaxValue);
        setMaxValueError(isMaxValueError(currentMaxValue, currentCounter) || equalValues);
        setCounterError(isCounterError(currentCounter, currentMaxValue) || equalValues);
    };

    useEffect(() => {
        updateErrors(counter, maxValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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