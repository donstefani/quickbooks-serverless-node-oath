# quickbooks-serverless-node-oath
All of the documentation for Authenticating with the Quickbooks API calls for a web interface to get an access token. I needed to be able to connect to the API from a AWS serverless app.

The key to this working is that the access token is valid only for an hour, but the refresh token is valid for a 101 days. So each time you access the API you write the new refresh token to the `refreshToken.json` file. You then use it to get a new access token.

The only human interaction involved is the placing of the original refresh token in the json data file just prior to deploying your app. The app I that I needed to use this auth with is a Lambda that runs on a schedule every hour. So in theory it should just keep working as long as the app is running. Worst case you would need to get a new refresh token from the OAuth playground.

Here are the steps for making it work.

1. Set up your developer account on Quickbooks developer.
2. Create an app and go to the app dashboard, click on your app, and select Keys & OAuth from the left hand menu.
3. Copy the Client ID and secret and put them in the .env file.
4. Go to your [sandbox](https://developer.intuit.com/app/developer/sandbox) and copy your company ID and place it in the .env file to use for testing.
5. Click on the [OAuth 2.0 Playground link](https://developer.intuit.com/app/developer/playground) above the ID and secret.
6. Follow the steps and when you get a response on the right that contains the `access_token` and `refresh_token` copy the refresh token and place it in the `data/refreshToken.json` file.
7. run `npm test` and you should get all passing tests and a console.log of your company data.