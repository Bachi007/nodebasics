const http = require('http');
const fs = require('fs');
const path= require('path');
const host='localhost';
const port='3000';

const server=http.createServer((req,res)=>{
console.log("Request for "+req.url+" by method")
if(req.method=="GET"){
    if(req.url=="/") fileurl="/index.html"
    else fileurl=req.url;
    var filepath=path.resolve("./public"+fileurl);
    const fileExt=path.extname(filepath)
    if(fileExt==".html"){
        fs.exists(filepath,(exists)=>{
            if(!exists){
                res.statusCode=404;
                res.setHeader("content-type","text/html");
                res.end("<html><body><h1>Error 404 notfound "+fileurl+" not found</h1></body></html>");
            return;            
        }
        else{
            res.statusCode=200;
            res.setHeader("content-type","text/html");
            fs.createReadStream(filepath).pipe(res)
        };
        })
    }
    else {
        res.statusCode=404;
        res.setHeader("content-type","text/html");
        res.end("<html><body><h1>Error 404  "+fileurl+" not supported format</h1></body></html>");
    return;

    }
}
else{
    res.statusCode=404;
                res.setHeader("content-type","text/html");
                res.end("<html><body><h1>Error 404 notfound "+req.method+" not supported</h1></body></html>");
            return;

        }
});

server.listen(port,host,()=>{
    console.log(`server is running on http://${host}:${port}`);
});