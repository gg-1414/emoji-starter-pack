import React, { Component } from 'react';
import Header from './components/Header'
import EmojisList from './components/EmojisList'
import './App.scss';


class App extends Component {
  state = {
    loggedIn: false
  }

  componentDidMount() {
    // On page load check if code param exists; if true hide btn
    const params = new URLSearchParams(window.location.search)
    const codeParam = params.get('code');
    console.log('codeparam?', codeParam)

    if (codeParam) {
      this.setState({ loggedIn: true })
    }
  }

  render() {
    const { loggedIn } = this.state 
    const btnStyles = loggedIn ? {display: 'none'} : {display: 'block'}

    return (
      <div className="App">
          <Header/>
          <a href={`/login`} style={ btnStyles }>
            <img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" />
          </a>
        <EmojisList/>
      </div>
    )
  }
}

export default App;
