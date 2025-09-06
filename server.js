const express = require("express")

const users = new Array();

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

server.get("/GetUser", (req, res) => {
  var id = req.params.id;

  if (!users.includes(id)){
    res.send("Not found");
  }else res.send("Success")
})

server.get("/AddUser", (req, res) => {
  var id = req.params.id;

  if (String(id).trim().length > 0){
    users.push(id);
    res.send("Added");
  }else res.send("Invalid null character");
})