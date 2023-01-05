import App from "./app.js";
import fetch from "file-fetch";

async function runServer() {
    const databaseConfig = await fetch('database.config.json').then(response => response.json());
    const app = App(databaseConfig);

    const server = app.listen(process.env.PORT || 8080, () => {
        const port =  server.address().port;
        console.log("Server now running on port", port);
    });
}

runServer();