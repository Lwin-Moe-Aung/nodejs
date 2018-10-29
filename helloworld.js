const http = require('http');//to create custon server

const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

function htmlResponse(res, htmlfileName){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
   //Asynchronously read a file
   fs.readFile(htmlfileName,(err, htmlData) =>{
    if(err)throw err;

    return res.end(htmlData); 
  });
}

function jsonResponse(res, jsonfileName){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
   //Asynchronously read a file
   fs.readFile(jsonfileName,(err, jsonData) =>{
    if(err) throw err;

    return res.end(jsonData); 
  });
}

const server = http.createServer((req, res) => {

  //how to handle form Post request in pure nodejs

  let method = req.method; //GET  //POST
  if(method === "POST"){
    let formData = '';
    req.on('data', chunk =>{
      formData += chunk.toString();
      console.log(formData);
    });

    req.on('end', ()=> {
      console.log(formData);
    })
  }

  let url = req.url;
  //console.log(url);
  switch(url){
    case"/":
      htmlResponse(res,"welcome.html");
      break;
    
    case"/about":
      htmlResponse(res,"about.html");
      break;
    
     
    case"/contact":
      htmlResponse(res,"contact.html");
      break;

    case"/json/data":
      jsonResponse(res,"post.json");
      break;
    
    default:
      htmlResponse(res,"404.html");
      break;

  }
 

 
   //Asynchronously read a file

   //synchronously read a file
  //  let htmlData = fs.readFileSync("welcome.html");
  //  res.end(htmlData);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});