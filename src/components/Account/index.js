import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const username = JSON.parse(localStorage.getItem('username'))
  const password = JSON.parse(localStorage.getItem('password'))

  const maskedPassword = '*'.repeat(password.length)

  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <div className="Account-container" testid="account">
      <Header />
      <div className="account-details">
        <h1>Account</h1>
        <div className="membership-details">
          <p className="title">Member ship</p>
          <div>
            <p className="username">{username}@gmail.com</p>
            <p className="password">Password: {maskedPassword}</p>
          </div>
        </div>
        <div className="plan-details">
          <p className="title">Plan details</p>
          <div>
            <p className="premium">Premium</p>
            <div className="premium-img-container">
              <img
                src="https://res.cloudinary.com/dgwmfee0i/image/upload/v1660547969/We_love_to_collab_wi_1x_1_coxqou.png"
                alt="premium"
                className="premium-img"
              />
            </div>
          </div>
        </div>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  )
}

export default Account
