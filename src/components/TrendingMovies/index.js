import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import MovieItem from '../MovieItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class TrendingMovies extends Component {
  state = {movies: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMovies()
  }

  formatData = data => ({
    id: data.id,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
  })

  getMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {url} = this.props
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.results.map(eachData =>
        this.formatData(eachData),
      )

      this.setState({
        movies: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {movies} = this.state
    const {title} = this.props
    return (
      <div className="main-container">
        <ul className="slick-container">
          <h1 className="title-category">{title}</h1>
          <Slider {...settings}>
            {movies.map(eachMovie => (
              <MovieItem key={eachMovie.id} movie={eachMovie} slickMovieItem />
            ))}
          </Slider>
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    const {title} = this.props
    return (
      <div className="failure-container">
        <h1 className="title-category align">{title}</h1>
        <div className="failure-view height">
          <img
            className="failure-view-img"
            src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426934/homepage-failure_egb8fl.png"
            alt="failure view"
          />
          <p className="failure-description">
            Something went wrong. Please try again.
          </p>
          <button
            type="button"
            className="failure-button"
            onClick={this.getMovies}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="banner-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {title} = this.props
    return (
      <div className="trending-container" testid={title}>
        {this.renderViews()}
      </div>
    )
  }
}

export default TrendingMovies
