import React, { InputHTMLAttributes, } from "react"

import s from './Input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
};

export const Input: React.FC<InputProps> = ({ error, ...props }) => {
    return (
        <input className={`${s.input} ${error ? s.error : ''}`}{...props} />
    )
}