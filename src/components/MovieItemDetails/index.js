import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {movieDetails: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMovieDetails()
  }

  formatData = movie => ({
    id: movie.id,
    adult: movie.adult,
    backdropPath: movie.backdrop_path,
    budget: movie.budget,
    genres: movie.genres,
    overview: movie.overview,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    runtime: movie.runtime,
    title: movie.title,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    similarMovies: movie.similar_movies.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      posterPath: eachMovie.poster_path,
      backdropPath: eachMovie.backdrop_path,
    })),
    spokenLanguages: movie.spoken_languages.map(each => ({
      id: each.id,
      englishName: each.english_name,
    })),
  })

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = this.formatData(data.movie_details)
      this.setState({
        movieDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderMoreMovieLikeThis = () => {
    const {movieDetails} = this.state
    const {similarMovies} = movieDetails
    return (
      <div className="similar-movies">
        <h1>More like this</h1>
        <ul className="similar-movies-list">
          {similarMovies.slice(0, 5).map(eachMovie => (
            <MovieItem key={eachMovie.id} movie={eachMovie} similarMovies />
          ))}
        </ul>
      </div>
    )
  }

  renderMovieInfo = () => {
    const {movieDetails} = this.state
    const {genres, spokenLanguages} = movieDetails
    const formattedDate = format(
      new Date(movieDetails.releaseDate),
      'do MMM yyyy',
    )
    return (
      <div className="movie-info">
        <div className="genre">
          <h1 className="movie-info-title">Genre</h1>
          <ul>
            {genres.map(eachGenre => (
              <li key={eachGenre.id} className="movie-info-list-items">
                {eachGenre.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="audio-available">
          <h1 className="movie-info-title">Audio Available</h1>
          <ul>
            {spokenLanguages.map(eachLanguage => (
              <li key={eachLanguage.id} className="movie-info-list-items">
                {eachLanguage.englishName}
              </li>
            ))}
          </ul>
        </div>
        <div className="rating-count-average">
          <div className="rating-count">
            <h1 className="movie-info-title">Rating Count</h1>
            <p className="movie-info-list-items">{movieDetails.voteCount}</p>
          </div>
          <div className="rating-average">
            <h1 className="movie-info-title">Rating Average</h1>
            <p className="movie-info-list-items">{movieDetails.voteAverage}</p>
          </div>
        </div>
        <div className="budget-releaseDate">
          <div className="budget">
            <h1 className="movie-info-title">Budget</h1>
            <p className="movie-info-list-items">{movieDetails.budget}</p>
          </div>
          <div className="release-date">
            <h1 className="movie-info-title">Release Date</h1>
            <p className="movie-info-list-items">{formattedDate}</p>
          </div>
        </div>
      </div>
    )
  }

  renderSuccessView = () => {
    const {movieDetails} = this.state

    const year = movieDetails.releaseDate.slice(0, 4)
    const hours = Math.floor(movieDetails.runtime / 60)
    const mins = movieDetails.runtime - hours * 60

    return (
      <>
        <div
          testid="movieDetailsBanner"
          className="movie-details-banner"
          style={{
            backgroundImage: `url(${movieDetails?.backdropPath})`,
            backgroundSize: 'cover',
          }}
        >
          <div className="banner-content">
            <h1 className="banner-title">{movieDetails.title}</h1>
            <div className="runtime-releaseDate">
              <p className="runtime">
                {hours}h {mins}m
              </p>
              <div className="censor">
                <p>{movieDetails.adult ? 'A' : 'U/A'}</p>
              </div>
              <p className="release-date">{year}</p>
            </div>
            <p className="banner-description">{movieDetails.overview}</p>
            <button testid="playButton" type="button" className="banner-button">
              Play
            </button>
          </div>
        </div>
        {this.renderMovieInfo()}
        {this.renderMoreMovieLikeThis()}
      </>
    )
  }

  renderFailureView = () => (
    <div className="something-went-wrong">
      <img
        className="popular-failure-view-img"
        src="https://res.cloudinary.com/dgwmfee0i/image/upload/v1660205310/Background-Complete_1x_r5q0zs.png"
        alt="failure view"
      />
      <p className="popular-failure-description">
        Something went wrong. Please try again.
      </p>
      <button
        type="button"
        testid="tryAgainButton"
        className="failure-button"
        onClick={this.getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="something-went-wrong" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div testid="movieDetails" className="App">
        <Header banner />
        {this.renderViews()}
      </div>
    )
  }
}

export default MovieItemDetails
