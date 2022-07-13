var express = require('express');
var app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
var app_path = './dist/test_task_ccrs';
app.use('/', express.static(path.join(__dirname,app_path)))
  .get('*',(req,res)=>res.sendFile(path.join(__dirname,app_path +'/index.html')))
  .listen(PORT,()=>console.log(`Listening on ${PORT}`));
