const fs = require("fs")
const path = 'public/files/';

const listFiles = function(){
    const file = fs.readdirSync(path);
    return file;
    
}

const addFile = function(title, content){
    const newFile  =fs.writeFileSync(path+title+".txt", content);
}

const readFile = function(title){
    const file = fs.readFileSync(path+title, "utf8");
    return file;
}

const deleteFile = function(title){
    const deleteFile  = fs.unlinkSync(path+title);
     return true;
}

const updateFile = function(title, newTitle, content){
    const deleteFile  = fs.unlinkSync(path+title);
    const file = fs.writeFileSync(path+newTitle+".txt", content);
    return true;
}




module.exports = {
    addFile : addFile,
    listFiles : listFiles,
    readFile : readFile,
    deleteFile : deleteFile,
    updateFile : updateFile
}