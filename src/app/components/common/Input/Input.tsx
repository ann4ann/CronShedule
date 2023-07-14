import React, {ChangeEvent} from "react";
import cls from "./input.module.css"

interface InputProps {
    id: string;
    label?: string;
    type?: string;
    checked?: boolean;
    value?: string;
    min?: number | string;
    max?: number | string;
    disabled?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = (props: InputProps) => {
    const {
        id,
        label = "",
        checked = false,
        type = "text",
        value = "",
        min = 1,
        max = 1,
        disabled = false,
        onChange
    } = props;

    return (
        <div className={cls.inputBlock}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={type === "checkbox"
                    ? ""
                    : type === "radio"
                        ? id
                        : value}
                checked={checked}
                min={min}
                max={max}
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    );
};