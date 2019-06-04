var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var textract = require('textract');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:\\Users\\MANISHA\\pms-app\\pdfuploads\\' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        textract.fromFileWithPath(newpath, function( error, text ) {
          res.write(text)
          // console.log(text);
        })
        // res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.writeHead(200, {'Accept': '*'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"/><br/>');
    res.write('<input type="submit" value="Upload file">');
    res.write('</form>');
    res.write('<div id="myContent"></div>');
    return res.end();
  }
}).listen(8090);
