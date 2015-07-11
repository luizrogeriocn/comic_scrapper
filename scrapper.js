var request = require('request');
var fs = require('fs');

var url_begin = "http://piadista.com/piada.asp?id=";
//var url_end = "?format=Abridged&reportfmt=csv";

for(var i = 1; i < 360; i++){
  request.get({url: url_begin+i, encoding: null}, function (error, response, body) {
      if (!error) {
        fs.appendFileSync('results.txt', body);
        fs.appendFileSync('results.txt', '\n==END==\n');
      } else {
          console.log("error retrieving data");
      }
  });
}