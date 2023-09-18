export const setNewCurrentDate = (inputHours, inputMinutes, currentDate, timeMode) => {
    const factHours = inputHours ? parseInt(inputHours) : 0
    const factMinutes = inputMinutes ? parseInt(inputMinutes) : 0

    if(timeMode === 'Interval'){
        if(!inputHours && !inputMinutes){
            return [currentDate[0], currentDate[1]]
        }

        return [factHours, factMinutes]
    }

    else{
        let hourNumber = parseInt(currentDate[0]) + parseInt(factHours)
        let minutesNumber = parseInt(currentDate[1]) + parseInt(factMinutes)
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
}

/**
 * 
 * @param {string} inputHours heure indiquée, interval ou duration, replace all ou next
 * @param {string} inputMinutes minute indiquée, interval ou duration, replace all ou next
 * @param {string} oldDate heure de début de la task
 * @param {string} endTimeTask heure finale de la tâche / heure de début de la suivante
 * @returns 
 */
export const setModifyNextTaskStart = (inputHours, inputMinutes, oldDate, endTimeTask, timeMode) => {
    const factHours = inputHours ? parseInt(inputHours) : 0
    const factMinutes = inputMinutes ? parseInt(inputMinutes) : 0
    const arrayOfEndTimeTask = [parseInt(endTimeTask.slice(0, 2)), parseInt(endTimeTask.slice(5))]

    if(!inputHours && !inputMinutes){
        return [arrayOfEndTimeTask[0], arrayOfEndTimeTask[1]]
    }

    if(timeMode === 'Interval'){
        return [factHours, factMinutes]
    }

    else{
        let hourNumber = parseInt(oldDate[0]) + parseInt(factHours)
        let minutesNumber = parseInt(oldDate[1]) + parseInt(factMinutes)
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
}

export const addZeroForDate = (hours, minutes) => {
    const zeroHours = hours < 10 ? '0' + hours : hours
    const zeroMinutes = minutes < 10 ? '0' + minutes : minutes

    return zeroHours + ' : ' + zeroMinutes
}

export const addZeroForDateArrayMode = (hours, minutes) => {
    const zeroHours = hours < 10 ? '0' + hours : hours
    const zeroMinutes = minutes < 10 ? '0' + minutes : minutes

    return [zeroHours, zeroMinutes]
}