import React from 'react'
import './beatbar.css'
import { Consumer } from '../Context'
import Beat from './../Beat/Beat.js'
function BeatBar() {
    return (
        <Consumer>
            {
                p =>
                    <div className="beat-bar">
                        <ul   className="beat-list">{p.beatCpts.map((beat,i) => <Beat  key={'beat'+i} idx={i}  />)}</ul>
                        
                    </div>
            }
        </Consumer>
    )
}

export default BeatBar