const express = require("express")

const users = new Array();
const USERS = new Map();

const filesystem = require("fs");


const FirebaseTools = require("firebase-tools");
const FirebaseAdmin = require("firebase-admin");
const service = JSON.parse(filesystem.readFileSync("./services/google-services.json", "utf8"));
FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(service),
  databaseURL: "https://friday-night-funkin-deluxe-default-rtdb.firebaseio.com/"
});
const Database = FirebaseAdmin.database();



Database.ref("Users").child("Teste").push({
  Nome: "Joao"
}).then((s) => console.log("Sucesso"))

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

    USERS.set(users[users.indexOf(id)], {
       Nome: id,
       GoogleAccount: "00000"
    });
    res.send("Added");
  }else res.send("Invalid null character");
})



