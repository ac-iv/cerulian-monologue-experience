let bgImage;
let characterImages = [];
let currentCharacterIndex = 0;
let speechBoxImage;
let nextArrowImage;
let quitButtonImage;
let customFont;
let titleImage; 
let startButtonImage;
let aboutButtonImage;
let isSplashPage = true; 
let buttonTextSize = 24; 
let bgMusic;

let texts = [
  "You: Sorry, I'm just learning about this stuff.",
  "Miranda: This... 'stuff'? Oh, okay. I see.",
  "Miranda: You think this has nothing to do with you.",
  "Miranda: You go to your closet, and you select...",
  "Miranda: I don’t know, that lumpy blue sweater, for instance,",
  "Miranda: because you’re trying to tell the world",
  "Miranda: that you take yourself too seriously",
  "Miranda: to care about what you put on your back,",
  "Miranda: But what you don’t know is that that sweater",
  "Miranda: is not just blue", 
  "Miranda: it’s not turquoise,",
  "Miranda: it’s not lapis,",
  "Miranda: It's Cerulean!",
  "Miranda: You’re also blithely unaware of the fact that,",
  "Miranda: in 2002, Oscar de la Renta did a collection of cerulean gowns,",
  "Miranda: and then I think it was Yves Saint Laurent, wasn’t it?",
  "Miranda: Who showed cerulean military jackets. I think we need a jacket here.",
  "Miranda: And then cerulean quickly showed up in the collections",
  "Miranda: of eight different designers.",
  "Miranda: Then it filtered down through the department stores",
  "Miranda: and then trickled on down into some tragic casual corner",
  "Miranda: where you, no doubt, fished it out",
  "Miranda: of some clearance bin.",
  "Miranda: However, that blue represents millions of dollars",
  "Miranda: of countless jobs.",
  "Miranda: And it’s sort of comical how you think",
  "Miranda: that you’ve made a choice that exempts you",
  "Miranda: from the fashion industry when, in fact,",
  "Miranda: you’re wearing a sweater that was selected for you",
  "Miranda: by the people in this room...",
  "Miranda: from a pile of 'stuff'."
];

let currentTextIndex = 0; 

function preload() {
  bgMusic = loadSound('bgmusic.mp3'); 
  bgImage = loadImage('img/Background.png');
  characterImages.push(loadImage('img/1.png')); 
  characterImages.push(loadImage('img/2.png'));  
  characterImages.push(loadImage('img/3.png'));  
  characterImages.push(loadImage('img/4.png'));  
  characterImages.push(loadImage('img/5.png'));  
  characterImages.push(loadImage('img/6.png'));  
  speechBoxImage = loadImage('img/TextPlate.png');  
  nextArrowImage = loadImage('img/Next.png');  
  quitButtonImage = loadImage('img/quit.png');  
  customFont = loadFont('prstart.ttf'); 
  titleImage = loadImage('img/title.png');  
  startButtonImage = loadImage('img/start_button.png');  
  aboutButtonImage = loadImage('img/about.png');  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusic.setVolume(0.5); 
  bgMusic.loop();
}

function draw() {
  background(bgImage);

  textFont(customFont);

  fill(255);

  if (isSplashPage) {
    drawSplashPage();
  } else {
    drawGameSequence();
  }
}

function drawSplashPage() {
  let titleWidth = 700; // Adjust the width as needed
  let titleHeight = titleWidth * (titleImage.height / titleImage.width); // Maintain aspect ratio
  image(titleImage, width/2 - titleWidth/2, 50, titleWidth, titleHeight);

  // Draw the start button
  let startButtonWidth = 400; // Adjust the width as needed
  let startButtonHeight = 140; // Adjust the height as needed
  let startButtonX = width / 2 - startButtonWidth / 2;
  let startButtonY = height / 2;
  image(startButtonImage, startButtonX, startButtonY, startButtonWidth, startButtonHeight);

  // Draw the about button
  let aboutButtonWidth = 400; // Adjust the width as needed
  let aboutButtonHeight = 140; // Adjust the height as needed
  let aboutButtonX = width / 2 - aboutButtonWidth / 2;
  let aboutButtonY = height / 2 + 200;
  image(aboutButtonImage, aboutButtonX, aboutButtonY, aboutButtonWidth, aboutButtonHeight);
}

