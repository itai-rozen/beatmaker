import React from 'react'
import { Consumer } from '../Context'
import './controlbuttons.css'

function ControlButtons() {
            /* <button className="load-btn" onClick={() => props.actions.toggleLoadModal()}>📁</button>
            <button className="save-btn" onClick={() => props.actions.toggleSaveModal()}>&#128190;</button> */
    return (
        <Consumer>
            {
            props => 

        <div className="control-panel">

            <button onClick={() => props.actions.startPlaying()} >&#9654;</button>
            <button onClick={() => props.actions.stopPlaying()} >&#9632;</button>
            <button onClick={() => props.actions.pausePlaying()} >&#10074;&#10074;</button>
            <button onClick={() => props.actions.resetPlaying()} >Reset</button>
            <button onClick={() => props.actions.clearInstrument()} >Clear</button>
        <div className="sliders">
                <div className="slider">
                    <div className="bpm rotate-back">BPM</div>
                    <div className="current-tempo rotate-back">{props.tempo}</div> 
                    <input   defaultValue={props.tempo } type="range" onMouseUp={() => props.actions.playUpdateTempo()} onChange={(event)=> props.actions.handleTempo(event)} id="tempo-slider" min="30" max="180" />
                </div>
                <div className="slider">
                    <div className="mute hidden"></div>
                    <div className="rotate-back" id="volume-icon" >&#128266;</div>
                    {/* onClick={()=> props.actions.toggleMute()}  */}
                    <input defaultValue={props.volume } type="range" onChange={(event)=> props.actions.handleVolume(event)} step="0.01" id="volume-slider" min="0" max="1" />
                </div>
        </div>
        </div>
            }
        </Consumer>
    )
}

export default ControlButtons