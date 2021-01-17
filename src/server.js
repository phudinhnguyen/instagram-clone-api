const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Routes = require("./router");

const Server = {}

const initDefaultMiddleware = (server) => {
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
}

Server.start = (apiConfig) => {
    const { port = 9520, prefix } = apiConfig;

    const server = express();

    initDefaultMiddleware(server);
    Routes.init(server, prefix);

    server.listen(9520, () => {
        console.log(`[API] Running on port ${port}`);
    })

};

module.exports = Server;