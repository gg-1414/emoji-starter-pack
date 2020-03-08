const express = require('express')
const path = require('path')
const fetch = require('node-fetch')

const app = express()

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET
const scopes = 'admin.teams:write' // add more scopes here, should be space separated
const redirectURI = 'https://d9ce5b6e.ngrok.io/oauth/success' // change this every time you spin up ngrok (generates new url everytime)

var code, accessToken

app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  next();
});

app.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get('/login', (req, res) => {
  console.log('received')
  const url = `https://slack.com/oauth/authorize?client_id=${SLACK_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectURI}`
  res.redirect(url)
})

app.get('/oauth/success', (req, res) => {
  code = req.query.code

  function fetchSlackOAuthAccess() {
    return fetch(`https://slack.com/api/oauth.access?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}&redirect_uri=${redirectURI}`)
  }

  const processData = async () => {
    try {
      const oauthAccess = await fetchSlackOAuthAccess()
      const data = await oauthAccess.json()
      accessToken = data["access_token"]
    } catch (err) {
      console.log('error', err)
    }
  }

  processData()
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  res.end
})

app.get('/add-emoji', (req, res) => {
  console.log('access')
  console.log('req.query.name',req.query.name)
  console.log('req.query.url',req.query.url)
  const name = req.query.name
  const imageUrl = req.query.url
  
  const url = `https://slack.com/api/admin.emoji.add?token=${accessToken}&name=${name}&url=${imageUrl}`

  const processData = async () => {
    const res = await fetch(url)
    const data = await res.json()
  }

  processData()
  res.send({ status: 200 })
  res.end
})

app.listen(process.env.PORT || 8080, () => {
  console.log('listening on 8080')
})
