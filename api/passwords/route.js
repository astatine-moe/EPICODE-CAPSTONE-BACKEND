import * as passwordModel from "./model";

import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    //TODO: Only fetch passwords of the logged in user, make sure to decrypt the passwords, then encrypt with a temporary key and send to the client
});

export default router;
