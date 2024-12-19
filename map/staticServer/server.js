const express = require("express");
const server = express();
server.use(express.static("./../"));
server.listen(3000,()=>{
  console.log("serving on 3000");
});
