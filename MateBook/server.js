const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const distDir = __dirname + "/dist";

app.use(express.static(distDir));

const server = app.listen(process.env.PORT || 8080, () => {
    const port =  server.address().port;
    console.log("Server now running on port", port);
});

app.get("/api/status", (req, res) => {
    res.status(200).json({ status: "UP"});
});

app.post("/api/register", (req, res) => {
    
});

app.post("/api/login", (req, res) => {

});

app.delete("/api/logout", (req, res) => {
    
});

app.post("/posts", (req, res) => {

});

app.get("/posts", (req, res) => {

});