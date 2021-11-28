 const bodyParser = require('body-parser');
// const { debug } = require('console');
// const cookieSession = require('cookie-session');
// const crypto = require('crypto');
const cors = require('cors')
const express = require('express');
// const mysql = require('mysql');
const path = require('path')

const PORT = 4000//process.env.PORT || 4000;
const app = express();

//using fake account for testing
const adminUser = {
    username: "Aristos",
    password: "admin123"
  }

//enable CORS. You absolutely need this for cross-origin connections between ports on same machine
app.use(cors())

app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../client-app/build')));


app.post("/api/login", (req, res) => {
    //query DB for username/passwords of all accounts
    //const sql = 'SELECT * FROM users WHERE uname = req.body.username && password = req.body.password'
    if (req.body.username === adminUser.username && req.body.password === adminUser.password) {
        const data = {
            isValid: true
            //the entire record from DB of user
        }
        
        res.send(JSON.stringify(data))
    } 
    else {
        const data = {
            isValid: false
        }
        
        res.send(JSON.stringify(data)) 
    }

  });

app.get('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.resolve(__dirname, '../client-app/build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});