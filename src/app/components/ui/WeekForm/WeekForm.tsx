import {Input} from "../../common/Input/Input";
import React, {ChangeEvent} from "react";
import {weekObjType} from "../../../../App";

interface WeekFormProps {
    daysOfWeek: weekObjType,
    everyDay: boolean,
    onDaysOfWeekChange: (e: ChangeEvent<HTMLInputElement>) => void
    onEveryDayChange: () => void
}

export const WeekForm = (props: WeekFormProps) => {
    const {
        daysOfWeek,
        onDaysOfWeekChange,
        everyDay,
        onEveryDayChange
    } = props;

    return (
        <>
            {Object.keys(daysOfWeek).map((day) => (
                <Input
                    id={day}
                    key={day + "week"}
                    label={day}
                    type="checkbox"
                    checked={daysOfWeek[day]}
                    onChange={onDaysOfWeekChange}
                />
            ))}
            <div>
                <Input
                    id="everyDay"
                    label="Every day"
                    type="checkbox"
                    checked={everyDay}
                    onChange={onEveryDayChange}
                />
            </div>
        </>
    );
};