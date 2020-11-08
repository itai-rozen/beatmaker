import React from 'react'
import './instrumentsbar.css'
import { Consumer } from './../Context'

function InstrumentsBar() {

   

    return (
        <Consumer>
            {
            p =>
                <div className="nav">
                    {p.instruments.map((instrument,index) => {
                        return (
                        <div key={index+'i'} className="instrument">
                            <input className={instrument.name} id={'rad'+index} type="radio" 
                            checked={instrument.checked} onChange={() => p.actions.checkInstrument(instrument.name)} 
                            name={'rad'+index} />
                            <label htmlFor={'rad'+index}>{instrument.name.toUpperCase()}</label>
                        </div>
                                )
                        })}
                    </div>
            }
        </Consumer>
    )
}

export default InstrumentsBar