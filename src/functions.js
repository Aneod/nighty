export const timeGap = (newNumbers, originalNumbers) => {
    let hourNumber = newNumbers[0] - originalNumbers[0]
    let minutesNumber = newNumbers[1] - originalNumbers[1]
    if(minutesNumber >= 60){
        const additionalHours = Math.trunc(minutesNumber/60)
        minutesNumber = minutesNumber%60
        hourNumber += additionalHours
    }

    if(hourNumber >= 24){
        hourNumber = Math.trunc(hourNumber%24)
    }
    
    return [hourNumber, minutesNumber]
}

export const StringTimeGapper = (stringTime, timeGap) => {
const currentNumbers = [parseInt(stringTime.slice(0, 2)), parseInt(stringTime.slice(5))]

const newHourNumber = currentNumbers[0] + timeGap[0]
const newMinuteNumber = currentNumbers[1] + timeGap[1]

const newNumbers = addZeroForDate(newHourNumber, newMinuteNumber)

return newNumbers
}

export const replaceTime = (startTime, replaceMode, originalEndTimeTask, arrayOfFollowingSteps) => {
const originalNumbers = [parseInt(originalEndTimeTask.slice(0, 2)), parseInt(originalEndTimeTask.slice(5))]

let newFollowingSteps = []
if(replaceMode === 'Replace all'){
    newFollowingSteps = arrayOfFollowingSteps.map(step => 
    ({
        name: step.name,
        text: step.text,
        color: step.color,
        hour: StringTimeGapper(step.hour, timeGap(startTime, originalNumbers)),
    })
    )
}

else{
    let deletedSteps = []
    arrayOfFollowingSteps.map(step => {
    if(parseInt(step.hour.slice(0, 2)) > startTime[0]){
        newFollowingSteps.push(step)
    }
    else if(parseInt(step.hour.slice(0, 2)) < startTime[0]){
        deletedSteps.push(step)
    }
    else{
        if(parseInt(step.hour.slice(5)) > startTime[1]){
        newFollowingSteps.push(step)
        }
        else{
        deletedSteps.push(step)
        }
    }
    return []
    })

    if(newFollowingSteps.length === arrayOfFollowingSteps.length){
    arrayOfFollowingSteps[0].hour = addZeroForDate(startTime[0], startTime[1])
    }
    else{
    newFollowingSteps.unshift(deletedSteps.at(-1))
    newFollowingSteps[0].hour = addZeroForDate(startTime[0], startTime[1])
    }
}
return (newFollowingSteps)
}

export const addZeroForDate = (hours, minutes) => {
const zeroHours = hours < 10 ? '0' + hours : hours
const zeroMinutes = minutes < 10 ? '0' + minutes : minutes

return zeroHours + ' : ' + zeroMinutes
}