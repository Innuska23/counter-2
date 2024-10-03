import { ChangeEvent, FC, useState, useEffect } from "react";
import { Input } from "../input/Input";

import s from './SetCounter.module.css';

type SetCounterPropType = {
    counter: number;
    maxValue: number;
    setMaxValue: (value: number) => void;
    setCounter: (value: number) => void;
};

export const SetCounter: FC<SetCounterPropType> = ({
    counter,
    maxValue,
    setMaxValue,
    setCounter
}) => {
    const [counterError, setСounterError] = useState(() => {
        const savedError = localStorage.getItem('counterError');
        return savedError ? JSON.parse(savedError) : false;
    });

    const [maxValueError, setMaxValueError] = useState(() => {
        const savedError = localStorage.getItem('maxValueError');
        return savedError ? JSON.parse(savedError) : false;
    });

    const maxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        return setMaxValue(Number(e.currentTarget.value));
    }

    const counterChange = (e: ChangeEvent<HTMLInputElement>) => {
        return setCounter(Number(e.currentTarget.value));
    }

    useEffect(() => {
        localStorage.setItem('counterError', JSON.stringify(counterError));
        localStorage.setItem('maxValueError', JSON.stringify(maxValueError));
    }, [counterError, maxValueError]);

    useEffect(() => {
        const equalValues = checkEqualValues(counter, maxValue);
        setMaxValueError(checkMaxValueError(maxValue, counter) || equalValues);
        setСounterError(checkСounterError(counter, maxValue) || equalValues);
    }, [counter, maxValue]);

    const checkMaxValueError = (max: number, start: number) => {
        return max < start || max < 0;
    };

    const checkСounterError = (start: number, max: number) => {
        return start > max || start < 0;
    };

    const checkEqualValues = (start: number, max: number) => {
        return start === max;
    };

    useEffect(() => {
        const areEqual = checkEqualValues(counter, maxValue);
        setMaxValueError(checkMaxValueError(maxValue, counter) || areEqual);
        setСounterError(checkСounterError(counter, maxValue) || areEqual);
    }, [counter, maxValue]);

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
                    value={counter}
                    onChange={counterChange}
                    error={counterError}
                />
            </div>
        </div>
    );
};