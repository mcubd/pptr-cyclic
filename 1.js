import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';


const app = express();
const httpServer = createServer(app);
const ioo = new Server(httpServer, { /* options */ });


var inc = 0;
var nmd = 0;

ioo.on("connection", (socket) => {
  console.log('at least 1 client connected ')

  socket.on('sendMessage', name => {
    // ioo.sockets.emit('broadcas',{ data:name.data,d:'yes'})
    socket.emit('broadcas2',"ok")

    socket.broadcast.emit('broadcas3', name)

    var nothing = 88;

    {
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // ioo.clients.forEach((client) =>{
      //   if (client !== socket){

      //     socket.emit('broadcas',{ data:name.data})

      //   }


      // })
    }




    if (name === "D0000000000") {
      var ou = fs.readFile('his.json', function (err, dat) {
        var json = JSON.parse(dat);
        json.data = [];
        fs.writeFileSync("his.json", JSON.stringify(json))
      })
    } else if(name==="eror"||name==="Eror"||name==="ERor"||name==="EROr"||name==="EROR"){
      inc = 0;
      nmd = 0;
    } else {
      fs.readFile('his.json', function (err, dat) {
        var json = JSON.parse(dat);
        json.data.push(name);
        fs.writeFileSync("his.json", JSON.stringify(json))
      });
     }


  })


  socket.on("loadhis", da => {
    inc++
    var ou = fs.readFileSync('his.json', 'utf8');
    var json = JSON.parse(ou);
    var dd = json.data[json.data.length - inc];

    if (inc > json.data.length) {
      nmd++

      if (nmd == 1) {
        socket.emit("his", "No more data")
      }

    } else {
      socket.emit("his", dd)
    }
  });



});





httpServer.listen(process.env.PORT || 8000);



{
  const __dirname = dirname(fileURLToPath(import.meta.url));

  app.use('/', express.static(__dirname + '/views'));

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');


  app.get('/', (req, res) => {
    res.render('ok1.ejs')
  })
  app.get('/enjoy', (req, res) => {
    res.render('ok2.ejs')
  })

}