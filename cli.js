
const launch = require("./launch");

const script = process.argv[2];

if(script === undefined) {
  throw "please specify a script to debug";
}

launch(script);