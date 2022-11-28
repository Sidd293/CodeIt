## System Requirements

Node,Mongodb,Docker,RAM >2GB

## Steps for setting up server
1.open rec-src  <br/>
2. run command <br/>
> npm i   <br/>
> node index.js
 
3.open docker desktop<br/>

## Steps to run the worker 
you can setup multiple workers by simply writing this command
>  cd rec-src
>  node worker.js

go to "localhost:5000/" to access the compiler.
<BR/>
you dont need to build the image files as their copies are uploaded on dockerHub still you can view the content of the images under c++img , javaImage , pyImage
directories

## Architecture of the platform
![image](https://user-images.githubusercontent.com/61879840/192357392-21a940ca-24c1-4ea0-ac03-a85cbca399a9.png)
this is the main architecture of the compiler service

## The process

1.Over the request of the user a UID is generated and 2 text files are created at the server being stdInput and code files.

2.Now after this, a container is spun up with the name same as the UID.

3.The docker image has its language related environments along with a log.txt and a js file for code execution scripts

4.The code is then run in that container and the output is saved in the log.txt file

5.Now this log.txt is read and the output stream is stored and sent as a response. This doesn't complete here.

6.Now the docker containers are stopped and deleted along with both input and code files.


## Scalable architecture made using zeromq
![image](https://user-images.githubusercontent.com/61879840/192357650-326c76e0-6741-43ad-9843-3d9752e7bc77.png)
this is the architecture when we implement asynchronous message queuing service to distribute the comming requests






