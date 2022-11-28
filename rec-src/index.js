// const express = require('express');
// const path = require('path');
const zmq = require("zeromq");
// const compilepy = require('./utils/pythonC');

const sock =  zmq.socket("push");
var express = require('express')
var exec = require('child_process').exec;
var fs = require('fs')
var app = express();
const path = require('path');
var compilePy = require("./utils/pythonC.js")
var compileJava = require("./utils/javaC.js")
var compileCpp= require("./utils/cppC.js")
var mongoose = require('mongoose')
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

OutputData = mongoose.model("OutputData", OutputDataSchema);


const bodyParser = require("body-parser");
var cors = require('cors')
app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())


// const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
var initcode  = `import sys \nsys.stdin = open('input'+sys.argv[1]+'.txt', 'r')\nstdoutOrigin=sys.stdout\nsys.stdout = open("log.txt", "w")\n`


// run();




// }
sock.bindSync("tcp://127.0.0.1:3000");
console.log("Producer bound to port 3000");
app.get("/check/:id",(req,res)=>{
OutputData.findOne({id:req.params.id}).then(e=>{
	if(e==null){
	setTimeout(() => {
			res.status(404).send({
message:"not executed"
		})
	}, 500);
	
	
return ;
	}
	else{


	res.status(200).send({
			message:"done executing",
			output : e.output
		})


		
	}
})
})


app.post('/asycompile', async (req,res)=>{
	// console.log("About to send jobs!");
	if(req.body.code == null )
	{
		res.status.send({
			message: "no code given"
		})
		return ;
	}
	if(req.body.language == "py" || req.body.language == "cpp" || req.body.language == "java" )
{	
//    req.body.id=  Math.ceil(Math.random()*1000)
	console.log("sending work");
	sock.send(JSON.stringify(req.body))
	res.send({
		message: "sent the message",
		
	})

}
else{
res.status(404).send({
	message :"invalid language"
})
}  
})



app.post("/test",(req,res)=>{
	console.log(req.body)
	res.send("/test route")
})
app.get("/test2",(req,res)=>{
	console.log(req.body)
	res.send("/test route")
})

app.post("/compile",(req,res)=>{
	console.log(req.body)
	language = req.body.language;
	if(req.body.input == null)
	{
		req.body.input = "";
	}
	if(language == "py")
compilePy(req.body.input,req.body.code).then(e=>{
		res.send(e);
	});
	else 
	if(language == "cpp")
	compileCpp(req.body.input,req.body.code).then(e=>res.send(e));
	else if(language == "java")
	compileJava(req.body.input,req.body.code).then(e=>res.send(e));
	else res.send({
		message : "invalid language of choice",
		
	})
})


// app.post('/coe',(req,res)=>{
// 	console.log(req.body);
// 	let uid = Math.ceil(Math.random()*9000);
// 	// code = "print(input()//2)"
//          // input =  "\"" +  req.body.input + "\"";
// 	//input =  input.split('\n').join("\"\\n\"") 
// input = req.body.input
// input = "\""+input+"\""
// input = input.split("\n").join("\"\n\"")

// console.log("input",input);	
// code = initcode+req.body.code
	
// 	fs.writeFile("./file"+uid+".txt", code, function(err) {
// 		if(err) {
// 			return console.log(err);
// 		}
// 		console.log("codefile creation completed");
// 		fs.writeFile("./input"+uid+".txt", input , function(err) {
// 			if(err) {
// 				return console.log(err);
// 			}
// 	 exec("docker run --name "+uid+" -it -d sidd293/test ",(e,stdout,stderr)=>{
// 			if(e instanceof Error){
// 				// res.send(r)
// 				return;
// 			}
// 			cid  = stdout.toString(); 
// 			console.log(`docker cp input${uid}.txt ${uid}:/app`)
// 		console.log("docker server running",cid);
// 		exec("docker cp file"+uid+".txt "+uid+":/app",(e,stdout,stderr)=>{
// 			if(e instanceof Error){
// 				console.log(stderr.toString());
// 				return;
// 			}
// 			console.log("file copied")
		
// 			exec("docker cp input"+uid+".txt "+uid+":/app",(e,stdout,stderr)=>{
// 				if(e instanceof Error){
// 					console.log(stdout.toString());
// 					return;
// 				}
// 				console.log("file copied")
// 				console.log("docker exec "+uid+" node rce.js "+uid);
// 				exec("docker exec "+uid+" node rce "+uid,(e,stdout,stderr)=>{
// 					if(e instanceof Error){
// 						// res.send(r)
// 						return;
	
	
// 					}
// 					// let serr = ""
// 					let sout = ""
// 					exec("docker exec "+uid+" tail log.txt",(e,stdout,stderr)=>{
// 						if(e instanceof Error){
// 							// res.send(r)
// 							// res.send(stderr.toString())
// 						sout = stderr.toString()
// 							console.log(stderr);
// 							return;}
// 			sout =stdout.toString();


// 					console.log("output",stdout.toString());
// 					res.send(sout);
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
// 					});
		
// 				console.log(stdout.toString());
// 				});
	
			
// 			});
	
	
	
	
// 		});
// 		})
// 		});  
	
	
	
	
// 	}); 
	
// 	})


app.get('/api/getList', (req,res) => {
	var list = ["item1", "item2", "item3"];
	res.json(list);
	console.log('Sent list of items');
});



// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = 5000;
app.listen(port);

console.log('App is listening on port ' + port);
