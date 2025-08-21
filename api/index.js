const express = require("express");
const app = express();
const cors = require("cors");
const { onboardMessages, sendUserInvitesMessages } = require("../types/response-message-types");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.post("/invite", async (req, res) => {
  const BASE_URL = process.env.BASE_URL;

  setTimeout(async () => {
    try {
      const onboardResponse = await fetch(`${ BASE_URL }/admin/onboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!onboardResponse.ok) {
        throw new Error(onboardResponse.statusText);
      }

      const onboardResponseData = await onboardResponse.json();

      if (onboardResponseData.error) {
        res.send(onboardResponseData.error.message);
        throw new Error(onboardResponseData.error.message);
      }

      if (onboardResponseData.message == onboardMessages.SUCCESS_IMPORT) {
        console.log(`=== Successfully onboarded new user ===`);

        const sendUserInvitesResponse = await fetch(`${ BASE_URL }/admin/send-user-invites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!sendUserInvitesResponse.ok) {
          throw new Error(sendUserInvitesResponse.statusText);
        }

        const sendUserInvitesResponseData = await sendUserInvitesResponse.json();

        if (sendUserInvitesResponseData.error) {
          res.send(sendUserInvitesResponseData.error.message);
          throw new Error(sendUserInvitesResponseData.error.message);
        }

        if (sendUserInvitesResponseData.message == sendUserInvitesMessages.SUCCESS_INVITE) {
          res.send("Successfully onboarded and invited user");
          console.log(`=== Successfully onboarded and invited user ===`);
        }
        else {
          res.send("There was no new users to invite");
          console.log(`=== There was no new users to invite ===`);
        }
      }
      else {
        res.send("There was no new users to import");
        console.log(`=== There was no new users to import ===`);
      }
    }
    catch (error) {
      console.log(error);
    }

    console.log(`=== Invite Webhook Complete ===`);
  }, 5000);
});

const PORT = process.env.PORT;
app.listen(PORT, (error) => {

  if (error) {
    console.log(error);
    return;
  }
  console.log(`=== Application running on port: ${PORT} ===`);
});

module.exports = app;