import React from 'react'
import './load.css'
import { Consumer } from './../Context'
function Load(props){

    return (
            <div  className="load window">
            <div className="close" onClick={() => props.toggleLoad()}>X</div>
            <h1 className="load-header">Load Preset</h1>
                        <div className="load-headers">
                            <span>Composer</span><span>Title</span>
                        </div>
        <Consumer>
            {
                p => 

                    <ul className="preset-list">
                    {
                    (p.initialState) ? 
                    p.initialState.map((state,index) => {
                        return (
                            <li key={index+'state'} onClick={()=> p.actions.loadSounds(state.sounds,state.tempo)}>
                            <p>{state.composerName}</p>
                            <p>{state.title}</p>

                            <div className="delete" onClick={(e) => 
                                {
                                    e.stopPropagation()
                                    p.actions.deletePreset(state._id)
                                    
                                }
                                }>✗</div>
                            </li>
                            )
                         })     
                        : <p>no saved compositions :( </p>     
                    }
                    </ul>
            }
        </Consumer>
            </div>
    )
}

export default Load