function drawGameSequence() {
  // Draw the title image at the top center with reduced size
  let titleWidth = 400; // Adjust the width as needed
  let titleHeight = titleWidth * (titleImage.height / titleImage.width); // Maintain aspect ratio
  image(titleImage, width/2 - titleWidth/2, 20, titleWidth, titleHeight);

  // Keep the character image centered
  let imageWidth = currentCharacterIndex === 1 || currentCharacterIndex === 5 ? 500 : 300;
  image(characterImages[currentCharacterIndex], width/2 - imageWidth/2, height/2 - 150, imageWidth, 500);

  // Keep the speech box centered and anchored to the bottom
  image(speechBoxImage, width/2 - 450, height - 300, 900, 250);

  // Display current text in speech box
  textSize(20);
  textAlign(LEFT, TOP);
  let textX = width / 2 - 240;
  let textY = height - 220;
  let words = texts[currentTextIndex].split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > 400 && i > 0) {
      text(line, textX, textY);
      line = words[i] + ' ';
      textY += 25; // Adjust line height
    } else {
      line = testLine;
    }
  }
  text(line, textX, textY);

  // Highlight the "Next" button when hovered over
  if (mouseX > width/2 + 190 && mouseX < width/2 + 240 && mouseY > height - 180 && mouseY < height - 130) {
    // Yellow overlay with low opacity
    fill(255, 204, 0, 50); // Yellow color with low opacity
    rect(width/2 + 190, height - 180, 50, 50); // Draw overlay
    // Thick yellow border
    strokeWeight(3); // Increase border thickness
    stroke(255, 204, 0); // Yellow color for border
    noFill(); // No fill color
    rect(width/2 + 190, height - 180, 50, 50); 
    noStroke(); 
  }
 
  image(nextArrowImage, width/2 + 190, height - 180, 50, 50);

  if (mouseX > 40 && mouseX < 180 && mouseY > height - 120 && mouseY < height - 50) {
    fill(255, 204, 0, 50); 
    rect(40, height - 120, 140, 70); 
    strokeWeight(3); 
    stroke(255, 204, 0); 
    noFill(); 
    rect(40, height - 120, 140, 70); 
    noStroke(); 
  }
  image(quitButtonImage, 40, height - 120, 140, 70);
}

function mousePressed() {
  if (isSplashPage) {
    if (
      mouseX > width / 2 - startButtonImage.width / 2 &&
      mouseX < width / 2 + startButtonImage.width / 2 &&
      mouseY > height / 2 + 50 - startButtonImage.height / 2 &&
      mouseY < height / 2 + 50 + startButtonImage.height / 2
    ) {
      isSplashPage = false;
      currentTextIndex = 0;
    }

    if (
      mouseX > width / 2 - aboutButtonImage.width / 2 &&
      mouseX < width / 2 + aboutButtonImage.width / 2 &&
      mouseY > height / 2 + 150 - aboutButtonImage.height / 2 &&
      mouseY < height / 2 + 150 + aboutButtonImage.height / 2
    ) {
     
      console.log("about button clicked!");
    }
  } else {
    if (mouseX > width/2 + 190 && mouseX < width/2 + 240 && mouseY > height - 180 && mouseY < height - 130) {
      if (currentTextIndex >= texts.length - 1) {
        isSplashPage = true;
      } else {
        currentCharacterIndex = (currentCharacterIndex + 1) % characterImages.length;
        currentTextIndex++;
      }
    }

    if (mouseX > 40 && mouseX < 180 && mouseY > height - 120 && mouseY < height - 50) {
      // Return to splash page
      isSplashPage = true;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
