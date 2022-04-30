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

}

function draw() {
  cursor('default');


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
  tutorialFunc()

  click = false;
}


function takePhoto() {
  if (mouseX > 700 && mouseX < 835 && mouseY > 165 && mouseY < 210) {
    cursor('pointer');
    if (click == true) {
      saveX = map(imgX, 20, -2180, 0, -4000);
      if (focus == true) {
        image(img, saveX, 0, 720 * 7, 720);
      } else {
        image(imgBlur, saveX, 0, 720 * 7, 720);
      }
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
    if (click == true && evValue >= -4.5) {
      buttonSound.play()
      evChange = true
      evChangeValue = -0.02
    }
  } else if (mouseX > 913 && mouseX < 978 && mouseY > 157 && mouseY < 193) {
    cursor('zoom-in');
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
    if (click == true) {
      buttonSound.play()
      tutorial = true;
    }
  }
  if (tutorial == true) {
    image(help, 0, 0, width, height);
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
