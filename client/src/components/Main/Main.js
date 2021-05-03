import React from 'react'
import './main.css'
import { Consumer } from '../Context'

import BeatBar from '../BeatBar/BeatBar.js'
import ControlButtons from '../ControlButtons/ControlButtons.js'
import Header from '../Header/Header.js'
import InstrumentsBar from '../InstrumentsBar/InstrumentsBar.js'
import Load from '../Load/Load.js'
import Save from '../Save/Save.js'
import SoundBoard from '../SoundBoard/SoundBoard'

function Main(){
    return (
        <div className="main">
        <Header />
        <InstrumentsBar />
        <BeatBar />
        <Consumer>
            {
                p => 
                <div className="sound-board">
                    {
                        <SoundBoard instrument={p.instruments.filter(instrument => instrument.checked)[0].name}/>
                    }
                    <div className={ (p.isShowSave)? 'save-modal' : 'save-modal hide'} ><Save toggleSave={p.actions.toggleSaveModal}/></div>
                    <div className={p.isShowLoad ? 'load-modal': 'load-modal hide'}><Load toggleLoad={p.actions.toggleLoadModal} /></div>
                </div>
            }
        </Consumer>
        <ControlButtons />
        </div>
    )
}

export default Main

