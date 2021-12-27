import React from 'react'

import './statuscard.css'

const StatusCard = props => {
    return (
        <div className='status-card'>
            <div className="status-card__info">
                <span>{props.title}</span>
                <h4>{props.count}</h4>
            </div>
        </div>
    )
}

export default StatusCard
