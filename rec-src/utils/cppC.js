
var exec = require('child_process').exec;
var fs = require('fs')

const compilecpp = (inpt,code,id)=>{
    return new Promise((resolve,reject)=>{
        let uid = Math.ceil(Math.random()*9000);
        // OutputData = mongoose.model("OutputData", OutputDataSchema);
         // code = "print(input()//2)"
              // input =  "\"" +  req.body.input + "\"";
         //input =  input.split('\n').join("\"\\n\"") 
     let input = inpt
     // input = "\""+input+"\""
     // input = input.split("\n").join("\"\n\"")
     
     console.log("input",input);	
     code = code
         
         fs.writeFile("./File"+uid+".cpp", code, function(err) {
             if(err) {
                 return console.log(err);
             }
             console.log("codefile creation completed");
             fs.writeFile("./input"+uid+".txt", input , function(err) {
                 if(err) {
                     return console.log(err);
                 }
          exec("docker run --name "+uid+" -it -d itfw20005/cppimg ",(e,stdout,stderr)=>{
                 if(e instanceof Error){
                     // res.send(r)
                     return;
                 }
                 cid  = stdout.toString(); 
                 console.log(`docker cp input${uid}.txt ${uid}:/app`)
             console.log("docker server running",cid);
             exec("docker cp File"+uid+".cpp "+uid+":/app",(e,stdout,stderr)=>{
                 if(e instanceof Error){
                     console.log(stderr.toString());
                     return;
                 }
                 console.log("file copied")
             
                 exec("docker cp input"+uid+".txt "+uid+":/app",(e,stdout,stderr)=>{
                     if(e instanceof Error){
                         console.log(stdout.toString());
                         return;
                     }
                     console.log("file copied")
                     console.log("docker exec "+uid+" node rce.js "+uid);
                     exec("docker exec "+uid+" node rce "+uid,(e,stdout,stderr)=>{
                         if(e instanceof Error){
                             // res.send(r)
                             return;
         
         
                         }
                         // let serr = ""
                         let sout = ""
                         exec("docker exec "+uid+" tail log.txt",(e,stdout,stderr)=>{
                             if(e instanceof Error){
                                 // res.send(r)
                                 // res.send(stderr.toString())
                             sout = stderr.toString()
                                 console.log(stderr);
                                 return;}
                 sout =stdout.toString();
     
     
                         console.log("output",stdout.toString());
                         // res.send(sout);
                        //  outputData = new OutputData({
                        //      id:id,
                        //      output:sout
                        //  });
                        //  outputData.save();
                        resolve({
                            message:"code ran successfully",
                            output:sout
                        })
                         exec("docker stop "+uid,(e,stdout,stderr)=>{
                             if(e instanceof Error){
                             //	res.send(sout);
                                 return;}
         
                                 exec("docker rm "+uid,(e,stdout,stderr)=>{
                                     if(e instanceof Error){
     //									res.send(sout);
                                         return;}
                 
                     //	res.send(sout);
                                 // console.log("output",stdout.toString());
                                 // res.send(stdout.toString())
                             
                                 });
         
         
         
            
                         // console.log("output",stdout.toString());
                         // res.send(stdout.toString())
                     
                         });
                         });
             
                     console.log(stdout.toString());
                     });
         
                 
                 });
         
         
         
         
             });
             })
             });  
         
         
         
         
         }); 
     
    });

}

module.exports=compilecpp