import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'
import Pagination from '../Pagination'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchRoute extends Component {
  state = {
    movies: '',
    apiStatus: apiStatusConstants.initial,
    searchText: '',
    currentPage: 1,
    moviesPerPage: 15,
  }

  //   componentDidMount() {
  //     this.getPopularMovies()
  //   }

  onChangeSearchText = value => {
    this.setState({searchText: value})
  }

  onGetSearchResults = () => {
    this.getMovies()
    this.setState({currentPage: 1})
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

  getMovies = async () => {
    const {searchText} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
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

  searchNoResultsView = () => {
    const {searchText} = this.state
    return (
      <div className="search-no-results-view">
        <img
          className="popular-failure-view-img"
          src="https://res.cloudinary.com/dgwmfee0i/image/upload/v1660452438/Group_7394_1x_cucqiq.png"
          alt="no movies"
        />
        <p className="popular-failure-description">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {currentPage, moviesPerPage, movies} = this.state
    const indexOfLastPost = currentPage * moviesPerPage
    const indexOfFirstPost = indexOfLastPost - moviesPerPage
    const currentMovies = movies.slice(indexOfFirstPost, indexOfLastPost)

    return (
      <>
        {movies.length === 0 ? (
          this.searchNoResultsView()
        ) : (
          <ul className="search-movies-list-items">
            {currentMovies.map(eachMovie => (
              <MovieItem key={eachMovie.id} movie={eachMovie} />
            ))}
          </ul>
        )}
        {movies.length > 15 && (
          <Pagination
            postsPerPage={moviesPerPage}
            totalPages={Math.ceil(movies.length / 15)}
            currentPage={currentPage}
            onClickNextPage={this.onClickNextPage}
            onPrevPage={this.onPrevPage}
          />
        )}
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
    <div className="search-loader-container" testid="loader">
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
    const {searchText} = this.state
    return (
      <div className="App">
        <Header
          searchInput
          searchText={searchText}
          onGetSearchResults={this.onGetSearchResults}
          onChangeSearchText={this.onChangeSearchText}
        />
        <div className="search-route-container">{this.renderViews()}</div>
      </div>
    )
  }
}

export default SearchRoute
