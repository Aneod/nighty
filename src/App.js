import './App.css';
import { useState } from 'react';
import React from 'react';
import Header from './section/header/Header';
import ToDoList from './section/toDoList/ToDoList';
import Form from './section/form/Form';
import Buttons from './section/Buttons/Buttons';
import { timeGap, StringTimeGapper, replaceTime, addZeroForDate, stepDeleted, stepAdd } from './functions';

function App() {

  const [startDate, setStartDate] = useState([new Date().getHours(), new Date().getMinutes()])
  const [currentDate, setCurrentDate] = useState(startDate)

  const [arrayOfAllSteps, setArrayOfAllSteps] = useState([])
  const [formWriting, setFormWriting] = useState(false)
  const [whoModify, setWhoModify] = useState(-1)

  const body = document.querySelector('.body')
  body.style.overflowY = formWriting ? 'hidden' : 'scroll'

  const endTimeTask = (whoModify) => arrayOfAllSteps[whoModify + 1] ? arrayOfAllSteps[whoModify + 1].hour : addZeroForDate(currentDate[0], currentDate[1])

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
          delete = {(index) => {
            if(index === arrayOfAllSteps.length - 1){
              setCurrentDate([parseInt(arrayOfAllSteps[index].hour.slice(0, 2)), parseInt(arrayOfAllSteps[index].hour.slice(5))])
            }

            const newArray = stepDeleted(index, arrayOfAllSteps)
            setArrayOfAllSteps(newArray)
          }}
          add = {(index) => {
            const newArray = stepAdd(index, arrayOfAllSteps)
            setArrayOfAllSteps(newArray)
          }}
        />
        
        <Buttons
          add = {() => {
            setFormWriting(!formWriting)
          }}
          reset = {() => {
            setCurrentDate(startDate)
            setArrayOfAllSteps([])
            setStartDate([new Date().getHours(), new Date().getMinutes()])
            setCurrentDate([new Date().getHours(), new Date().getMinutes()])
          }}
        />
        <Form
            formWriting = {formWriting}
            oldData = {arrayOfAllSteps[whoModify]}
            endTimeTask = {endTimeTask(whoModify)}

            currentDate = {currentDate}
            onClick = {(data, newDate, replaceMode) => {
              
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