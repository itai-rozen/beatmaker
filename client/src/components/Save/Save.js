import React from 'react'
import './save.css'
import { Consumer } from './../Context'
function Save(){

return (
    <div className="save window">
        <h1> Save Preset</h1>

        <form className="save-form" action="/api" method="POST">
        <div className="input-container">
        <label htmlFor="composerName" className="input-label"> Name: &nbsp;</label>
            <input className="save-input name" type="text" id="composerName" name="composerName" required/>
        </div>
            <br />
            <div className="input-container">            
            <label className="input-label" htmlFor="title">Title: &nbsp;</label>
            <input className="save-input title" type="text" id="title" name="title" required/>
            </div>
        <Consumer>
{
                p =>
            <span><input id="sounds" name="sounds" value={JSON.stringify(p.sounds)} type="hidden" />
            <input type="hidden" id="savedTempo" name="tempo" value={(p.tempo)} /></span>
}
        </Consumer>
            <br />
            <div className="btn-container">
            <button className="form-save-btn" onClick={() => alert('saved!')} >Save</button>
            </div>

        </form>
    </div>
)
}

export default Save