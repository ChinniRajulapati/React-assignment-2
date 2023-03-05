import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()

    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      isShow,
      searchInput,
    } = this.state

    let {isTrue} = this.state

    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <img
          className="app-logo"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="inner-container-1">
          <div className="input-container">
            <h1 className="heading">Add New Password</h1>
            <form onSubmit={this.addContent} className="form-control">
              <div className="label-container">
                <img
                  className="input-logo"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                />
                <input
                  onChange={this.onChangeWebsite}
                  placeholder="Enter Website"
                  className="input"
                  type="text"
                  value={website}
                />
              </div>
              <div className="label-container">
                <img
                  className="input-logo"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png  "
                />
                <input
                  onChange={this.onChangeInput}
                  placeholder="Enter Username"
                  className="input"
                  type="text"
                  value={username}
                />
              </div>
              <div className="label-container">
                <img
                  className="input-logo"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                />
                <input
                  onChange={this.onChangePassword}
                  placeholder="Enter Password"
                  className="input"
                  type="password"
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="btn">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            className="password-manager"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
        </div>
        <div className="inner-container-2">
          <div className="header-container">
            <h1 className="count-password">Your Passwords</h1>
            <p>{newList.length}</p>
            <div className="search-container">
              <img
                alt="search"
                className="search-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                onChange={this.searchList}
                value={searchInput}
                placeholder="Search"
                type="search"
                className="input-search"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-password-container">
            <input
              onChange={this.showPassword}
              id="checkbox"
              className="show-input"
              type="checkbox"
            />
            <label htmlFor="checkbox" className="password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div>
              <img
                className="no-passwords-image"
                alt="no passwords"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              />
              <p className="paragraph">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {newList.map(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.websiteName}</p>
                    <p className="website">{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {isShow && <p className="website">{eachValue.Password}</p>}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
