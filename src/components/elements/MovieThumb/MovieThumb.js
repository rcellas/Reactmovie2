import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieThumb.css';

const MovieThumb =(props) =>{
    return (
        <div className="rmdb-moviesthumb">
        {/* con esto haremos que las imagenes de las pelis se conviertan 
        en elementos clickables y asi no redirecciona a los datos de cada peli */}
        {props.clickable ?
            <Link to={{pathname:`/${props.movieId}`, movieName:`${props.movieName}`}}>
            <img src={props.image} alt="moviethumb"/>
            </Link>
        :
        <img src={props.image} alt="moviethumb"/>
        }
        </div>
    )
}

MovieThumb.propTypes={
    image:PropTypes.string,
    movieId:PropTypes.number,
    movieName:PropTypes.string
}

export default MovieThumb;