const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

const apiUri = `https://api.createsend.com/api/v3.3/`;
const clientId = "b667d82f7d30793f804118bd5c8e3fcb";
const listId = "70f61368536809e3532f5bb40210a8f4";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

auth = {
  username:
    "tH+9OMXIVozg5jjoRdfsTb8XXcwaOHU5W6PWYIekzOtfj9JlXfPURWFRiFA3by+oWkQOv6jsiKWE2BorB15cwKg7M6vSZGYqJsaGzE6Vo+1SPXDZwagkY2XUdCWL+6EcbbyIopH/68+lerv0HhLMOQ==",
  password: "",
};

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/subscribers", async (req, res) => {
  try {
    const response = await axios.get(`${apiUri}/lists/${listId}/active.json`, {
      auth: auth,
    });
    const subscribers = response.data;

    res.send(subscribers);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/subscribers", async (req, res) => {
  try {
    const payload = req.body;
    const email = payload.emailAddress;
    const fullName = payload.fullName;

    const response = await axios.post(
      `${apiUri}/subscribers/${listId}.json`,
      {
        EmailAddress: email,
        Name: fullName,
        ConsentToTrack: "Yes",
        ConsentToSendSms: "Yes",
      },
      {
        auth: auth,
      }
    );

    res.send(true);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete("/subscribers/:emailAddress", async (req, res) => {
  try {
    const emailAddress = req.params.emailAddress;
    const response = await axios.delete(
      `${apiUri}/subscribers/${listId}.json?email=${emailAddress}`,
      {
        auth: auth,
      }
    );

    res.send(true);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log("App running on port : " + port);
});