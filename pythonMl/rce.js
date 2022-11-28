var exec = require('child_process').exec;
var fs = require('fs')
let uid = process.argv[2]

exec("python file"+uid+".py <input"+uid+".txt",(e,stdout,stderr)=>
    {
    if(e instanceof Error){

        fs.writeFile("./log.txt", stderr.toString()+"%E%",(e)=>{
console.log(e);
        })
        console.log(stderr.toString());
        return;
    }
    fs.writeFile("./log.txt", stdout.toString(),(e)=>{
        console.log(e);
                })
    console.log(stdout.toString());
    })