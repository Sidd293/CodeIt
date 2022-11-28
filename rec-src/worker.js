const zmq = require("zeromq");
var mongoose = require('mongoose')
const sock = new zmq.socket("pull");
var exec = require('child_process').exec;
var initcode  = `import sys \nsys.stdin = open('input'+sys.argv[1]+'.txt', 'r')\nstdoutOrigin=sys.stdout\nsys.stdout = open("log.txt", "w")\n`
var fs = require('fs')

sock.connect("tcp://127.0.0.1:3000");
console.log("Worker connected to port 3000");

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

 
  const OutputDataSchema = new mongoose.Schema({
	id : String,
	output: String,
},
	{timestamps:true}
); 


const compilepy = (inpt,code,id)=>{
	let uid = Math.ceil(Math.random()*9000);
   OutputData = mongoose.model("OutputData", OutputDataSchema);
	// code = "print(input()//2)"
         // input =  "\"" +  req.body.input + "\"";
	//input =  input.split('\n').join("\"\\n\"") 
let input = inpt
input = "\""+input+"\""
input = input.split("\n").join("\"\n\"")

console.log("input",input);	
code = initcode+code
	
	fs.writeFile("./file"+uid+".txt", code, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("codefile creation completed");
		fs.writeFile("./input"+uid+".txt", input , function(err) {
			if(err) {
				return console.log(err);
			}
	 exec("docker run --name "+uid+" -it -d pyimg ",(e,stdout,stderr)=>{
			if(e instanceof Error){
				// res.send(r)
				return;
			}
			cid  = stdout.toString(); 
			console.log(`docker cp input${uid}.txt ${uid}:/app`)
		console.log("docker server running",cid);
		exec("docker cp file"+uid+".txt "+uid+":/app",(e,stdout,stderr)=>{
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
                    outputData = new OutputData({
                        id:id,
                        output:sout
                    });
                    outputData.save();
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

}


const compilecpp = (inpt,code,id)=>{
	let uid = Math.ceil(Math.random()*9000);
   OutputData = mongoose.model("OutputData", OutputDataSchema);
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
                    outputData = new OutputData({
                        id:id,
                        output:sout
                    });
                    outputData.save();
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

}


const compilejava = (inpt,code,id)=>{
	let uid = Math.ceil(Math.random()*9000);
   OutputData = mongoose.model("OutputData", OutputDataSchema);
	// code = "print(input()//2)"
         // input =  "\"" +  req.body.input + "\"";
	//input =  input.split('\n').join("\"\\n\"") 
let input = inpt
// input = "\""+input+"\""
// input = input.split("\n").join("\"\n\"")


console.log("bug-\n",input)
console.log("input",input);	
// code = code
code =  code.replace("Code","File"+uid)
	console.log(code)
	fs.writeFile("./File"+uid+".java", code, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("codefile creation completed");
		fs.writeFile("./input"+uid+".txt", input , function(err) {
			if(err) {
				return console.log(err);
			}
	 exec("docker run --name "+uid+" -it -d dummy293/javaimage ",(e,stdout,stderr)=>{
			if(e instanceof Error){
				// res.send(r)
				return;
			}
			cid  = stdout.toString(); 
			console.log(`docker cp input${uid}.txt ${uid}:/app`)
		console.log("docker server running",cid);
		exec("docker cp File"+uid+".java "+uid+":/app",(e,stdout,stderr)=>{
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
                    outputData = new OutputData({
                        id:id,
                        output:sout
                    });
                    outputData.save();
// 					exec("docker stop "+uid,(e,stdout,stderr)=>{
// 						if(e instanceof Error){
// 						//	res.send(sout);
// 							return;}
	
// 							exec("docker rm "+uid,(e,stdout,stderr)=>{
// 								if(e instanceof Error){
// //									res.send(sout);
// 									return;}
			
// 				//	res.send(sout);
// 							// console.log("output",stdout.toString());
// 							// res.send(stdout.toString())
						
// 							});
	
	
	
	   
// 					// console.log("output",stdout.toString());
// 					// res.send(stdout.toString())
				
// 					});
					});
		
				console.log(stdout.toString());
				});
	
			
			});
	
	
	
	
		});
		})
		});  
	
	
	
	
	}); 

}






sock.on("message", function(msg) {
  console.log(JSON.parse(msg));
body = JSON.parse(msg);
// OfflineAudioCompletionEvent
if(body.language == "py")
compilepy(body.input?body.input:"",body.code,body.id);
else if(body.language =="cpp")
compilecpp(body.input?body.input:"",body.code,body.id);
else 
compilejava(body.input?body.input:"",body.code,body.id);


});