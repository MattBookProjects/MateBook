import App from "./app/app.js";
import fetch from "file-fetch";
/*
async function runServer() {
    const databaseConfig = await fetch('database.config.json').then(response => response.json());
    const database = new Database(databaseConfig);
    const app = App(database);

    const server = app.listen(process.env.PORT || 8080, () => {
        const port =  server.address().port;
        console.log("Server now running on port", port);
    });
} */

function runServer(){
    const config = {
        server: "localhost",
        authentication: {
            type: "default",
            options: {
                userName: "cieniu316",
                password: "25V8@rgr662"
            }
        },
        options: {
            encrypt: true,
            database: "MateBook",
            trustServerCertificate: true,
            rowCollectionOnRequestCompletion: true
        }
    }
    const app = App();

    const server = app.listen(process.env.PORT || 8080, () => {
        const port =  server.address().port;
        console.log("Server now running on port", port);
    });
}
runServer();