 const bodyParser = require('body-parser');
// const { debug } = require('console');
// const cookieSession = require('cookie-session');
// const crypto = require('crypto');
const express = require('express');
// const mysql = require('mysql');
const path = require('path')

//const express = require("express");
const PORT = 3001//process.env.PORT || 3001;
const app = express();

//using fake account for testing
const adminUser = {
    username: "Aristos",
    password: "admin123"
  }

app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../client-app/build')));


app.get("/api/login", (req, res) => {
    //query DB for username/passwords of all accounts
    //const sql = 'SELECT * FROM users WHERE uname = req.body.username && password = req.body.password'
    if (req.body.username === adminUser.username && req.body.password === adminUser.password) {
        const data = {
            isValid: true
            //the entire record from DB of user
        }
        res.send(JSON.stringify(data))
    }

  });

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client-app/build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});