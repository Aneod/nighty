import React from "react"
import './littleStep.css'

class LittleStep extends React.Component {
    render(){
        return(
            <div className="Step" style={{color: this.props.onlyStep ? '#aaa' : 'black'}}>
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

export default LittleStep