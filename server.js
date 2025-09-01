const express = require("express")

const server = express();

server.get("/", (req, res) => {

})

server.listen(process.env.PORT, () => {
    console.log("Running")
})