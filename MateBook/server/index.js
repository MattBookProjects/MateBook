import App from "./app/app.js";


function runServer(){
    const app = App();

    const server = app.listen(process.env.PORT || 3000, () => {
        const port =  server.address().port;
        console.log("Server now running on port", port);
    });
}
runServer();