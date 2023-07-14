import React, {ChangeEvent} from "react";
import {Input} from "../../common/Input/Input";

interface DateFormProps {
    dayOfMonth: number;
    isLastDayOfMonth: boolean;
    onDayOfMonthChange: (e: ChangeEvent<HTMLInputElement>) => void
    setLastDayOfMonth: () => void
}

export const DateForm = (props: DateFormProps) => {

    const {
        dayOfMonth,
        isLastDayOfMonth,
        onDayOfMonthChange,
        setLastDayOfMonth
    } = props;

    return (
        <>
            <Input
                id="dayOfMonthSelect"
                label="Choose day of month"
                type="number"
                min={1}
                max={30}
                disabled={isLastDayOfMonth}
                value={dayOfMonth.toString()}
                onChange={onDayOfMonthChange}
            />
            <div>
                <Input
                    id="lastDayOfMonth"
                    label="Last day of month?"
                    type="checkbox"
                    checked={isLastDayOfMonth}
                    onChange={setLastDayOfMonth}
                />
            </div>
        </>
    );
};