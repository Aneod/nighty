import React from "react"
import './Form.css'
import { setNewCurrentDate, setModifyNextTaskStart, addZeroForDate, addZeroForDateArrayMode } from "./functions"

class ColorCircleChoice extends React.Component {
    render(){

        if(this.props.currentColor === this.props.color && this.props.colorValue === this.props.color){
            return(
                <div className="colorCircleChoice" style={{backgroundColor: this.props.color}} onClick={() => this.props.onClick('black')}></div>
            )
        }

        if(this.props.currentColor === this.props.color){
            return(
                <div className="colorCircleChoice" style={{backgroundColor: this.props.color}} onClick={() => this.props.onClick('black')}></div>
            )
        }

        if(this.props.colorValue === this.props.color){
            return(
                <div className="colorCircleChoice" style={{backgroundColor: this.props.color}} onClick={() => this.props.onClick(this.props.color)}>
                    <div className="colorSelector">
                        <div className="littleColorSelector" style={{backgroundColor: this.props.colorValue}}></div>
                    </div>
                </div>
            )
        }

        return(
            <div className="colorCircleChoice" style={{backgroundColor: this.props.color}} onClick={() => this.props.onClick(this.props.color)}>
                <div className="colorSelector"></div>
            </div>
        )
    }
}

class InputTime extends React.Component {
    render(){

        if(this.props.timeMode === 'Interval'){

            const startDate = this.props.oldDate ? this.props.oldDate : this.props.currentDate

            return(
                <div className="inputTime">
                    <p>From {startDate[0]} : {startDate[1]} to </p>
                    <div>
                        <input type="number" id="hour" placeholder="Hours"></input>:
                        <input type="number" id="minute" placeholder="Minutes"></input>
                    </div>
                </div>
            )
        }

        return(
            <div className="inputTime">
                <p>Duration: </p>
                <div>
                    <input type="number" id="hour" placeholder="Hours"></input>:
                    <input type="number" id="minute" placeholder="Minutes"></input>
                </div>
            </div>
        )
    }
}

class ButtonsTime extends React.Component {
    render(){

        if(!this.props.oldDate){

            return(
                <button onClick={this.props.changeTimeMode}>{this.props.timeMode}</button>
            )
        }

        return(
            <div style={{
                width: '100%',
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
            }}>
                <button onClick={this.props.changeTimeMode}>{this.props.timeMode}</button>
                <button onClick={this.props.changeReplaceMode}>{this.props.replaceMode}</button>
            </div>
        )
    }
}

class Input extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentColor: 'black',
            timeMode: 'Duration',
            replaceMode: 'Replace all',
        }
    }

    render() {
        const changeTimeMode = () => this.setState({timeMode: this.state.timeMode === 'Interval' ? 'Duration' : 'Interval'})
        const changeReplaceMode = () => this.setState({replaceMode: this.state.replaceMode === 'Replace following' ? 'Replace all' : 'Replace following'})

        const resetForm = () => {
            document.querySelector('#Name').value = ''
            document.querySelector('#Description').value = ''
            this.setState({currentColor: 'black'})
            document.querySelector('#hour').value = ''
            document.querySelector('#minute').value = ''
        }

        const findNewDate = () => {

            const newDate = oldDate ?
                setModifyNextTaskStart(
                    document.querySelector('#hour').value,
                    document.querySelector('#minute').value,
                    oldDate,
                    this.props.endTimeTask,
                    this.state.timeMode,
                ) :
                setNewCurrentDate(
                    document.querySelector('#hour').value,
                    document.querySelector('#minute').value,
                    this.props.currentDate,
                    this.state.timeMode,
                )

            return newDate
        }

        var nameValue = this.props.oldData?.name
        const nameInput = document.querySelector('#Name')
        if(nameInput != null) nameInput.value = nameValue ? nameValue : ''

        var descriptionValue = this.props.oldData?.text
        const descriptionInput = document.querySelector('#Description')
        if(descriptionInput != null) descriptionInput.value = descriptionValue ? descriptionValue : ''

        var colorValue = this.props.oldData ? this.props.oldData.color : 'black'

        var timeValue = this.props.oldData?.hour
        const oldDate = timeValue ? [timeValue.slice(0, 2), timeValue.slice(5)] : undefined

        const formTitle = this.props.oldData ? 'Modify step' : 'New step'
        
        return(
            <div className="Input">
                <h1>{formTitle}</h1>
                <input type="text" id="Name" placeholder="Task name" autoFocus></input>
                <textarea id="Description" rows={5} placeholder= "Description"></textarea>
                <div className="colorPanel">
                    {['#FF0000', '#FF4000', '#FF8000', '#FFBF00', '#D7DF01', '#31B404', '#04B486', '#01DFD7', '#01A9DB', '#0174DF', '#0101DF', '#5F04B4', '#8904B1', '#B404AE', '#B40486', '#B4045F'].map(color => {
                        return(
                            <ColorCircleChoice
                                color = {color}
                                onClick = {(newColor) => {
                                    this.setState({currentColor: newColor})
                                }}
                                currentColor = {this.state.currentColor}
                                colorValue = {colorValue}
                            />
                        )
                    })}
                </div>
                <div className="hr"></div>
                <div className="stepTime">
                    <ButtonsTime
                        oldDate = {oldDate}
                        timeMode = {this.state.timeMode}
                        replaceMode = {this.state.replaceMode}
                        changeTimeMode = {() => changeTimeMode()}
                        changeReplaceMode = {() => changeReplaceMode()}
                    />
                    <InputTime
                        oldDate = {oldDate}
                        currentDate = {addZeroForDateArrayMode(this.props.currentDate[0], this.props.currentDate[1])}
                        timeMode = {this.state.timeMode}
                    />
                </div>
                
                <div className="buttons">
                    <button
                        onClick={() => {
                            this.props.cancel()
                            resetForm()
                        }}
                        style={{backgroundColor: 'red'}}
                    >Cancel</button>

                    <button
                        style={{backgroundColor: 'green'}}
                        onClick={() => {
                            this.props.onClick({
                                name: document.querySelector('#Name').value ? document.querySelector('#Name').value : 'Task',
                                text: document.querySelector('#Description').value,
                                color: this.state.currentColor === 'black' ? colorValue === 'black' ? 'black' : colorValue : this.state.currentColor,
                                hour: oldDate ? oldDate[0] + ' : ' + oldDate[1] : addZeroForDate(this.props.currentDate[0], this.props.currentDate[1])
                            },
                            findNewDate(),
                            this.state.replaceMode)

                            resetForm()
                        }}
                    >Add</button>
                </div>
            </div>
        )
    }
}

class Form extends React.Component {
    render() {
        return(
            <div className="Form" style = {{display: this.props.formWriting ? 'flex' : 'none'}}>
                <Input
                    endTimeTask = {this.props.endTimeTask}
                    oldData = {this.props.oldData}
                    replaceTime = {(startTime, replaceMode) => this.props.replaceTime(startTime, replaceMode)}
                    currentDate = {this.props.currentDate}
                    onClick = {(data, newDate, replaceMode) => this.props.onClick(data, newDate, replaceMode)}
                    cancel = {this.props.cancel}
                    setNewCurrentDate = {(newDate) => this.props.setNewCurrentDate(newDate)}
                />
            </div>
        )
    }
}

export default Form