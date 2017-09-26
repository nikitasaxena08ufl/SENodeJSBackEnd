const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', () => {
    console.log("Unable to append to server.log");
  });
  next();
});

var studentsFile;
var students = [];

try{
  studentsFile = fs.readFileSync('playground/students.json');
  students = JSON.parse(studentsFile);
}catch(e){
  console.log("File doesn't exist");
}

app.get('/', (request, response) => {
  response.send(students);
});


app.listen(port, () => console.log(`Server is running on port ${port}`));
