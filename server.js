var express    = require("express")
  , app        = express()
  , bodyParser = require('body-parser')
  , http       = require('http')
  , parse      = require('url').parse

var SERVER = '127.0.0.1';
var PORT = 8080;

var id = 0;
var url_to_index = new Array();
var short_to_url = new Array();
// Randomizing CHARS
var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

function home (req, res) {
  res.setHeader("Content-Type", 'text/html')
  res.send("<html><head><title>Shorten URL</title></head><body><h1>Enter the URL linke here: </h1><input type:text></input><a type='submit' href='/add'>Shorten the URL</a></body></html>")
}

function num_to_base62(n) {
    if(n > 62) {
        return num_to_base62(Math.floor(n / 62)) + CHARS[n % 62];
    } else {
        return CHARS[n];
    }
}
var srv = http.createServer(function(req, res) {
    var param = parse(req.url, true);
 
    if (param.pathname == '/add') {
        if (param.query.url != undefined) { 
            /* We have a url to add */
            /* Check whether the url has been added before */
            short_url = url_to_index[param.query.url];
            if (short_url == undefined) { 
                /* Nope, not added */
                short_url = num_to_base62(id);
                while (short_url.length < 5) { 
                    /* Add padding */
                    short_url = CHARS[0] + short_url;
                }
                url_to_index[param.query.url] = short_url;
                short_to_url[short_url] = param.query.url;
                id++;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});

            short_url_string = 'http://' + SERVER + ':' + PORT + 
                               '/' + short_url;
            res.end('Your short url is: <a href="' + short_url_string +
                '">' + short_url_string + '</a>');
        }
    } else { /* Redirect user to the right place */
        long_url = short_to_url[param.pathname.substring(1)];
        if (long_url != undefined) {
            res.writeHead(302, {'Location': long_url});
            res.end();
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 - Requested url not found');
        }
    }

/*

function adventuresIndex (req, res) {
  res.setHeader("Content-Type", 'text/html')
  res.send("<html><head><title>Adventures - NodeSlash</title></head><body><h1>Are ye bravez?</h1><form action='/adventures' method='POST'><button type='submit'>Yes I am bravez</button></form></body></html>")
}

function createAdventure (req, res) {
  res.setHeader("Content-Type", 'text/html')
  res.send("<html><head><title>Adventures - NodeSlash</title></head><body><h1>Thou hast bravez.</h1><form action='/adventures/42' method='POST'><input type='hidden' name'_method' value='put'><button type='submit'>Cheat</button></form><form action='adventures' method='POST'><button type='submit'>Again!</button></form><p>You have found some <a href='/loot/1'>loot.</a></p></body></html>")
}

function updateAdventure (req, res) {
  res.setHeader("Content-Type", 'text/html')
  res.send("<html><head><title>Adventures - NodeSlash</title></head><body><h1>It's a secret to everybody.</h1></body></html>")
}

function showLoot (req, res) {
  var id = req.params.id

  res.setHeader("Content-Type", 'text/html')
  res.send("<html><head><title>Adventures - NodeSlash</title></head><body><h1>Ogre-slaying knife</h1><p>It has +9 against ogres. It was id #" + id + "</p></body></html>")
}

//Routes
app.get("/",               home)
app.get("/adventures",     adventuresIndex)
app.post("/adventures",    createAdventure)
app.put("/adventures/:id", updateAdventure)
app.get("/loot/:id",       showLoot)


app.listen(port) */
}).listen(PORT, SERVER);


console.log('Server is running at http://' + SERVER + ':' + PORT + '/');




/* var express = require("express")
  , app     = express()
  , bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get("/", function(req,res) {
  res.setHeader("Content-Type", "text/plain")
  res.end("Hello World\n")
})

app.get("/marketing", function(req,res) {
  res.setHeader("Content-Type", "text/plain")
  res.end("Buy allz teh productz\n")
})

app.get("/uploads", function(req,res) {
  res.setHeader("Content-Type", 'text/html');
  res.end('<html><head><title>UPLOADZ!</title><body><form action="/uploads" method="POST" enctype="multipart/form-data"><input type="file" name="the_file"><input type="submit" value="Upload">');
})

app.post("/uploads", function(req,res) {
  console.log(req.files)
  console.log("Handling the upload: ")
  res.setHeader("Content-Type", "text/plain")
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('handling it')
})
  
app.listen(1337);

console.log('Server running at http://127.0.0.1:1337/'); */