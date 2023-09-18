import './Header.css'
import React from 'react'

class Header extends React.Component {

    render(){

        const addZeroForDate = (hours, minutes) => {
            const zeroHours = hours < 10 ? '0' + hours : hours
            const zeroMinutes = minutes < 10 ? '0' + minutes : minutes

            return zeroHours + ' : ' + zeroMinutes
        }

        return(
            <div className="title">
                Nighty
                <div className='hr'></div>
                Planning from <span>{addZeroForDate(this.props.startDate[0], this.props.startDate[1])}</span> to <span>{addZeroForDate(this.props.currentDate[0], this.props.currentDate[1])}</span>
            </div>
        )
    }
}

export default Header