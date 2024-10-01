import { ChangeEvent, FC, useState, useEffect } from "react";
import { Input } from "../input/Input";

import s from './SetCounter.module.css';

type SetCounterPropType = {
    startValue: number;
    maxValue: number;
    setMaxValue: (value: number) => void;
    setStartValue: (value: number) => void;
};

export const SetCounter: FC<SetCounterPropType> = ({
    startValue,
    maxValue,
    setMaxValue,
    setStartValue
}) => {
    const [startValueError, setStartValueError] = useState(() => {
        const savedError = localStorage.getItem('startValueError');
        return savedError ? JSON.parse(savedError) : false;
    });

    const [maxValueError, setMaxValueError] = useState(() => {
        const savedError = localStorage.getItem('maxValueError');
        return savedError ? JSON.parse(savedError) : false;
    });

    useEffect(() => {
        localStorage.setItem('startValueError', JSON.stringify(startValueError));
    }, [startValueError]);

    useEffect(() => {
        localStorage.setItem('maxValueError', JSON.stringify(maxValueError));
    }, [maxValueError]);

    const checkMaxValueError = (max: number, start: number) => {
        return max < start || max < 0;
    };

    const checkStartValueError = (start: number, max: number) => {
        return start > max || start < 0;
    };

    const checkEqualValues = (start: number, max: number) => {
        return start === max;
    };

    useEffect(() => {
        const areEqual = checkEqualValues(startValue, maxValue);
        setMaxValueError(checkMaxValueError(maxValue, startValue) || areEqual);
        setStartValueError(checkStartValueError(startValue, maxValue) || areEqual);
    }, [startValue, maxValue]);

    const maxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = Number(e.currentTarget.value);
        setMaxValue(newMaxValue);
        const areEqual = checkEqualValues(startValue, newMaxValue);
        setMaxValueError(checkMaxValueError(newMaxValue, startValue) || areEqual);
        setStartValueError(areEqual);
    };

    const startValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newStartValue = Number(e.currentTarget.value);
        setStartValue(newStartValue);
        const areEqual = checkEqualValues(newStartValue, maxValue);
        setStartValueError(checkStartValueError(newStartValue, maxValue) || areEqual);
        setMaxValueError(areEqual);
    };

    return (
        <div className={s.board}>
            <div className={s.setContainer}>
                <span>max value: </span>
                <Input
                    type="number"
                    value={maxValue}
                    onChange={maxValueChange}
                    error={maxValueError}
                />
            </div>

            <div className={s.setContainer}>
                <span>start value: </span>
                <Input
                    type="number"
                    value={startValue}
                    onChange={startValueChange}
                    error={startValueError}
                />
            </div>
        </div>
    );
};