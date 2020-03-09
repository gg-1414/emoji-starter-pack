import React, { Component } from 'react';
import Header from './components/Header'
import EmojisList from './components/EmojisList'
import './App.scss';

const SLACK_CLIENT_ID = process.env.REACT_APP_SLACK_CLIENT_ID
const SLACK_CLIENT_SECRET = process.env.REACT_APP_SLACK_CLIENT_SECRET
const scopes = 'admin.teams:write'
const redirectURI = 'https://cf20fe1f.ngrok.io'

class App extends Component {
  state = {
    token: null
  }

  async fetchToken(code) {
    try {
      const url = `https://slack.com/api/oauth.access?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}&redirect_uri=${redirectURI}`
      const res = await fetch(url)
      const data = await res.json() 
      const token = data['access_token']
      this.setState({ token })
    } catch (err) {
      console.log('error', err)
    }
  }

  componentDidMount() {
    // On page load check if code param exists; if true hide btn
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code');
    console.log('code?', code)

    if (code) {
      this.fetchToken(code)
    }
  }

  render() {
    const { token } = this.state 
    const btnStyles = token ? {display: 'none'} : {display: 'flex'}
    const url = `https://slack.com/oauth/authorize?client_id=${SLACK_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectURI}`

    return (
      <div className="App">
          <Header/>
          <div className="login-wrapper" style={btnStyles}>
            <a href={url}>
              <img alt="Sign in with Slack" height="60" width="258" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" />
            </a>
          </div>
        <EmojisList token={token}/>
      </div>
    )
  }
}

export default App;
