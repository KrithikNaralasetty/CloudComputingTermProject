 const bodyParser = require('body-parser');
// const { debug } = require('console');
// const cookieSession = require('cookie-session');
// const crypto = require('crypto');
const cors = require('cors')
const express = require('express');
const mysql = require('mysql2');
const conn = require('./dbConnect')
const path = require('path')

const PORT = 4000//process.env.PORT || 4000;
const app = express();

// connect to db 
// should consider the pool method with separate db connect file
// const con = mysql.createConnection({
//     host    : 'localhost',
//     port    :  5000,
//     database: 'coen241',
//     password: '12345',
//     user    : 'root'
// })

// con.connect(err => {
//     if (err) throw err;
//     console.log("Connected to the DB!")
// })

//enable CORS. You absolutely need this for cross-origin connections between ports on same machine
app.use(cors())

app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../client-app/build')));


app.post("/api/login", (req, res) => {
    //query DB for username/passwords of all accounts
    conn.getConnection(
    function (err, client) {
        const sql = 'SELECT * FROM users WHERE uname = ? AND password = ?';
        client.query(sql, [req.body.username, req.body.password], function(err, user) {
            console.log("return value" + user)
            console.log(user[0])
            if (err)
                console.log('Query Error')

            if (user[0]) { //match
                const data = {
                    isValid: true,
                    email: user[0].email,
                    id: user[0].uid
                }
                console.log(data.id)
                res.send(JSON.stringify(data)) 
            }
            else { //no match; wrong credentials
                const data = {
                    isValid: false
                }
                
                res.send(JSON.stringify(data)) 
            }
            client.release()
        })
    })
});

app.post("/api/validate-email", (req, res) => {
    console.log("Checking if email valid:")
    //query DB for username/passwords of all accounts
    conn.getConnection(
        function (err, client) {
            const sql = 'SELECT * FROM users WHERE email = ?';
            console.log(req.body.email)
            client.query(sql, [req.body.email], function(err, user) {
                //console.log("return value" + user[0]) 
                if (err)
                    console.log('Query Error')
    
                if (user[0]) { //match     
                    console.log("Correct Email!")  
                    const data = {
                        data: user[0]
                    }            
                    res.send(JSON.stringify(data)) 
                }
                else { //no match; wrong email
                    console.log("can't find email")
                    res.send(JSON.stringify(false)) 
                }
                client.release()
            })
        })

})

app.post("/api/create-event", (req, res) => {
    console.log("Creating Event:")
    conn.getConnection(
        function (err, client) { //uid and userid are foreign keys (connected)
            const sql = 'INSERT INTO events (eventname, userid, owner, collaborators) VALUES (?, ?, ?, ?)';

            client.query(sql, [req.body.eventname, req.body.userid, req.body.owner,
                JSON.stringify(req.body.collaborators)], function(err, result) {
                
                if (err) {
                    console.log('Query Error')
                    console.log(err)
                }
                console.log(result.insertId) //eventId that will be returned
                res.send(JSON.stringify({eventId: result.insertId}))
                client.release()          
            }) 
        })       
})


app.post("/api/create-timeslots", (req, res) => {
    console.log("Creating and inserting Timslots:")
    console.log("server req.body.eventid=" + req.body.eventid)
    const collaborators = req.body.collaborators //check if collaborators needs to be parsed? 
    const dates = req.body.dates //need to add this when called
    let ctr = 0
    conn.getConnection(
        function (err, client) { //uid and userid are foreign keys (connected)
            for (const collaborator of collaborators) {
                for (const date of dates) {
                    for (let hour = 0; hour < 24; hour++) {
                        const sql = 'INSERT INTO event_times (eventid, timeslot, day, owner, occupied) VALUES (?, ?, ?, ?, ?)';
            
                        client.query(sql, [req.body.eventid, hour, date, collaborator, 0], 
                            //collaborator should be email, and timeslot is hour.
                        function(err, result) {
                            
                            if (err) {
                                console.log('Query Error')
                                console.log(err)
                            }
                            else {
                                console.log("Inserted " + ctr + " Timeslots") 
                            } 
                        })
                    }
                }
            }
            res.send(JSON.stringify({message: "successful"}))
            console.log("Finished Inserting Timeslots for Event")
            client.release()  
        })
})



app.post("/api/retrieve-events", (req, res) => {
    console.log("Retrieving Events")
    conn.getConnection(
        function (err, client) { //uid and userid are foreign keys (connected)
            const sql = 'SELECT * FROM events';
            //console.log("Dog " + req.body.userid)
            client.query(sql, function(err, result) {
                
                if (err) {
                    console.log('Query Error')
                    console.log(err)
                }
                console.log(result)        
                
                let events = []
                for (const event of result) {
                    const emails = JSON.parse(event.collaborators)
                    //console.log("emails: " + emails)
                    //console.log("user email: " + req.body.email)
                    if (emails.includes(req.body.email)) //if user is a part of any of event, display it
                        events.push(event)
                }

                
                res.send(JSON.stringify(events)) 

                client.release()
            })
        })
})

app.post("/api/retrieve-timeslots", (req, res) => {
    console.log("Retrieving timeslots:")
    let ownerAndTimeslots = [] // = [ {owner: axan, slots: [{}, {}, {}, ...]}, ...]
    const collaborators = req.body.collaborators //check if collaborators needs to be parsed? 

    //needs to be by date first then split up by owner
    for (const collaborator of collaborators) { //"owner" in event_times table means "email", so I'll need to store email when inserting
        conn.getConnection(
            function (err, client) { //uid and userid are foreign keys (connected)
                const sql = 'SELECT * FROM event_times WHERE eventid = ? owner = ?';
                client.query(sql, [req.body.userid, collaborator], function(err, result) {
                    
                    if (err) {
                        console.log('Query Error')
                        console.log(err)
                    }
                    console.log(result)  //all records for user (array of objects)
                      
                    const user = {
                        owner: collaborator,
                        slots: result
                    }
                    ownerAndTimeslots.push(user)

                    client.release()
                })
            })
    }
    
    res.send(JSON.stringify(ownerAndTimeslots)) 
})


app.get('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.resolve(__dirname, '../client-app/build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});