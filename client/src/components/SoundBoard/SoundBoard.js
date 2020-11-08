import React from 'react'
import './soundboard.css'
import { Consumer } from '../Context'
import Sound from '../Sound/Sound.js'

function SoundBoard(props) {
    return (
            <div className="sound-board">
        <Consumer>
            {
                p =>
            p.sounds.map((soundRow,i) => <ul key={'row '+i} className="sound-list"> {soundRow.map((sound, index) =>
            <Sound  key={'sound ' + index} i={sound.i} j={sound.j} scale={sound.scale} instrument={props.instrument}  />)} </ul>)
            }
        </Consumer>
            </div>
    )
}

export default SoundBoard