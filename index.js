const { parse } = require("csv-parse");
const fs = require("fs");

const results = [];

// This function allows us to open a file as a readable stream, and that returing readable stream is a kind of event emitter
// The pipe fucntion is meant to connect a readable stream source to a writable stream destination
// The parse function returns an event emitter that deals with streams of data coming in... Parse function designed for reading streams...
fs.createReadStream("kepler_data.csv")
  .pipe(parse({
      comment: '#',
      columns: true
  }))
  .on("data", (data) => {
    results.push(data);
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(results);
    console.log("done");
  });
