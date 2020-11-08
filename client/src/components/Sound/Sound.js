import React from 'react'
import './sound.css'
import { Consumer } from '../Context' 

function Sound(props){
    return (
        <Consumer>
{
        p =>
        <li  className={'sound ' + (p.actions.assignSoundClass(props.i,props.j,props.instrument)) + ` ${props.instrument}`}   
        onClick={() => p.actions.handleClickedSound(props.i,props.j,props.instrument)}></li>
}
        </Consumer>
        )
}

export default Sound