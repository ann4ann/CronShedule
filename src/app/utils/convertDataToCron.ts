export interface cronObjType {
    minute: string,
    hour: string,
    dayOfMonth: string,
    month: string,
    dayOfWeek: string,
}

export function convertDataToCron(data: cronObjType): string {
    const {
        minute,
        hour,
        dayOfMonth,
        month,
        dayOfWeek,
    } = data

    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
}

type convertRes = cronObjType | string

export function convertStringToData(str: string): convertRes {
    const cronArr = str.split(" ")
    const lengthErr = cronArr.length !== 5
    const symbolErr = cronArr.every(item => item === "*" || item === "?" || typeof item[0] == "number")
    if (lengthErr || symbolErr) {
        return "wrong string"
    } else {
        return ({
            minute: cronArr[0],
            hour: cronArr[1],
            dayOfMonth: cronArr[2],
            month: cronArr[3],
            dayOfWeek: cronArr[4],
        })
    }
}