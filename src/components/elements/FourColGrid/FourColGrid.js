import React from 'react';
import PropTypes from 'prop-types';
import './FourColGrid.css';


const FourColGrid =(props)=>{

    const renderElements =()=>{
        const gridElements =props.children.map((element,i)=>{
            return(
                <div key={i} className="rmdb-grid-elements">
                    {element}
                </div>
            )
        })
        return gridElements;
    }
    return(
        <div className="rmdb-grid">
            {props.header && !props.loading ? <h1>{props.header}</h1>:null}
            <div className="rmdb-grid-content">
                {renderElements()}
            </div>
        </div>
    )
}
// los propType sirve para hacer una buena definicion del component en Reactjs.Así establecemos una serie de validadciones.
FourColGrid.propType={
    header:PropTypes.string,
    loading:PropTypes.bool
}

export default FourColGrid;