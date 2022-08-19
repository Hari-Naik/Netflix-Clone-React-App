import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Banner from '../Banner'
import TrendingVideos from '../TrendingMovies'
import Originals from '../Originals'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    originalsData: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginalsData()
  }

  formatData = data => ({
    id: data.id,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
  })

  getOriginalsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
        originalsData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getOriginalsData()
  }

  render() {
    const {originalsData, apiStatus} = this.state

    const bannerData =
      originalsData[Math.floor(Math.random() * originalsData.length)]

    return (
      <div className="Home">
        <Header banner />
        <Banner
          movieData={bannerData}
          apiStatus={apiStatus}
          onClickRetry={this.onClickRetry}
        />
        <TrendingVideos
          title="Trending Now"
          url="https://apis.ccbp.in/movies-app/trending-movies"
        />
        <TrendingVideos
          title="Top Rated"
          url="https://apis.ccbp.in/movies-app/top-rated-movies"
        />
        <Originals
          title="Originals"
          movies={originalsData}
          apiStatus={apiStatus}
          onClickRetry={this.onClickRetry}
        />
        <Footer />
      </div>
    )
  }
}

export default Home
