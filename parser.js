var fs = require('fs');
var text = fs.readFileSync('results_utf.txt', 'utf8');

var get_title = function(param){
  var reg_exp = /<title>(.*)<\/title>/g;
  var m = reg_exp.exec(param);
    if (m){
      return m[1];
    }
};

var get_category = function(param){
  var reg_exp = /\d">(.*)<\/a>\s>\s/g;
  var m = reg_exp.exec(param);
    if (m){
      return m[1];
    }
};

var get_content = function(param){
  //param = param.replace(/<br>/g, '\n');
  var reg_exp = /class="piadaCorpo">\r\n\t((.|\n)*)\r\n<center>/g;
  var m = reg_exp.exec(param);
    if (m){
      return m[1];
    }
};

// var get_attributes = function(comicParam){
//   return comic;
// };

var get_comics = function(param){
  var re = /<HTML>((.|\r\n(?!==END==))*)/g;
  var s = param;
  var m;
  var comics = [];
  
  do {
      m = re.exec(s);
      if (m) {
        var comic = {};
        comic.title = get_title(m[1]);
        comic.category = get_category(m[1]);
        comic.content = get_content(m[1]);
        comics.push(comic);
      }
  } while (m);
  return comics;
};

/*Show me some magic!*/
var result = get_comics(text);
var comic_js = JSON.stringify(result);
console.log(comic_js);
var txt = 'var comics = ';
fs.appendFileSync('comics.js', txt+comic_js+';');