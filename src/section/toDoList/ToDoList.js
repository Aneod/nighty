import React from 'react'
import './ToDoList.css'
import Pen from './pen.png'

class Task extends React.Component {
    render(){
    return(
        <div className="task" style={this.props.taskStyle}>
            <p>{this.props.text}</p>
        </div>
    )}
}

class CheckPoint extends React.Component {
    render(){
        return(
            <div className="CheckPoint">
                <div className='pointCheckPoint' style={{borderColor: this.props.color}}></div>
                <div className='ligneCheckPoint' style={{backgroundColor: this.props.color}}></div>
                <p>{this.props.hour}</p>
                <img
                    src={Pen}
                    alt="Modify"
                    style={{
                        height: '50%',
                        padding: '5px',
                        cursor: 'pointer'
                    }}
                    onClick={this.props.onClick}
                />
            </div>
        )
    }
}

class Step extends React.Component {
    render(){

        const makeLineBreak = (text) => text.split(/\n/)

        if(this.props.text){
            return(
                <div className="Step">
                    <CheckPoint
                        hour = {this.props.hour + ' - ' + this.props.name}
                        color = {this.props.color}
                        onClick = {this.props.onClick}
                    />

                    {makeLineBreak(this.props.text).map(textPart => {

                        const taskStyle = {backgroundColor: textPart ? 'rgb(238, 238, 238)' : 'inherit'}

                        return(
                            <Task
                                text = {textPart}
                                taskStyle = {taskStyle}
                            />
                        )
                    })}
                    
                    <div className='pointRail' style={{borderColor: this.props.color}}></div>
                </div>
            )
        }

        return(
            <div className="Step">
                <CheckPoint
                    hour = {this.props.hour + ' - ' + this.props.name}
                    color = {this.props.color}
                    onClick = {this.props.onClick}
                />
                <div className='pointRail' style={{borderColor: this.props.color}}></div>
            </div>
        )
    }
}

class LittleStep extends React.Component {
    render(){

        return(
            <div className="Step">
                <LittleCheckPoint
                    hour = {this.props.hour}
                    color = {this.props.color}
                />
            </div>
        )
    }
}

class LittleCheckPoint extends React.Component {
    render(){
        return(
            <div className="LittleCheckPoint">
                <div className='littlePointCheckPoint' style={{borderColor: this.props.color}}></div>
                <p>{this.props.hour}</p>
            </div>
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

        if(this.props.arrayOfAllSteps.length == 0){

            const styleText = {
                color: '#aaa',
                fontSize: '18px',
            }

            return(
                <div className="ToDoList" style={styleText}>
                    <LittleStep
                        hour = {addZeroForDate(this.props.currentDate[0], this.props.currentDate[1])}
                        color = {'#aaa'}
                    />
                    <div className='emptyMessage'>Empty</div>
                </div>
            )
        }

        return(
            <div className="ToDoList">
                {this.props.arrayOfAllSteps.map((step, index) => {
                    return(
                        <Step
                            hour = {step.hour}
                            color = {step.color}
                            name = {step.name}
                            text = {step.text}
                            onClick = {() => this.props.onClick(index)}
                        />
                    )
                })}
                {<LittleStep
                    hour = {addZeroForDate(this.props.currentDate[0], this.props.currentDate[1])}
                    color = {this.props.arrayOfAllSteps.length ? this.props.arrayOfAllSteps.at(-1).color : 'black'}
                />}
            </div>
        )
    }
}

export default ToDoList