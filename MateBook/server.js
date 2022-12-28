const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const distDir = __dirname + "/dist";

app.use(express.static(distDir));

const server = app.listen(process.env.PORT || 8080, () => {
    const port =  server.address().port;
    console.log("Server now running on port", port);
});

app.get("/api/status", (req, res) => {
    res.status(200).json({ status: "UP"});
});