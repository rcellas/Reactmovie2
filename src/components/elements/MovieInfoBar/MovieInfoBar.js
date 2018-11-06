import React from 'react';
//import FontAwesome from '@fortawesome/react-fontawesome';
import {calcTime, convertMoney} from '../../../helpers.js';
import './MovieInfoBar.css'

const MovieInfoBar =(props)=>{
    return(
        <div className="rmdb-movieinfobar">
            {/* duración de la pelicula */}
            <div className="rmdb-movieinfobar-content">
                <div className="rmdb-movieinfobar-content-col">
                <i className="far fa-clock" name="clock-o" size="2px"></i>
                    <span className="rmdb-movieinfobar-info">Running time: {calcTime(props.time)}</span>
                </div>
                {/* conste que ha tenido la pelicula */}
                <div className="rmdb-movieinfobar-content-col">
                <i className="far fa-money-bill-alt" name="money" size="2px"></i>
                    <span className="rmdb-movieinfobar-info">Budget: {convertMoney(props.budget)}</span>
                </div>
                {/* ganancias de la pelicula */}
                <div className="rmdb-movieinfobar-content-col">
                <i class="fas fa-ticket-alt" name="ticket" size="2px"></i>
                    <span className="rmdb-movieinfobar-info">Revenue: {convertMoney(props.revenue)}</span>

                </div>
            </div>
        </div>
    )
}

export default MovieInfoBar;