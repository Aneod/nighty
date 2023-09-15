import { useState } from "react"
import './Header.css'

function Header() {
    const [timeLaps, setTimeLaps] = useState(10)

    return(
        <div className="title">Prévisions sur les prochaines <span>{timeLaps}</span> heures</div>
    )
}

export default Header