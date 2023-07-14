import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {convertDataToCron, convertStringToData, cronObjType} from "./app/utils/convertDataToCron";
import {CronUI} from "./app/components/ui/CronUi/CronUi";
import {Input} from "./app/components/common/Input/Input";

export type weekObjType = Record<string, boolean>

function App() {
  const [chooseRepeat, setChooseRepeat] = useState<string>("dayOfMonth")
  const onRepeatTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setChooseRepeat(value)
  }

  const [cronObj, setCronObj] = useState<cronObjType>({
    minute: "0",
    hour: "0",
    dayOfMonth: "?",
    month: "0",
    dayOfWeek: "?"
})

  // MONTHLY
  const [dayOfMonth, setDayOfMonth] = useState<number>(0)
  const [lastDayOfMonth, setLastDayOfMonth] = useState<boolean>(false)
  const onDayOfMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
      setDayOfMonth(Number(e.currentTarget.value))
  }
  const onLastDayOfMonth = () => {
    setLastDayOfMonth(!lastDayOfMonth)
    setInterval(0)
  }
  useEffect(() => {
    const day = lastDayOfMonth
        ? "L"
        : dayOfMonth.toString()
    setCronObj(prevState => ({
      ...prevState,
      dayOfMonth: day,
      month: "*",
      dayOfWeek: "?"
    }))
  }, [dayOfMonth, lastDayOfMonth])

  // WEEKLY
  const noOneDay = {
    "SUN": false,
    "MON": false,
    "TUE": false,
    "WED": false,
    "THU": false,
    "FRI": false,
    "SAT": false
  }
  const [daysOfWeek, setDaysOfWeek] = useState<weekObjType>(noOneDay)
  const [everyDay, setEveryDay] = useState<boolean>(false)
  const onDaysOfWeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.id) {
      const day = e.currentTarget.id
      setDaysOfWeek(prevState => ({
        ...prevState,
        [day]: !prevState[day]
      }))
      setInterval(0)
    }
  }
  const onEveryDayChange = () => {
    setEveryDay(!everyDay)
    setDaysOfWeek({
      "SUN": !everyDay,
      "MON": !everyDay,
      "TUE": !everyDay,
      "WED": !everyDay,
      "THU": !everyDay,
      "FRI": !everyDay,
      "SAT": !everyDay
    })
  }
  useEffect(() => {
    if (everyDay) {
      setCronObj(prevState => ({
        ...prevState,
        dayOfMonth: "?",
        month: "*",
        dayOfWeek: "*"
      }))
    } else {
      const daysStr = Object.values(daysOfWeek)
          .map((value, index) => value ? index : undefined)
          .filter(item => item !== undefined)
          .join(",")
      setCronObj(prevState => ({
        ...prevState,
        dayOfMonth: "?",
        month: "*",
        dayOfWeek: daysStr
      }))
    }
  }, [daysOfWeek, everyDay])

  // ONE OR FEW TIMES
  const [times, setTimes] = useState<Record<string, string>>({
    oneTime: "00:00",
    secondTime: "0"
  })
  const onTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
      const {id: timeName, value: time} = e.currentTarget
      setTimes(prevState => ({
        ...prevState,
        [timeName]: time
      }))
    console.log(time, "time")
  }
  const [needSecondTime, setNeedSecondTime] = useState<boolean>(false)
  const onChangeNeedSecondTime = () => {
      setNeedSecondTime(!needSecondTime)
      if (needSecondTime) {
        setTimes(prevState => ({
          ...prevState,
          secondTime: "0"
        }))
      }
  }
  useEffect(() => {
    const minutesStr = times.secondTime !== "0"
        ? `${times.oneTime.split(":")[1]},${times.secondTime}`
        : times.oneTime.split(":")[1]

    setCronObj(prevState => ({
      ...prevState,
      hour: times.oneTime.split(":")[0],
      minute: minutesStr
    }))
  }, [times])

  // INTERVAL
  const [interval, setInterval] = useState<number>(0)
  const onIntervalChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setInterval(Number(value))
  }
  useEffect(() => {
    const minuteValue = interval === 0
        ? "0"
        : `0/${interval}`
    const hourValue = interval === 0
        ? "0"
        : "*"
    setCronObj(prevState => ({
      ...prevState,
      minute: minuteValue,
      hour: hourValue,
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: "*"
    }))
  }, [interval])

  // SAVE/LOAD
  const handleSave = () => {
      setCronChecker(convertDataToCron(cronObj))
    console.log(cronObj)
  }
  const [cronChecker, setCronChecker] = useState<string>("")
  const [loadError, setLoadError] = useState<boolean>(false)
  const onCronChecker = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setCronChecker(value)
  }
  const handleLoad = () => {
    setLoadError(false)
    let oneTime = "00:00"
    let secondTime = "0"
    if (cronChecker) {
      const cronCheckerRes = convertStringToData(cronChecker)
      if (typeof cronCheckerRes === "string") {
        setLoadError(true)
      } else {
        const doMonth = Number(cronCheckerRes.dayOfMonth)
        if (cronCheckerRes.dayOfMonth === "L") {
          setLastDayOfMonth(true)
        } else if (doMonth > 0 && doMonth < 31) {
          console.log("dom", doMonth)
          setDayOfMonth(doMonth)
          setLastDayOfMonth(false)
          setChooseRepeat("dayOfMonth")

        }
        const dayOfWeek = cronCheckerRes.dayOfWeek
        if (dayOfWeek === "*") {
          setEveryDay(true)
          setChooseRepeat("dayOfWeek")
        }
        const doWeekArr = dayOfWeek.split(",")
        if (doWeekArr.length < 7) {
          setChooseRepeat("dayOfWeek")
          setDaysOfWeek(noOneDay)
          doWeekArr.forEach(item => {
            setDaysOfWeek(prevState => ({
              "SUN": item === "0" || prevState.SUN,
              "MON": item === "1" || prevState.MON,
              "TUE": item === "2" || prevState.TUE,
              "WED": item === "3" || prevState.WED,
              "THU": item === "4" || prevState.THU,
              "FRI": item === "5" || prevState.FRI,
              "SAT": item === "6" || prevState.SAT
            }))
          })
        }

        const minuteInterval = cronCheckerRes.minute.split("/")[1]
        if (minuteInterval) {
          setInterval(Number(minuteInterval))
          setChooseRepeat("every")
        }
        const minuteRepeatArr = cronCheckerRes.minute.split(",")
        const formattedHour = cronCheckerRes.hour.length === 1
          ? `0${cronCheckerRes.hour}`
          : cronCheckerRes.hour
        const formattedMinute = minuteRepeatArr[0].length === 1
          ? `0${minuteRepeatArr[0]}`
          : minuteRepeatArr[0]
        oneTime = `${formattedHour}:${formattedMinute}`
        if (minuteRepeatArr[1]) {
          secondTime = minuteRepeatArr[1]
        }
        setTimes({
          oneTime: oneTime,
          secondTime: secondTime
        })
      }
    }
  }

  return (
    <div className="App">
      <CronUI
          chooseRepeat={chooseRepeat}
          onRepeatTypeChange={onRepeatTypeChange}

          dayOfMonth={dayOfMonth}
          lastDayOfMonth={lastDayOfMonth}
          onDayOfMonthChange={onDayOfMonthChange}
          onLastDayOfMonth={onLastDayOfMonth}

          daysOfWeek={daysOfWeek}
          onDaysOfWeekChange={onDaysOfWeekChange}
          everyDay={everyDay}
          onEveryDayChange={onEveryDayChange}

          interval={interval}
          onIntervalChange={onIntervalChange}

          times={times}
          onTimeChange={onTimeChange}
          needSecondTime={needSecondTime}
          onChangeNeedSecondTime={onChangeNeedSecondTime}
      />
      <div className="cronChecker">
        <Input id="SaveOrLoadInput"
               value={cronChecker}
               type="text"
               onChange={onCronChecker}
        />
        {loadError && <p className="error">LoadError</p>}
        <button onClick={handleSave}>SAVE</button>
        <button onClick={handleLoad}>LOAD</button>
      </div>
    </div>
  );
}

export default App;
