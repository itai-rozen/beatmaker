import React from 'react'
import './beat.css'

import { Consumer } from '../Context'

function Beat(props){
return (
<Consumer>
    {
        p =>
<li   className={'beat ' + p.actions.assignColor(props.idx)} ></li>
    }
</Consumer>
)
}

export default Beat


