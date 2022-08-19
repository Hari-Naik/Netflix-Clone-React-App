import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'
import Pagination from '../Pagination'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    movies: '',
    apiStatus: apiStatusConstants.initial,
    currentPage: 1,
    moviesPerPage: 15,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  onClickNextPage = () => {
    const {movies, currentPage} = this.state
    if (currentPage < Math.ceil(movies.length / 15)) {
      this.setState(prevState => ({currentPage: prevState.currentPage + 1}))
    }
  }

  onPrevPage = () => {
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(prevState => ({currentPage: prevState.currentPage - 1}))
    }
  }

  formatData = data => ({
    id: data.id,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
  })

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
    const {currentPage, moviesPerPage, movies} = this.state
    const indexOfLastPost = currentPage * moviesPerPage
    const indexOfFirstPost = indexOfLastPost - moviesPerPage
    const currentMovies = movies.slice(indexOfFirstPost, indexOfLastPost)

    return (
      <>
        <ul className="popular-movies-list-items">
          {currentMovies.map(eachMovie => (
            <MovieItem key={eachMovie.id} movie={eachMovie} />
          ))}
        </ul>
        <Pagination
          postsPerPage={moviesPerPage}
          totalPages={movies.length / 15}
          currentPage={currentPage}
          onClickNextPage={this.onClickNextPage}
          onPrevPage={this.onPrevPage}
        />
        <Footer />
      </>
    )
  }

  renderFailureView = () => (
    <>
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
        onClick={this.getPopularMovies}
      >
        Try Again
      </button>
    </>
  )

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
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
    return (
      <div testid="popular" className="popular-container">
        <Header />
        <div className="popular-movies-container">{this.renderViews()}</div>
      </div>
    )
  }
}

export default Popular
