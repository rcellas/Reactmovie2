import React from 'react';
import './Header.css';

const Header =() =>{
    return(
        <div className="rmdb-header">
            <div className="rmdb-header-content">
                <img className="rmdb-logo" src="./img/reactMovie_logo.png" alt="React Movie" />
                <img className="rmdb-tmdb-logo" src="./img/tmdb_logo.png" alt="Api bla bla bla"/>
            </div>
        </div>
    )
}

export default Header;