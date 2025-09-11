import express from "express";

const users = new Array();
const USERS = new Map();

import {readFileSync} from "fs";
import admin from "firebase-admin";




const service = JSON.parse(readFileSync("./key.json", "utf8"));
admin.initializeApp({
  credential: admin.credential.cert(service),
  databaseURL: "https://friday-night-funkin-deluxe-default-rtdb.firebaseio.com/"
});
const Database = admin.database();





const server = express();

server.get("/", (req, res) => {
  res.send("Esta funcionando, Rota padrao :))))")

   
})

server.get("/users", (req, res) => {
    res.send("Usuarios")
})

server.listen(process.env.PORT || 3000, (port) => {
    console.log("Running: ")
    console.log()
})

server.get("/GetUser", (req, res) => {
  var id = req.params.id;

  if (!users.includes(id)){
    res.send("Not found");
  }else res.send("Success")
})

server.get("/AddUser", (req, res) => {
  var id = req.params.id;
res.send("Added");
   
 
})



import fetch from "node-fetch";

async function criarConta(email, senha, user, resq) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtGnYiE9p_7mQmpem8rYt63OpLkalx8g0`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: senha,
      returnSecureToken: true
    })
  });

  var v =await res.json();

  var usermail = v.email;

  

  await Database.ref(`Usuarios`).child(v.localId).push({
    Name: user,
    Email: v.email,
    Password: senha
  }).then(s => resq.send("Info success"))
  
}


server.get("/CreateAccount", (req, res) => {
  var paramsMethod = req.query.id;

  var email = JSON.parse(paramsMethod).email;

  var senha = JSON.parse(paramsMethod).senha;
  var user = JSON.parse(paramsMethod).name;

  criarConta(email, senha, user, res);
})


server.get("/getUserJson", (req, res) => {
  var json = req.params.id;

  Database.ref("Usuarios").on("child_added", callback => {
    var user_name = callback.child("Name").val();
    var user_email = callback.child("Email").val();

    console.log(user_name)
  })

  setTimeout(() => {
    res.send("No Data Found")
  }, 6000);
})


export default Database;