import deleteImg from './delete.png'
import React from 'react'
import './Buttons.css'

class ButtonAdd extends React.Component {
    render(){
        return(
            <div className="ButtonAdd buttonAction" onClick={this.props.onClick}>
                <div className='plusBarreH'></div>
                <div className='plusBarreV'></div>
            </div>
        )
    }
}

class ButtonReset extends React.Component {
    render(){
        return(
            <div className="ButtonReset buttonAction" onClick={this.props.onClick}>
                <img src={deleteImg} alt='Modify'/>
            </div>
        )
    }
}

class Buttons extends React.Component {
    render(){
        return(
            <div className='buttonsAddReset'>
                <ButtonAdd onClick = {this.props.add}/>
                <ButtonReset onClick = {this.props.reset}/>
            </div>
        )
    }
}

export default Buttons