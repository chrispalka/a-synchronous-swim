const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////


let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};


module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    switch (req.url) {
      case '/random' :
        res.writeHead(200, headers);
        let message = messages.dequeue();
        if (message === undefined) {
          const moves = ['up', 'down', 'right', 'left'];
          let rndMove = moves[Math.floor(Math.random() * moves.length)];
          res.write(rndMove);
        } else {
          res.write(message);
        }
        break;
      case '/background.jpg' :
        let backgroundImagePath = module.exports.backgroundImageFile;
        if (fs.existsSync(backgroundImagePath)) {
          let file = fs.createReadStream(backgroundImagePath);
          file.on('open', function() {
            res.setHeader('Content-type', 'image/jpeg')
            res.writeHead(200, headers);
            file.pipe(res);
          })
          // res.write(backgroundImagePath);  //send image not string
        } else {
          res.writeHead(404, headers);
        }
        break;
      }
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
  }
  res.end();  //this might be an issue if os try moving this to /random
  next(); // invoke next() at the end of a request to help with testing!
};


