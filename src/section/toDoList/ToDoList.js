import React from 'react'
import './ToDoList.css'
import Step from './step/step'
import LittleStep from './littleStep/LittleStep'

class EmptyMessage extends React.Component{
    render(){
        return(
            <div className='emptyMessage' style={{
                display: this.props.arrayOfAllSteps.length > 0 ? 'none' : 'flex',
                color: '#aaa',
            }}>Empty</div>
        )
    }
}

class ToDoList extends React.Component {
    render() {

        const addZeroForDate = (hours, minutes) => {
            const zeroHours = hours < 10 ? '0' + hours : hours
            const zeroMinutes = minutes < 10 ? '0' + minutes : minutes

            return zeroHours + ' : ' + zeroMinutes
        }

        return(
            <div className="ToDoList">
                {this.props.arrayOfAllSteps.map((step, index) => {
                    return(
                        <Step
                            key={index}
                            hour = {step.hour}
                            color = {step.color}
                            name = {step.name}
                            text = {step.text}
                            onClick = {() => this.props.onClick(index)}
                            delete = {() => this.props.delete(index)}
                            add = {() => this.props.add(index)}
                        />
                    )
                })}

                <LittleStep
                    hour = {addZeroForDate(this.props.currentDate[0], this.props.currentDate[1])}
                    color = {this.props.arrayOfAllSteps.length ? this.props.arrayOfAllSteps.at(-1).color : '#aaa'}
                    onlyStep = {!this.props.arrayOfAllSteps.length}
                />

                <EmptyMessage
                    arrayOfAllSteps = {this.props.arrayOfAllSteps}
                />
            </div>
        )
    }
}

export default ToDoList