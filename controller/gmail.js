const { google } = require("googleapis");

const listMessages = (req, res) => {
  try {
    const auth = req.oAuth2Client;
    const gmail = google.gmail({ version: "v1", auth });
    gmail.users.messages.list(
      {
        userId: "me",
        maxResults: 10
      },
      (err, mRes) => {
        if (err) throw new Error("The API returned an error: " + err);
        const { messages } = mRes.data;
        res.status(200).send({ data: messages });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMessage = (req, res) => {
  try {
    const auth = req.oAuth2Client;
    const { id } = req.params;
    const gmail = google.gmail({ version: "v1", auth });
    gmail.users.messages.get(
      {
        userId: "me",
        id
      },
      (err, mRes) => {
        if (err) throw new Error("The API returned an error: " + err);
        const { snippet } = mRes.data;
        res.status(200).send({ snippet });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { listMessages, getMessage };
