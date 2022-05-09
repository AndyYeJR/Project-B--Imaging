let img;
let imgBlur;
let camera;
let overlay1;
let overlay2;
let imgX = -1000;
let imgY = 285;
let spd;
let saveX = 0;
let click;
let shutterSound;
let buttonSound;
let iso = 0;
let evValue = 0;
let n = 0;
let evChange = false;
let disp = 1;
let focus = false;
let blurIndex = 1;
let tutorial = true;
let help;
let focusSound;
let oneSnow = [];
let amount = 500;


function preload() {
  help = loadImage('assets/help.png')
  img = loadImage('assets/mountain.jpg');
  imgBlur = loadImage('assets/mountainBlur.jpg')
  camera = loadImage('assets/camera.png');
  overlay1 = loadImage('assets/overlay.png');
  overlay2 = loadImage('assets/viewfinder.png')
  shutterSound = loadSound('assets/shutter.mp3');
  buttonSound = loadSound('assets/button.mp3')
  focusSound = loadSound('assets/focus.mp3')
}

function setup() {
  let cnv = createCanvas(990, 720);
  cnv.parent("canvasContainerCam");
  for (let i = 0; i < amount; i++) {
    oneSnow[i] = new Snow();
  }
}

function draw() {
  cursor('default');
  textFont("Trebuchet MS");

  //drag photos
  if (mouseY < 690 && mouseY > 285 && mouseX <= 635 && mouseX >= 65 && imgX <= 20 && imgX >= -2180) {
    cursor('w-resize');
    if (mouseIsPressed) {
      spd = map(350 - mouseX, 285, 0, 10, 0);
      imgX += spd;
    }
  }
  if (imgX > 20) {
    imgX = 20;
  } else if (imgX < -2180) {
    imgX = -2180;
  }

  //photo
  if (focus == true) {
    image(img, imgX, imgY, 410 * 7, 410);
  } else {
    image(imgBlur, imgX, imgY, 410 * 7, 410);
  }

  //snow
  for (i = 0; i < amount; i++) {
    oneSnow[i].update();
    oneSnow[i].display();
    oneSnow[i].turn();
  }

  //mask
  push()
  if (evValue > 0) {
    fill(255, evValue * 40)
  } else {
    fill(0, -evValue * 40)
  }

  rect(60, 280, 840, 420)
  pop()

  //camera overlay
  push()
  translate(355 + evValue * 8.65, 655)
  noStroke()
  triangle(0, 0, -3, 10, 3, 10)
  pop()
  if (disp == 1) {
    image(overlay1, 35, 280, 400 * 1.6, 400);
  } else if (disp == 2) {
    image(overlay2, 45, 280, 387 * 1.6, 430);
  } else {
    push()
    fill(0)
    rect(35, 280, 430 * 1.6, 430)
    pop()
  }


  //camera
  image(camera, 0, 0, height * 1.375, height);

  //functions
  display();
  autofocus();
  changeEv();
  takePhoto();


  //tests
  console.log(mouseX, mouseY);
  // console.log(click);

  //exposure motions
  if (evChange == true) {
    if (n < 50) {
      evValue += evChangeValue;
      n++;
    } else {
      evChange = false;
      n = 0;
    }
  }

  //tutorial
  text("Help: OFF",40,280)
  tutorialFunc()

  click = false;
}

class Snow {
  constructor() {
    this.diameter = random(1, 6);
    this.x = random(0, 3000);
    this.y = random(250, height);
    this.noise = noise(this.y);
    this.white = random(200,255)
    this.trans = random(200,255)
  }
  update() {
    this.y += this.diameter / 20;
    this.x += this.noise - 0.5;
  }
  display() {
    push()
    noStroke();
    fill(this.white,this.trans)
    circle(this.x + imgX, this.y, this.diameter);
    pop()
  }
  turn() {
    if (this.y > height) {
      this.y = 250;
    }
  }
}

function takePhoto() {
  if (mouseX > 700 && mouseX < 835 && mouseY > 165 && mouseY < 210) {
    cursor('pointer');
    push()
    textSize(40)
    fill(0)
    text("Photograph",241,501)
    fill(255)
    text("Photograph",240,500)
    pop()
    if (click == true) {
      saveX = map(imgX, 20, -2180, 0, -4000);
      if (focus == true) {
        image(img, saveX, 0, 720 * 7, 720);
      } else {
        image(imgBlur, saveX, 0, 720 * 7, 720);
      }

      push()
      scale(1.5)
      translate(-40,-240)
      for (i = 0; i < amount; i++) {
        oneSnow[i].update();
        oneSnow[i].display();
        oneSnow[i].turn();
      }
      pop()

      push()
      if (evValue > 0) {
        fill(255, evValue * 40)
      } else {
        fill(0, -evValue * 40)
      }
      rect(0, 0, width, height)
      pop()

      shutterSound.play();
      saveCanvas('myPhoto', 'png');
      erase();
      rect(0, 0, width, height);
      noErase();
    }
  }
}

function changeEv() {
  if (mouseX > 848 && mouseX < 913 && mouseY > 157 && mouseY < 193) {
    cursor('zoom-out');
    push()
    textSize(40)
    fill(0)
    text("ExposureValue -",201,501)
    fill(255)
    text("ExposureValue -",200,500)
    pop()
    if (click == true && evValue >= -4.5) {
      buttonSound.play()
      evChange = true
      evChangeValue = -0.02
    }
  } else if (mouseX > 913 && mouseX < 978 && mouseY > 157 && mouseY < 193) {
    cursor('zoom-in');
    push()
    textSize(40)
    fill(0)
    text("ExposureValue +",201,501)
    fill(255)
    text("ExposureValue +",200,500)
    pop()
    if (click == true && evValue <= 4.5) {
      buttonSound.play()
      evChange = true
      evChangeValue = 0.02
    }
  }
}

function display() {
  if (dist(mouseX, mouseY, 760, 500) < 25) {
    cursor('pointer')
    push()
    textSize(40)
    fill(0)
    text("ChangeDisplayInfo",181,501)
    fill(255)
    text("ChangeDisplayInfo",180,500)
    pop()
    if (click == true) {
      buttonSound.play()
      if (disp < 2) {
        disp++;
      } else {
        disp = 0;
      }
    }
  }
}

function autofocus() {
  if (dist(mouseX, mouseY, 700, 237.5) < 22.5) {
    cursor('pointer')
    push()
    textSize(40)
    fill(0)
    text("Focus",301,501)
    fill(255)
    text("Focus",300,500)
    pop()
    if (click == true) {
      buttonSound.play()
      focusSound.play()
      focus = !focus
    }
  }
}

function tutorialFunc() {
  if (dist(mouseX, mouseY, 80, 235) < 22.5) {
    cursor('pointer')
    push()
    textSize(40)
    fill(0)
    text("Help",311,501)
    fill(255)
    text("Help",310,500)
    pop()
    if (click == true) {
      buttonSound.play()
      tutorial = true;
    }
  }
  if (tutorial == true) {
    image(help, 0, 0, width, height);
    textSize(20)
    fill(255)
    textSize(15)
    text("Help: ON",40,280)
    text("Click anywhere to continue",220,680)
    if (dist(mouseX, mouseY, 80, 235) > 22.5 && click == true) {
      erase();
      rect(0, 0, width, height);
      noErase();
      tutorial = false;
    }
  }
}

function mouseClicked() {
  click = true
}

