
<!--#echo json="package.json" key="name" underline="=" -->
chunkify-http-body
==================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Pipe any stream through this encoder to encode it as Transfer-Encoding:
chunked.
<!--/#echo -->


Usage
-----

<!--#include file="chunkify-stdin.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="5" -->
```javascript
var makeChunkifier = require('chunkify-http-body'),
  myStream = makeChunkifier();
process.stdin.pipe(myStream).pipe(process.stdout);
```
<!--/include-->



<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
