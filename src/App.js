import './App.css';
import { useState } from 'react';
import React from 'react';
import Header from './section/header/Header';
import ToDoList from './section/toDoList/ToDoList';
import Form from './section/form/Form';
import Buttons from './section/Buttons/Buttons';

function App() {

  const [startDate, setStartDate] = useState([new Date().getHours(), new Date().getMinutes()])
  const [currentDate, setCurrentDate] = useState(startDate)

  const [arrayOfAllSteps, setArrayOfAllSteps] = useState([])
  const [formWriting, setFormWriting] = useState(false)
  const [whoModify, setWhoModify] = useState(-1)

  const body = document.querySelector('.body')
  body.style.overflowY = formWriting ? 'hidden' : 'scroll'


  const timeGap = (newNumbers, originalNumbers) => {
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

  const StringTimeGapper = (stringTime, timeGap) => {
    const currentNumbers = [parseInt(stringTime.slice(0, 2)), parseInt(stringTime.slice(5))]

    const newHourNumber = currentNumbers[0] + timeGap[0]
    const newMinuteNumber = currentNumbers[1] + timeGap[1]

    const newNumbers = addZeroForDate(newHourNumber, newMinuteNumber)

    return newNumbers
  }

  const replaceTime = (startTime, replaceMode, originalEndTimeTask, arrayOfFollowingSteps) => {
    const originalNumbers = [parseInt(originalEndTimeTask.slice(0, 2)), parseInt(originalEndTimeTask.slice(5))]

    let newFollowingSteps = []
    if(replaceMode == 'Replace all'){
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
      })

      if(newFollowingSteps.length == arrayOfFollowingSteps.length){
        arrayOfFollowingSteps[0].hour = addZeroForDate(startTime[0], startTime[1])
      }
      else{
        newFollowingSteps.unshift(deletedSteps.at(-1))
        newFollowingSteps[0].hour = addZeroForDate(startTime[0], startTime[1])
      }

      console.log(newFollowingSteps)
    }
    return (newFollowingSteps)
  }

  const endTimeTask = (whoModify) => arrayOfAllSteps[whoModify + 1] ? arrayOfAllSteps[whoModify + 1].hour : addZeroForDate(currentDate[0], currentDate[1])

  const addZeroForDate = (hours, minutes) => {
    const zeroHours = hours < 10 ? '0' + hours : hours
    const zeroMinutes = minutes < 10 ? '0' + minutes : minutes

    return zeroHours + ' : ' + zeroMinutes
  }

  return (
    <div>
      <Header
        startDate = {startDate}
        currentDate = {currentDate}
      />
      <div className="App">
        <ToDoList
          currentDate = {currentDate}
          arrayOfAllSteps = {arrayOfAllSteps}
          onClick = {(index) => {
            setWhoModify(index)
            setFormWriting(!formWriting)
          }}
        />
        <Buttons
          add = {() => {
            setFormWriting(!formWriting)
          }}
          delete = {() => {
            let newArray = [...arrayOfAllSteps]
              if(newArray.length){
                const lastTask = newArray.pop()
                setCurrentDate([parseInt(lastTask.hour.slice(0, 2)), parseInt(lastTask.hour.slice(5))])
              }
              setArrayOfAllSteps(newArray)
          }}
          reset = {() => {
            setCurrentDate(startDate)
            setArrayOfAllSteps([])
          }}
        />
        <Form
            formWriting = {formWriting}
            oldData = {arrayOfAllSteps[whoModify]}
            endTimeTask = {endTimeTask(whoModify)}

            currentDate = {currentDate}
            onClick = {(data, newDate, replaceMode) => {
              console.log(data, newDate, replaceMode)
              
              let newArray  = [...arrayOfAllSteps]

              if(whoModify >= 0){
                setFormWriting(!formWriting)
                newArray[whoModify] = data
                setWhoModify(-1)
              }
              else{
                setFormWriting(!formWriting)
                newArray = newArray.concat([data])
              }

              if(!arrayOfAllSteps[whoModify]){
                setCurrentDate(newDate)
              }
              else{
                const newFollowingSteps = replaceTime(newDate, replaceMode, endTimeTask(whoModify), newArray.slice(whoModify + 1))
                newArray = newArray.slice(0, whoModify + 1).concat(newFollowingSteps)

                const originalEndTimeTask = endTimeTask(whoModify)
                const originalNumbers = [parseInt(originalEndTimeTask.slice(0, 2)), parseInt(originalEndTimeTask.slice(5))]
                const currentDateGap = timeGap(newDate, originalNumbers)

                const stringCurrentDate = addZeroForDate(currentDate[0], currentDate[1])

                const stringNewCurrentDate = StringTimeGapper(stringCurrentDate, currentDateGap)
                const arrayCurrentDate = [parseInt(stringNewCurrentDate.slice(0, 2)), parseInt(stringNewCurrentDate.slice(5))]

                setCurrentDate(arrayCurrentDate)
              }

              setArrayOfAllSteps(newArray)
            }}
            cancel = {() => {
              setFormWriting(!formWriting)
              setWhoModify(-1)
            }}
          />
      </div>
    </div>
  )
}

export default App;