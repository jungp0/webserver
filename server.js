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
app.post('/info', (req,res)=>{
    // console.log(2);
    // console.log(req.body);
    jdata = req.body;
    fs.writeFileSync('public/web.json',JSON.stringify(jdata),(err) =>{
        if (err){
            throw err;
        }
    });
    res.send(200);
});

app.put('/add', (req,res)=>{
    // console.log(3);

    let bdata = req.body;
    // let bdata = JSON.parse(req.body);
    // console.log(bdata);
    
    // jdata[bdata.term]['description'] = bdata['description'];
    // jdata[bdata.term]['URL'] = bdata['url'];
    // jdata[bdata.term]['difficulty'] = bdata['difficulty'];
    jdata = Object.assign(jdata, bdata);
    fs.writeFileSync('public/web.json',JSON.stringify(jdata),(err) =>{
        if (err){
            throw err;
        }
    });
    res.send(200);
});

app.get('/info', (req, res)=> {
    jdata = JSON.parse(fs.readFileSync('public/web.json'));
    res.json(jdata);
    // console.log(jdata);
});

// start the server listening for requests
let listener = app.listen(process.env.PORT || 8080, 
	() => console.log(`Server is running...${listener.address().port}`));