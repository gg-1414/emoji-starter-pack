# Emoji Starter Pack! 

## Steps: 
1. Create a `.env` file in the root of the directory and include:
    - REACT_APP_SLACK_CLIENT_ID
    - REACT_APP_SLACK_CLIENT_SECRET

2. Run `npm start` in one terminal and `~/ngrok http 3000` in another terminal. Then open the ngrok.io url. (Make sure to replace the value of `const redirectURI` in `src/App.js:9`)

## Dev Notes: 
1. On page load, redirect user to slack.com/oauth/authorize (GET request)
   Parameters to include: 
     - client_id (the app client id, found under 'Basic Information')
     - scopes (required only for this app)
     - redirect_uri (should be set up in the app management page, which should match this)
     - state (uuid string for extra security, should match in returned response)

2. User should login to grant access, which should return with a response with:
   - code (the verification code to be passed to oauth.access)
   - state (the uuid string passed as an optional parameter in the GET request)

3. Check if state matches the one passed in when making the request. If it doesn't match, abort the process.

4. Then, make another GET request to slack.com/api/oauth.access 
   Parameters to include: 
     - client_id 
     - client_secret
     - code 
     - redirect_uri

5. A JSON response should be returned. 
   Example response: 
   {
     "access_token": "xoxp-23984754863-2348975623103",
     "scope": "read"
   }
   
6. And now calls to the Admin API should work! 
   Example Call: GET /api/conversations.list?limit=50&token=xoxb-1234-abcdefgh
   URL: https://slack.com/api/admin.emoji.add


