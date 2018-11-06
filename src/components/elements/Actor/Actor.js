import React from 'react';
import {IMAGE_BASE_URL} from '../../../config';
import './Actor.css';

const Actor =(props)=>{
    const POSTER_SIZE="w154";

    return (
        <div className="rmdb-actor">
        <div className="rmdb-box">
          <img
            src={props.actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.actor.profile_path}` : './img/no_image.jpg'}
            alt="actorthumb"
          />
            <h3 className="rmdb-actor-name">{props.actor.name}</h3>
            <h4 className="rmdb-actor-character">{props.actor.character}</h4>
          </div>
        </div>
    )
}

export default Actor;