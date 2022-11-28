var exec = require('child_process').exec;
var fs = require('fs')
let uid = process.argv[2]

// exec("javac file"+uid+".txt ",(e,stdout,stderr)=>{
//     {
//         if(e instanceof Error){
//             fs.writeFile("./log.txt",stderr.toString()+"%E%",(e)=>{
//                 console.log(e);
//             })
//             console.log(stderr.toString());
//             return;
//         }
//     }
// })





exec("javac File"+uid+".java ",(e,stdout,stderr)=>
    {
    if(e instanceof Error){

        fs.writeFile("./log.txt", stderr.toString()+"%E%",(e)=>{
console.log(e);
        })
        console.log(stderr.toString());
        return;
    }
    exec("cat input"+uid+".txt | java File"+uid+" > log.txt",
    (e,stdout,stderr)=>
    {
    if(e instanceof Error){

        fs.writeFile("./log.txt", stderr.toString()+"%E%",(e)=>{
console.log(e);
        })
        console.log(stderr.toString());
        return;
    }
    // exec("cat input"+uid+".txt | java input"+uid+" > log.txt")

    console.log(stdout.toString());
    }
    )
    console.log(stdout.toString());
    })