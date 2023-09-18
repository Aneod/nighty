import React from 'react'
import Pen from './pen.png'
import './step.css'

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

class Task extends React.Component {
    render(){
        return(
            <div className="task" style={this.props.taskStyle}>
                <p>{this.props.text}</p>
            </div>
        )
    }
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

export default Step