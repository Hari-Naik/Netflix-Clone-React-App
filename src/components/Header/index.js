import {Component} from 'react'
import {Link} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  onClickMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onChangeSearchInput = e => {
    const {onChangeSearchText} = this.props
    onChangeSearchText(e.target.value)
  }

  onClickSearchButton = () => {
    const {onGetSearchResults} = this.props
    onGetSearchResults()
  }

  onClickCloseIcon = () => {
    this.setState({showMenu: false})
  }

  renderMenu = () => (
    <div className="menu-bar">
      <ul>
        <Link to="/" className="nav_link">
          <li>Home</li>
        </Link>
        <Link to="/popular" className="nav_link">
          <li>Popular</li>
        </Link>
        <Link to="/account" className="nav_link">
          <li>Account</li>
        </Link>
        <button type="button" onClick={this.onClickCloseIcon}>
          <AiOutlineCloseCircle color="#fff" size={20} />
        </button>
      </ul>
    </div>
  )

  render() {
    const {searchInput, searchText, banner} = this.props
    const {showMenu} = this.state

    return (
      <>
        <nav className={`nav ${banner && 'nav-style'}`}>
          <div className="nav_container">
            <ul className="nav_left">
              <li>
                <Link to="/" className="nav_link">
                  <img
                    src="https://res.cloudinary.com/dgwmfee0i/image/upload/v1659963693/logo_1x_ix9a7m.png"
                    alt="website logo"
                    className="nav_logo"
                  />
                </Link>
              </li>
              <Link to="/" className="nav_link">
                <li className="nav_item">Home</li>
              </Link>
              <Link to="/popular" className="nav_link">
                <li className="nav_item">Popular</li>
              </Link>
            </ul>
            <ul className="nav_right">
              {searchInput ? (
                <div className="search-input-container">
                  <input
                    type="search"
                    value={searchText}
                    placeholder="Enter keywords..."
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    type="button"
                    testid="searchButton"
                    onClick={this.onClickSearchButton}
                  >
                    <HiOutlineSearch size={14} color="#fff" />
                  </button>
                </div>
              ) : (
                <Link to="/search" className="nav_link">
                  <li className="search_icon">
                    <button
                      type="button"
                      testid="searchButton"
                      className="nav-item-button"
                    >
                      <HiOutlineSearch color="#fff" size={20} />
                    </button>
                  </li>
                </Link>
              )}
              <li>
                <button
                  type="button"
                  className="nav-item-button"
                  onClick={this.onClickMenu}
                >
                  <img
                    src="https://res.cloudinary.com/dgwmfee0i/image/upload/v1660029459/add-to-queue_1_1x_dmto7s.png"
                    alt="menu bar"
                    className="harmburg_menu"
                  />
                </button>
              </li>
              <Link to="/account" className="nav_link">
                <li>
                  <img
                    src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
                    alt="profile"
                    className="profile_img"
                  />
                </li>
              </Link>
            </ul>
          </div>
        </nav>
        {showMenu && this.renderMenu()}
      </>
    )
  }
}

export default Header
