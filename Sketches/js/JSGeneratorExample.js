var colorMap;
var width = 800,
  height = 800;
var myGen;
var drawSpeed = 1600;

function setup() {
  createCanvas(800, 800);
  colorMap = make2DArray();
  myGen = genColor();
  background(0);
}

function draw() {

  for (var i = 0; i < drawSpeed; i++) {
    var nextColor = myGen.next();
    if (!nextColor.done) {
      stroke(nextColor.value.color);
      point(nextColor.value.x, nextColor.value.y);
    }
  }
  // drawNoiseAsync(genColor());
}





function* genColor() {
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var drawPoint = yield {
        color: noise(x, y) * 255,
        x: x,
        y: y
      };
    }
  }
}

function drawNoiseAsync(generator) {
  var gen = generator;

  function handle(yielded) {
    if (!yielded.done) {

      stroke(yielded.value.color);
      point(yielded.value.x, yielded.value.y);
      // let nextDraw = myGen.next();
      // console.log(nextDraw);
      handle(gen.next());
    }
  }

  handle(gen.next());
}



// let promiseToGenerateColor = new Promise(function(resolve, reject)) {
//
//   resolve(true);
//   reject(false);
// }
//
// promiseToGenerateColor().then(function() {
//
// })
