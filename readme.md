Install the packages then run `npm start` to start the server (port: 5000).

make a `.env` file to store your keys (like in .env.example)

routes:

GET: /api/gmail/mails - to get the list of ten mails

GET: /api/gmail/mail/:id - to get the body of that mail

You will be redirected to the google auth page when not allowed or the session has expired.

After allowing the rights to access the mail go to any of the url to get the result
