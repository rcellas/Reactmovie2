import React, {Component} from 'react';
import {API_URL,API_KEY} from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';


class Movie extends Component{
    state={
        movies:null,
        actors:null,
        directors:[],
        loading:false
    }

    // Este método solo se ejecuta justo después de que el componente haya sido montado en el DOM. perfecto para integrar otras librerias.
    componentDidMount(){
        if(localStorage.getItem(`${this.props.match.params.movieId}`)) {
            const state=JSON.parse(localStorage.getItem(`${this.props.match.params.movieId}`));
            this.setState({...state});
        }else{
            this.setState({loading:true})
            //primer fetch de las pelis
            const endpoint =`${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
            this.fetchItems(endpoint);
        }
        
    }

    fetchItems=(endpoint)=>{
        fetch(endpoint)
        .then(result =>result.json())
        .then(result=>{
            console.log(result)
            //si no encuentra la peli
            if (result.status_code){
                this.setState({loading:false});
            }else{
                //pero si me encuentra la pelicula, que me muestre la información.
                this.setState({movie: result},()=>{
                    //...then fetch actors in the setState callback function
                    const endpoint =`${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`
                    fetch(endpoint)
                    .then(result =>result.json())
                    .then(result=>{
                        const directors=result.crew.filter((member)=>member.job==="Director");
                        // muestra a los actores que han estado dentro de la peli
                        this.setState({
                            actors:result.cast,
                            directors,
                            loading:false
                        },()=>{
                            localStorage.setItem(`${this.props.match.params.movieId}`,JSON.stringify(this.state));
                        })
                    })
                })
            }
        })
        .catch(error=>console.error('Error:',error))
    }
    render(){
        return(
            <div className="rmdb-movie">
                {this.state.movie ?
                    <div>
                        <Navigation movie={this.props.location.movieName}/>
                        <MovieInfo movie={this.state.movie} directors={this.state.directors}/>
                        <MovieInfoBar time={this-this.state.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue}/>
                    </div> 
                    : null}
                {this.state.actors ? 
                    <div className="rmdb-movie-grid">
                        <FourColGrid header={'Actors'}>
                        {this.state.actors.map((element,i)=>{
                            return <Actor key={i} actor={element}/>
                        })}
                        </FourColGrid>
                    </div>
                    :null}
                    {!this.state.actors && !this.state.loading ? <h1>No Movie Found!</h1>:null}
                    {this.state.loading ? <Spinner/>:null}
                    
                    }
            </div>
        )
    }
}

export default Movie;