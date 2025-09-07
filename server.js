import express from "express";

const users = new Array();
const USERS = new Map();

import {readFileSync} from "fs";
import admin from "firebase-admin";




const service = JSON.parse(readFileSync("./google-services.json", "utf8"));
admin.initializeApp({
  credential: admin.credential.cert(service),
  databaseURL: "https://friday-night-funkin-deluxe-default-rtdb.firebaseio.com/"
});
const Database = admin.database();





const server = express();

server.get("/", (req, res) => {
  res.send("Esta funcionando, Rota padrao :))))")

   Database.ref("Users").child("Teste").push({
  Nome: "Joao"
}).then((s) => console.log("Sucesso"))
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



