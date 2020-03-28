const fs = require("fs");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first time.
const TOKEN_PATH = "token.json";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const authorize = (req, res, next) => {
  try {
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        const newTokenUrl = getNewToken(oAuth2Client, req, res, next);
        res.redirect(newTokenUrl);
      } else {
        oAuth2Client.setCredentials(JSON.parse(token));
        req.oAuth2Client = oAuth2Client;
        next();
      }
    });
  } catch (error) {
    res.status(401).send({ error: "Error while authorizing" });
  }
};

const getNewToken = oAuth2Client => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  return authUrl;
};

const storeToken = (req, res) => {
  try {
    const { code } = req.query;
    oAuth2Client.getToken(code, (err, token) => {
      if (err) throw new Error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) throw new Error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while storing the token" });
  }
};

module.exports = { authorize, storeToken };
