import {ChangeEvent, FC} from 'react';
import {Input} from "../../common/Input/Input";
import {WeekForm} from "../WeekForm/WeekForm";
import {TimeForm} from "../TimeForm/TimeForm";
import {RepeatForm} from "../RepeatForm/RepeatForm";
import {DateForm} from "../DateForm/DateForm";
import cls from "./CronUI.module.css"
import {weekObjType} from "../../../../App";

interface CronUIPropsType {
    chooseRepeat: string,
    onRepeatTypeChange: (e: ChangeEvent<HTMLInputElement>) => void,

    dayOfMonth: number,
    lastDayOfMonth: boolean,
    onDayOfMonthChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onLastDayOfMonth: () => void,

    daysOfWeek: weekObjType,
    onDaysOfWeekChange: (e: ChangeEvent<HTMLInputElement>) => void,
    everyDay: boolean,
    onEveryDayChange: () => void,

    interval: number
    onIntervalChange: (e: ChangeEvent<HTMLInputElement>) => void,

    times: Record<string, string>
    onTimeChange: (e: ChangeEvent<HTMLInputElement>) => void,
    needSecondTime: boolean,
    onChangeNeedSecondTime: () => void,
}

export const CronUI:FC<CronUIPropsType> = (props) => {
    const {
        chooseRepeat,
        onRepeatTypeChange,

        dayOfMonth,
        lastDayOfMonth,
        onDayOfMonthChange,
        onLastDayOfMonth,

        daysOfWeek,
        onDaysOfWeekChange,
        everyDay,
        onEveryDayChange,

        interval,
        onIntervalChange,

        times,
        onTimeChange,
        needSecondTime,
        onChangeNeedSecondTime,
} = props


    return (
        <div className={cls.scheduleForm}>
            <form action="">
                {/*========DATE BLOCK========*/}
                <h3 className={cls.title}>Date</h3>

                {/*------monthly-------*/}
                <div className={cls.formBlock}>
                    <Input
                        id="dayOfMonth"
                        label="Day of month"
                        type="radio"
                        value="dayOfMonth"
                        checked={chooseRepeat === "dayOfMonth"}
                        onChange={onRepeatTypeChange}
                    />
                    {chooseRepeat === "dayOfMonth" &&
                        <DateForm dayOfMonth={dayOfMonth}
                                  isLastDayOfMonth={lastDayOfMonth}
                                  onDayOfMonthChange={onDayOfMonthChange}
                                  setLastDayOfMonth={onLastDayOfMonth}
                        />}
                </div>

                {/*------weekly-------*/}
                <div  className={cls.formBlock}>
                    <Input
                        id="dayOfWeek"
                        label="Day of week"
                        type="radio"
                        value="dayOfWeek"
                        checked={chooseRepeat === "dayOfWeek"}
                        onChange={onRepeatTypeChange}
                    />
                    {chooseRepeat === "dayOfWeek" &&
                        <WeekForm daysOfWeek={daysOfWeek}
                                  onDaysOfWeekChange={onDaysOfWeekChange}
                                  everyDay={everyDay}
                                  onEveryDayChange={onEveryDayChange}
                        />}
                </div>


                {/*------repeat-------*/}
                <div className={cls.formBlock}>
                    <Input
                        id="every"
                        label="every X minutes"
                        type="radio"
                        value="every"
                        checked={chooseRepeat === "every"}
                        onChange={onRepeatTypeChange}
                    />
                    {chooseRepeat === "every" &&
                        <RepeatForm
                            interval={interval}
                            onIntervalChange={onIntervalChange}
                        />}
                </div>

                {/*========TIME BLOCK========*/}
                {chooseRepeat !== "every" &&
                    <>
                        <h3 className={cls.title}>Time</h3>
                        <div  className={cls.formBlock}>
                            <div>Choose time</div>
                            <TimeForm
                                oneTime={times.oneTime}
                                secondTime={times.secondTime}
                                onTimeChange={onTimeChange}
                                needSecondTime={needSecondTime}
                                onChangeNeedSecondTime={onChangeNeedSecondTime}
                            />
                        </div>
                    </>}
            </form>
        </div>
    );
}
