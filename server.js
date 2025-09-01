const express = require("express")

const server = express();

server.get("/", (req, res) => {

})

server.listen(2000, () => {
    console.log("Running")
})