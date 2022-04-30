let oneSnow = [];
let amount = 500;

function setup() {
  let cnv = createCanvas(windowWidth,windowHeight);
  cnv.parent("canvasContainerSnow")
  for (let i = 0; i < amount; i++) {
    oneSnow[i] = new Snow();
  }
}


function draw() {
  erase();
  rect(0, 0, width, height);
  noErase();
  for (i = 0; i < amount; i++) {
    oneSnow[i].update();
    oneSnow[i].display();
    oneSnow[i].turn();
  }
}

class Snow {
  constructor() {
    this.diameter = random(3, 10);
    this.x = random(width);
    this.y = random(height);
    this.noise = noise(this.y);
  }
  update() {
    this.y += this.diameter / 20;
    this.x += this.noise - 0.5;
  }
  display() {
    noStroke();
    circle(this.x, this.y, this.diameter);
  }
  turn() {
    if (this.y > height) {
      this.y = 0;
    }
  }
}
