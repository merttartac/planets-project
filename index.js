const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

// This function allows us to open a file as a readable stream, and that returing readable stream is a kind of event emitter
// The pipe fucntion is meant to connect a readable stream source to a writable stream destination
// The parse function returns an event emitter that deals with streams of data coming in... Parse function designed for reading streams...
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(habitablePlanets.map((planet) => {
        return planet['kepler_name'];
    }));
    console.log(`${habitablePlanets.length} habitable planets found!`);
    console.log("done");
  });

// THE FACT: A Review of the best habitable planet candidates was done in 2015 and it turns out that one of the factors that makes
//a planet habitable is "THE STELLAR FLUX" which is the measure of the amount of light that the planet gets.
// In other words the amount of energy that it gets from its sun. The column name in csv file is "koi_insol"
// For the actual values of this and other limitations => https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
