import React, {Component} from 'react';
import {API_URL, API_KEY,IMAGE_BASE_URL,POSTER_SIZE,BACKDROP_SIZE} from '../../config';
import HeroImage from '../elements/HeroImag/HeroImag';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';


// determina las funciones que debe hacer la pagina
class Home extends Component{
    state ={
        movies:[],
        HeroImage:null,
        loading:false,
        currentPage: 0,
        totalPages:0,
        searchTerm: ''
    }

    // para que carge la pelicula más popular
    componentDidMount(){
        if(localStorage.getItem('HomeState')){
            const state=JSON.parse(localStorage.getItem('HomeState'));
            this.setState({...state});
        }else{
        this.setState({loading:true});
        const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
        }
    }

    // le decimos que nos carge la pelicula + popular del momento a través de la api
    searchItems =(searchTerm)=>{
        console.log(searchTerm);
        let endpoint = '';
        this.setState({
            movies:[],
            loading:true,
            searchTerm
        })

        if (searchTerm === ''){
            endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        }else{
            endpoint =`${API_URL}search/movies?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }
        this.fetchItems(endpoint);
    }

    // para que nos cargue un listado más amplio de preguntas
    loadMoreItems =() =>{
        let endpoint='';
        this.setState({loading:true});

        if (this.state.searchTerm === '') {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
          } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
          }
        this.fetchItems(endpoint);
    }

    fetchItems=(endpoint)=>{
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            this.setState({
                movies: [...this.state.movies, ...result.results],
                heroImage: this.state.HeroImage || result.results[0],
                loading: false,
                currentPage:result.page,
                totalPages:result.total_pages,
            },()=>{
                if(this.state.searchTerm ===""){
                    localStorage.setItem('HomeState',JSON.stringify(this.state));
                }
            })
        })
        .catch(error =>console.error('Error:',error))
    }

    render() {
        return (
          <div className="rmdb-home">
          {this.state.heroImage ?
            <div>
              <HeroImage
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                title={this.state.heroImage.original_title}
                text={this.state.heroImage.overview}
              />
              <SearchBar callback={this.searchItems} />
            </div> : null }
            <div className="rmdb-home-grid">
              <FourColGrid
              header={this.state.searchTerm ? 'Search Result': 'Popular Movies'}
              loading={this.state.loading}
              >
              {this.state.movies.map((element,i)=>{
                  return<MovieThumb
                        key={i}
                        clickable={true}
                        image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`:'.img/no_image.jpg'}
                        movieId={element.id}
                        movieName={element.original_title}
                        />
              })}
              </FourColGrid>
              {this.state.loading ? <Spinner /> : null}
              {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
                <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
                : null }
            </div>
          </div>
        )
      }
    }


export default Home;