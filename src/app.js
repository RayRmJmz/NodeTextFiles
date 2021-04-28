const session = require('express-session')
const express = require("express");
const flash = require('express-flash-messages')
const files = require("./files");
//create server
//create an application object that represents my web application using a server

//to run app node src/app.js
const app = express();
app.use(flash());


// difene server listening port
const port = 3000;

app.set("view engine", "ejs");
//app.use(express.static(__dirname+"/views"));

app.use(express.static("public"));

app.use(session({
    secret: 'secret'
  }))

//middleware 
app.use(express.urlencoded({
    extended : true
}));

app.get("/", function(request, response){
    const listFiles = files.listFiles();
    response.render("index",{
        listFiles : listFiles
    });
});


app.post("/newFile", function(request, response){
    const title = request.body.title;
    const content = request.body.content;
    const addFile = files.addFile(title, content);
    request.flash('notify', 'File created');
    const listFiles = files.listFiles();
    response.render("index",{
        listFiles : listFiles
    });
  });

app.post("/readFile", function(request, response){
    const title = request.body.title;
    const fileContent = files.readFile(title);
    response.render("FileContent",{
        title : title, 
        fileContent : fileContent
    });
});

app.post("/editFile", function(request, response){
    const title = request.body.title;
    const fileContent = files.readFile(title);
    const newTitle  = title.substring(0,title.length-4);
    response.render("editFile",{
        title : title, 
        newTitle : newTitle,
        fileContent : fileContent
    });
});


app.post("/updateFile", function(request, response){
    const title = request.body.title;
    const newTitle = request.body.newTitle;
    const content = request.body.content;
    const newFile = files.updateFile(title, newTitle, content);
    request.flash('notify', 'File edited');
    /*
    const fileContent = files.readFile(newFile);
    response.render("FileContent",{
        title : title, 
        fileContent : fileContent
    });
    /**/ 
    const listFiles = files.listFiles();
    response.render("index",{
        listFiles : listFiles
    });

});


app.post("/deleteFile", function(request, response){
    const title = request.body.title;
    const deleteFile = files.deleteFile(title);
    const listFiles = files.listFiles();
    request.flash('notify', 'File deleted');
    response.render("index",{
        listFiles : listFiles
    });
});


app.listen(port, function(){
    console.log("Listenning at http://localhost:3000");
});