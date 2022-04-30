let img;
let cam;
let n =1;
let viewFinder

function setup() {
  createCanvas( 640, 480 );
  cam = createCapture(VIDEO);
  cam.hide();
  img = createImage(width, height);
  viewFinder= loadImage('assets/viewfinder.png')
}

function draw() {


  cam.loadPixels();
  img.loadPixels();

  let gridSize = 15;
  noStroke();
  for (let y = 0; y < img.height; y += gridSize) {
    for (let x = 0; x < img.width; x += gridSize) {

      let index = (x + y*img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      fill(r+random(-25,25), g+random(-25,25), b+random(-25,25),20);
      rect(x+random(-5,5), y+random(-5,5), gridSize+random(-5,5), gridSize+random(-5,5));
    }
  }

  image(viewFinder,0,(height-width*0.57)/2,width,width*0.57)

}