let express = require('express');
let app = express();
var bodyParser = require('body-parser');
let PORT = 3000;
let path = require('path');

//set up app to handle data parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Data
// ===========================================================
//can make sql call and store result into an array of objects
var characters = [{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }];

//Routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

//api route
app.get("/api/character", function(req, res){
    return res.json(characters);
});

app.get("/api/characters/:character", function(req, res){
    //connect to db and make a sequalize call to db to get yoda
    let chosen = req.params.character;
    for(var i =0; i < characters.length; i++) {
        if (chosen == characters[i].routeName) {
            return res.json(characters[i]);
        }
    }
    return res.send('no character found');
    res.end();
});

//Create New Characters
app.post('/api/characters', function(req, res) {
    let newCharacter = req.body; 
    //would need to parse the body here, but bodyParser does that for me
    characters.push(newCharacter);
    
    res.json(newCharacter);
   // res.json(characters);
})

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
  });
 
// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newcharacter = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newcharacter);
  
    characters.push(newcharacter);
  
    res.json(newcharacter);
  });  


//Listener
app.listen(PORT, function() {
    console.log("App is listening on PORT" + PORT);
});