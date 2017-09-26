const express = require('express');
const fs = require('fs');

var app = express();

//middleware demo
//make a db request to check if the user is auth
//next is to know when we are done
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', () => {
    console.log("Unable to append to server.log");
  });
  next();
});

app.get('/', (request, response) => {
  response.send("Hello nikita!");
});


app.listen(3000, () => console.log("Server is running on port 3000"));
