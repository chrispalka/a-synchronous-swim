const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', '');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  //if q empty send random
  //we can maybe use keypress.initialize here ???

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
      //default :
        //WHAT GOES HERE??
        //res.write('Did not receive a valid type.')
      case '/background' :
        let backgroundPresent = fs.access('../img/background.jpg', fs.constants.F_OK, (err) => {
          return err ? false : true;
        } )
        if (backgroundPresent) {
          res.writeHead(200, headers);
        } else {
          res.writeHead(404, headers);
        }
      }
  }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};


// case '/background':
//       let backgroundPresent = fs.access('../img/background.jpg', fs.constants.F_OK);
//       if (backgroundPresent) {
//         res.writeHead(200, headers);
//       } else {
//         res.writeHead(404, headers);
//       }