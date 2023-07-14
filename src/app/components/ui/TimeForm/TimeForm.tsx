import {Input} from "../../common/Input/Input";
import React, {ChangeEvent} from "react";

interface TimeFormProps {
    oneTime: string;
    secondTime: string;
    onTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    needSecondTime: boolean;
    onChangeNeedSecondTime: () => void
}

export const TimeForm = (props: TimeFormProps) => {

    const {
        oneTime,
        secondTime,
        onTimeChange,
        needSecondTime,
        onChangeNeedSecondTime
    } = props;

    return (
        <>
            <Input
                id="oneTime"
                type="time"
                value={oneTime}
                onChange={onTimeChange}
            />
            <Input
                id="needSecondTime"
                label="second minutes value in hour"
                type="checkbox"
                checked={needSecondTime}
                onChange={onChangeNeedSecondTime}
            />
            {needSecondTime && <Input
                id="secondTime"
                type="number"
                value={secondTime}
                min={0}
                max={59}
                onChange={onTimeChange}
            />}
        </>
    );
};