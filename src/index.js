import React, { Component, Fragment } from "react"
import ReactDOM from "react-dom"

import SeasonDisplay from "./SeasonDisplay"
import Spinner from "./Spinner"

class App extends Component {
  state = { lat: null, errorMessage: "" }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    )
  }

  // Render content according to season
  renderContent() {
    if (this.state.lat && !this.state.errorMessage) {
      return <SeasonDisplay lat={this.state.lat} />
    }
    if (!this.state.lat && this.state.errorMessage) {
      return <Fragment>Error: {this.state.errorMessage}</Fragment>
    }
    return <Spinner message="Please accept the location confirmation" />
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

ReactDOM.render(<App />, document.querySelector("#root"))
