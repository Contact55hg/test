const express = require("express")

const server = express();

server.get("/", (req, res) => {
  res.send("Esta funcionando, Rota padrao :))))")
})

server.get("/users", (req, res) => {
    res.send("Usuarios")
})

server.listen(process.env.PORT, () => {
    console.log("Running")
})