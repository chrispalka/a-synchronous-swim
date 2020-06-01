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
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }
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
        res.end();
        next();
        break;
      case '/background.jpg' :
        fs.readFile(module.exports.backgroundImageFile, (err, data) => {
          if (err) {
            res.writeHead(404, headers);
          } else {
            res.writeHead(200, headers);
            res.write(data);
          }
          res.end();
          next();
        });
        break;
      };
  } else if (req.method === 'POST') {
    if (req.url === '/upload') {
      let data;
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        fs.readFile(data, 'binary', function(err, data) {
          if (err) {
            console.log('ERROR!!!!! NODEMON!!')
          } else {
            fs.writeFile('../background.jpg', data);
          }
        })
      })
      res.writeHead(201, headers);
      res.end();
      next();
    };
  };
};


