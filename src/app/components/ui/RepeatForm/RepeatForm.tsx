import {Input} from "../../common/Input/Input";
import React, {ChangeEvent} from "react";

interface RepeatFormProps {
    interval: number,
    onIntervalChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const RepeatForm = (props: RepeatFormProps) => {

    const {
        interval,
        onIntervalChange
    } = props;

    return (
        <>
            <Input
                id="secondTime"
                type="number"
                value={interval.toString()}
                min={0}
                max={59}
                onChange={onIntervalChange}
            />
        </>
    );
};