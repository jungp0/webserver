const express = require("express");
const app = express();

const path = require("path");
const fs = require('fs');

let jdata = JSON.parse(fs.readFileSync('public/web.json'));

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.end(JSON.stringify(req.body, null, 2))
// });


// define the first route
// app.get("/hello", function (req, res) {
//     res.send("<h1>Hello World!</h1>")
// })

app.get('/info', (req, res)=> {
    res.json(jdata);
    // console.log(jdata);
});

// start the server listening for requests
let listener = app.listen(process.env.PORT || 8080, 
	() => console.log(`Server is running...${listener.address().port}`));